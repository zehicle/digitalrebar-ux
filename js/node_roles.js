/*
node role controller
*/
(function () {
  angular.module('app').controller('NodeRolesCtrl', function ($scope, $location, debounce, $routeParams, $mdMedia, $mdDialog, $timeout, localStorageService, api) {

    $scope.$emit('title', 'Node Roles'); // shows up on the top toolbar

    var node_roles = this;

    $scope.pollLog = 5;
    $scope.myOrder = 'id';

    // used for showing the toolbar when scrolling beyond the runlog
    $scope.style = {};
    $scope.top = 0;
    $scope.updateScroll = function() {
      if(!$scope.id || !$('#runlog').position())
        return;

      var top = $('#runlog').position().top - $('#runlog').height();
      $scope.top = top;
      var toolbar = $('.md-default:not(#runlog)');
      if(top < 0) { // the top of the runlog toolbar is offscreen
        $scope.style = {
          'position': 'fixed'
        };
        toolbar.css('width', $('#runlog').width());
        toolbar.css('top', $('#toolbar').height());
      } else {
        $scope.style = {};
        toolbar.css('width', 'auto');
        toolbar.css('top', 'auto');
      }
    }

    $scope.$watchCollection('scroll', $scope.updateScroll)

    this.selected = [];

    $scope.editAttribInHelper = function (id) {
      localStorageService.add('api_helper_method', 'get');
      localStorageService.add('api_helper_route', '/api/v2/attribs/' + id);
      $location.path("/api_helper");
    };

    // converts the _node_roles object that rootScope has into an array
    $scope.getNodeRoles = function () {
      var roles = [];
      for (var id in $scope._node_roles) {
        var node = $scope._nodes[$scope._node_roles[id].node_id];
        if(node && node.variant !== 'phantom')
          roles.push($scope._node_roles[id]);
      }
      return roles;
    };

    $scope.retry = function () {
      $scope.runlog = "Retrying..."
      // if we have a valid node selected
      if ($scope.node_role.id) {
        api('/api/v2/node_roles/' + $scope.node_role.id + '/retry', {
          method: 'PUT'
        }).success(api.addNodeRole).success($scope.updateScroll).error(function (err) {
          api.toast('Error retrying node role', 'node_role', err);
        });
      }
    };

    $scope.commit = function () {
      // if we have a valid node selected
      if ($scope.node_role.id) {
        api('/api/v2/node_roles/' + $scope.node_role.id + '/commit', {
          method: 'PUT'
        }).success(api.addNodeRole)
            .success($scope.updateScroll)
            .error(function (err) {
              api.toast('Error committing node role', 'node_role', err);
            });
      }
    };

    $scope.destroySelected = function () {
      $scope.confirm(event, {
        title: "Destroy Node Roles",
        message: "Are you sure you want to destroy the selected node roles?",
        yesCallback: function () {
          node_roles.selected.forEach(function (node_role) {
            if (node_role.id) {
              api('/api/v2/node_roles/' + node_role.id, {
                method: 'DELETE'
              }).success(function () {
                api.remove('node_role', node_role.id);
              });
            }

            node_roles.selected = [];
          });

        }
      });
    };

    $scope.retrySelected = function (arr) {
      var roles = node_roles.selected
      if(arr)
        roles = arr
      roles.forEach(function (node_role) {
        if (node_role.id) {
          api('/api/v2/node_roles/' + node_role.id + '/retry', {
            method: 'PUT'
          }).success(function () {
          });
        }

        if(!arr)
          node_roles.selected = [];
      });
    };

    $scope.destroy = function () {
      $scope.confirm(event, {
        title: "Destroy Node Role",
        message: "Are you sure you want to destroy this node role?",
        yesCallback: function () {
          if ($scope.node_role.id) {
            api('/api/v2/node_roles/' + $scope.node_role.id, {
              method: 'DELETE'
            }).success(function () {
              api.remove('node_role', $scope.node_role.id);
              $location.path('/node_roles');
            });
          }
        }
      });
    };
    $scope.supported = false;
    $scope.onCopy = function (succ, err) {
      if(succ) {
        api.toast('Copied Runlog to Clipboard');
      } else {
        api.toast('Copy Runlog to Clipboard Failed');
      }
    }

    $scope.id = $routeParams.id;
    $scope.target = { obj: 'node_role_id', id: $routeParams.id }
    $scope.node_role = {};
    $scope.hasAttrib = -1;
    $scope.attribs = [];
    $scope.editing = false;
    $scope.service = false;
    $scope.deployment_role_id = -1;
    $scope.helplink = "http://digital-rebar.readthedocs.io/en/latest/deployment/troubleshooting/roles";
    var hasCallback = false;

    // since we don't get the runlog, we need to get it special
    $scope.runlog = "Retrieving...";
    $scope.getRunlog = function(id) {
      return api('/api/v2/node_roles/' + id,
        { 'headers': {'x-return-attributes':'["runlog"]'}}).
      success(function (data) {$scope.runlog = (data.runlog || "No Log");}).
      error(function (err) {$scope.runlog = "Error Getting Run Log: " + err;});
    }

    var updateNodeRole = function () {
      if ($scope.editing) return;

      if (!$scope._node_roles[$scope.id])
        $location.path('/node_roles');
      else {
        $scope.node_role = $scope._node_roles[$scope.id];
        // is this a service role?
        $scope.service = ($scope._nodes[$scope.node_role.node_id] ? $scope._nodes[$scope.node_role.node_id]["system"] : false);
        // what is the matching deployment role?
        for (var id in $scope._deployment_roles) {
          if($scope._deployment_roles[id].role_id == $scope.node_role.role_id && $scope._deployment_roles[id].deployment_id == $scope.node_role.deployment_id) {
            $scope.deployment_role_id = id;
            break;
          }
        }
        if ($scope.hasAttrib == -1) {
          api('/api/v2/node_roles/' + $scope.node_role.id + "/attribs").
          success(function (obj) {
            $scope.attribs = obj;
            obj.forEach(function (attrib) {
              attrib.len = JSON.stringify(attrib.value).length;
              attrib.preview = JSON.stringify(attrib.value, null, '  ').trim().replace(/[\s\n]/g, '');
              if (attrib.preview.length > 73)
                attrib.preview = attrib.preview.substr(0, 67) + "...";
            })
            $scope.hasAttrib = 1;
          }).
          error(function () {
            $scope.hasAttrib = 0;
          });
        }

        if (!hasCallback) {
          hasCallback = true;
          $scope.$on('node_role' + $scope.node_role.id + "Done", updateNodeRole);
        }
      }
    };

    if (Object.keys($scope._node_roles).length) {
      updateNodeRole();
    } else {
      $scope.$on('node_rolesDone', updateNodeRole);
    }

    $scope.getApiUpdate = function () {
      if ($scope.editing || !$scope.node_role || !$scope.id) return;

      api("/api/v2/node_roles/" + $scope.id).success(function (role) {
        // keep the runlog here, the addNodeRole will remove it to save RAM
        $scope.runlog = role.runlog;
        api.addNodeRole(role);
        $scope.updateInterval = $timeout($scope.getApiUpdate, $scope.pollLog * 1000);
      });
    };

    $scope.changeRate = function (rate) {
      $scope.pollLog = rate;
      $timeout.cancel($scope.updateInterval);
      $scope.getApiUpdate();
    };

    $scope.getApiUpdate();

    $scope.$on('$routeChangeStart', function () {
      $timeout.cancel($scope.updateInterval);
    });

  });

})();
