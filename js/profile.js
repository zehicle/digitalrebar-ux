/*
provisioner controller
*/
(function () {
  angular.module('app')
    .controller('ProfileCtrl', function ($scope, api, $location, $mdDialog, $mdMedia, $routeParams) {

      var title = 'Profiles';

      $scope.attribs = {}
      $scope.expand = {};
      $scope.profile_count = -1;

      api("/api/v2/attribs").success(function (attribs) {
        $scope.attribs = attribs.reduce(function(map, obj) {
          if (obj.writable && (obj.schema != null && obj.schema != "")) {
            map[obj.name] = obj;
          }
          return map;
        }, $scope.attribs);
        $scope.profile_count = Object.keys($scope._profiles).length;
      });
      $scope.$emit('title', title);

      if ($routeParams.id)
        $scope.expand[$routeParams.id] = true;

      $scope.deleteProfile = function (name) {
        $scope.confirm(event, {
          title: "Remove Profile",
          message: "Are you sure you want to remove '" + name + "' profile?",
          yesCallback: function () {
            api('/api/v2/profiles/' + name, {
              method: 'DELETE'
            }).success(function (data) {
              api.getHealth();
              for (var id in $scope._profiles) {
                if ($scope._profiles[id].name==name)
                  delete $scope._profiles[id];
              }
              $scope.profile_count = Object.keys($scope._profiles).length;
            }).error(function () {
              api.getHealth();
            });
          }
        });
      };

      $scope.createProfilePrompt = function (ev, prof) {
        var profile = angular.copy(prof);

        var values = {};
	      var name = "";
        if (typeof profile !== 'undefined') {
          name = profile.name
          for(var key in profile.values) {
            values[key] = { "name": key, "value": JSON.stringify(profile.values[key]) }
          }
        }
        $scope.profile_count = 1;

        $mdDialog.show({
          controller: 'DialogController',
          controllerAs: 'dialog',
          templateUrl: 'views/dialogs/addprofiledialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            editing: (typeof profile !== 'undefined'),
            attribs: $scope.attribs,
            profile: {
              name: name,
              values: values
            },
            original: angular.copy(profile)
          },
          clickOutsideToClose: true,
          fullscreen: true
        });
      };

    });
})();
