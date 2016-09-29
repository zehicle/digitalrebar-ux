var version = '0.1.4';

(function () {
  var app = angular.module('app', [
    'ngRoute', 'ngMaterial', 'ngCookies', 'ngAnimate', 'sparkline',
    'LocalStorageModule', 'DigestAuthInterceptor', 'md.data.table',
    'debounce', 'jsontext', 'ng-slide-down', 'swapMdPaint', 'angular-clipboard',
    'ngMessages', 'ngVis'
  ]);

  app.config(function ($httpProvider, $routeProvider, $mdThemingProvider, apiProvider) {

    $httpProvider.interceptors.push('digestAuthInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '800',
        'hue-1': '50'
      })
      .accentPalette('red');

    $mdThemingProvider.theme('input', 'default')
      .primaryPalette('grey');

    // theme to stop warnings/bugs
    $mdThemingProvider.theme('status_').
    primaryPalette('green', {
      'default': '600'
    }).accentPalette('grey', { 'default': '900' });

    // themes for different status colors
    $mdThemingProvider.theme('status_ready').
    primaryPalette('green', {
      'default': '600'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_error').
    primaryPalette('red', {
      'default': '700'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_process').
    primaryPalette('yellow', {
      'default': '600'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_todo').
    primaryPalette('yellow', {
      'default': '300'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_off').
    primaryPalette('grey', {
      'default': '900'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_queue').
    primaryPalette('yellow', {
      'default': '100'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_reserved').
    primaryPalette('blue', {
      'default': '500'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.theme('status_proposed').
    primaryPalette('blue', {
      'default': '400'
    }).accentPalette('grey', { 'default': '900' });

    $mdThemingProvider.alwaysWatchTheme(true);

    $routeProvider.
    when('/', {
      redirectTo: '/deployments'
    }).
    when('/deployments', {
      controller: 'DeploymentsCtrl',
      controllerAs: 'deployments',
      templateUrl: 'views/deployments.html'
    }).
    when('/deployments/:id', {
      controller: 'DeploymentsCtrl',
      controllerAs: 'deployments',
      templateUrl: 'views/deployments.html'
    }).
    when('/login', {
      controller: 'LoginCtrl',
      controllerAs: 'login',
      templateUrl: 'views/login.html'
    }).
    when('/nodes', {
      controller: 'NodesCtrl',
      controllerAs: 'nodes',
      templateUrl: 'views/nodes.html'
    }).
    when('/nodes/:id', {
      controller: 'NodesCtrl',
      controllerAs: 'nodes',
      templateUrl: 'views/nodes_singular.html'
    }).
    when('/node_roles', {
      controller: 'NodeRolesCtrl',
      controllerAs: 'node_roles',
      templateUrl: 'views/node_roles.html'
    }).
    when('/node_roles/:id', {
      controller: 'NodeRolesCtrl',
      controllerAs: 'node_roles',
      templateUrl: 'views/node_roles_singular.html'
    }).
    when('/roles', {
      controller: 'RolesCtrl',
      controllerAs: 'roles',
      templateUrl: 'views/roles.html'
    }).
    when('/roles/:id', {
      controller: 'RolesCtrl',
      controllerAs: 'roles',
      templateUrl: 'views/roles_singular.html'
    }).
    when('/deployment_roles', {
      controller: 'DeploymentRolesCtrl',
      controllerAs: 'deployment_roles',
      templateUrl: 'views/deployment_roles.html'
    }).
    when('/deployment_roles/:id', {
      controller: 'DeploymentRolesCtrl',
      controllerAs: 'deployment_roles',
      templateUrl: 'views/deployment_roles_singular.html'
    }).
    when('/barclamps', {
      controller: 'BarclampsCtrl',
      controllerAs: 'barclamps',
      templateUrl: 'views/barclamps.html'
    }).
    when('/barclamps/:id', {
      controller: 'BarclampsCtrl',
      controllerAs: 'barclamps',
      templateUrl: 'views/barclamps_singular.html'
    }).
    when('/networks', {
      controller: 'NetworksCtrl',
      controllerAs: 'networks',
      templateUrl: 'views/networks.html'
    }).
    when('/networks/:id', {
      controller: 'NetworksCtrl',
      controllerAs: 'networks',
      templateUrl: 'views/networks_singular.html'
    }).
    when('/providers', {
      controller: 'ProviderCtrl',
      controllerAs: 'providers',
      templateUrl: 'views/provider.html'
    }).
    when('/providers/:id', {
      controller: 'ProviderCtrl',
      controllerAs: 'providers',
      templateUrl: 'views/provider.html'
    }).
    when('/annealer', {
      controller: 'AnnealerCtrl',
      controllerAs: 'annealer',
      templateUrl: 'views/annealer.html'
    }).
    when('/users', {
      controller: 'UsersCtrl',
      controllerAs: 'users',
      templateUrl: 'views/users.html'
    }).
    when('/users/:id', {
      controller: 'UsersCtrl',
      controllerAs: 'users',
      templateUrl: 'views/users.html'
    }).
    when('/tenants', {
      controller: 'TenantsCtrl',
      controllerAs: 'tenants',
      templateUrl: 'views/tenants.html'
    }).
    when('/tenants/:id', {
      controller: 'TenantsCtrl',
      controllerAs: 'tenants',
      templateUrl: 'views/tenants.html'
    }).
    when('/capabilities', {
      controller: 'CapabilitiesCtrl',
      controllerAs: 'capabilities',
      templateUrl: 'views/capabilities.html'
    }).
    when('/dns', {
      controller: 'DNSCtrl',
      controllerAs: 'dns',
      templateUrl: 'views/dns.html'
    }).
    when('/dhcp', {
      controller: 'DHCPCtrl',
      controllerAs: 'dhcp',
      templateUrl: 'views/dhcp.html'
    }).
    when('/engine', {
      controller: 'EngineCtrl',
      controllerAs: 'engine',
      templateUrl: 'views/engine.html'
    }).
    when('/provisioner/templates', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_templates.html'
    }).
    when('/provisioner/templates/:id', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_templates.html'
    }).
    when('/provisioner/bootenvs', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_bootenvs.html'
    }).
    when('/provisioner/bootenvs/:id', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_bootenvs.html'
    }).
    when('/provisioner/machines', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_machines.html'
    }).
    when('/provisioner/machines/:id', {
      controller: 'ProvisionerCtrl',
      controllerAs: 'provisioner',
      templateUrl: 'views/provisioner_machines.html'
    }).

    when('/workloads/:id', {
      controller: 'WorkloadsCtrl',
      controllerAs: 'workloads',
      templateUrl: 'views/workloads.html'
    }).


    when('/alerts', {
      controller: 'LoggingCtrl',
      controllerAs: 'logging',
      templateUrl: 'views/logging.html'
    }).
    when('/api_helper', {
      controller: 'ApiHelperCtrl',
      controllerAs: 'apiHelper',
      templateUrl: 'views/api_helper.html'
    }).
    when('/attribs', {
      controller: 'AttribsCtrl',
      controllerAs: 'attribs',
      templateUrl: 'views/attribs.html'
    }).
    when('/graphs', {
      controller: 'GraphsCtrl',
      controllerAs: 'graphs',
      templateUrl: 'views/graphs.html'
    }).

    otherwise({
      redirectTo: '/login'
    });
  });

  // filter for determining if an object doesn't have an attribute
  // ng-repeat="obj in hash | not:'boolean_attr' "
  // ng-repeat will show anything with that attribute as a false value
  app.filter('not', function () {
    return function (items, field) {
      var result = {};
      angular.forEach(items, function (value, key) {
        if (!value[field])
          result[key] = value;
      });
      return result;
    };
  });

  // filter for determining if an object has an attribute
  // ng-repeat="obj in hash | has:'boolean_attr' "
  // ng-repeat will show anything with that attribute as a true value
  app.filter('has', function () {
    return function (items, field) {
      var result = {};
      angular.forEach(items, function (value, key) {
        if (value[field])
          result[key] = value;
      });
      return result;
    };
  });

  // formats strings into pretty json
  app.filter('json', function () {
    return function (text) {
      return JSON.stringify(text, null, '  ');
    }
  });

  // stretch a div to match its content's height
  app.directive('elastic', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'A',
        link: function ($scope, element) {
          $scope.initialHeight = $scope.initialHeight || element[0].style.height;
          var resize = function () {
            element[0].style.height = $scope.initialHeight;
            element[0].style.height = "" + element[0].scrollHeight + "px";
          };
          element.on("input change", resize);
          $timeout(resize, 0);
        }
      };
    }
  ]);

  app.directive('scrollPosition', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      //var windowEl = angular.element($window);
      var handler = function() {
        scope.scroll = $(element).scrollTop();
      }
      element.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});

  app.controller('AppCtrl', function ($scope, $location, localStorageService, $mdSidenav, api) {
    $scope.toggleSideNav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.api = api;
    $scope.scroll = 0;

    $scope.menu = [{
      title: 'Deployments',
      icon: 'dashboard',
      path: '/deployments'
    }, {
      title: 'Workloads',
      icon: 'work',
      expand: true,
      expanded: function () {
        return $scope.expandWorkloads; },
      toggleExpand: $scope.toggleExpandWorkloads,
      items: $scope.wizardBarclamps
    }, {
      title: 'Providers',
      icon: 'filter_drama',
      path: '/providers'
    }, {
      title: 'Nodes',
      icon: 'dns',
      path: '/nodes'
    }, {
      title: 'Networks',
      icon: 'swap_horiz',
      path: '/networks'
    }];

    $scope.managementMenu = [{
      title: 'Services',
      icon: "tune",
      expand: true,
      expanded: function () {
        return $scope.expandServices; },
      toggleExpand: $scope.toggleExpandServices,
      items: [{
        title: 'Rule Engine',
        icon: 'settings_input_composite',
        path: '/engine',
        hide: function () {
          return !$scope.showEngine; }
        }, {
          title: 'DHCP Subnets',
          icon: 'device_hub',
          path: '/dhcp',
          hide: function () {
            return !$scope.showDHCP; }
        }, {
          title: 'DNS Zones',
          icon: 'public',
          path: '/dns',
          hide: function () {
            return !$scope.showDNS; }
        }]
      }, {
        title: 'Provisioner',
        icon: 'local_shipping',
        hide: function () {
          return !$scope.showProvisioner; },
        expand: true,
        expanded: function () {
          return $scope.expandProvisioner; },
        toggleExpand: $scope.toggleExpandProvisioner,
        items: [{
          title: 'Machines',
          icon: 'dns',
          path: '/provisioner/machines'
        }, {
          title: 'Boot Environments',
          icon: 'album',
          path: '/provisioner/bootenvs'
        }, {
          title: 'Templates',
          icon: 'insert_drive_file',
          path: '/provisioner/templates'
        }]
      }, {
      title: 'Access',
      icon: 'lock',
      expand: true,
      expanded: function () {
        return $scope.expandAccess; },
      toggleExpand: $scope.toggleExpandAccess,
      items: [{
        title: 'Users',
        icon: 'person',
        path: '/users'
      }, {
        title: 'Tenants',
        icon: 'group',
        path: '/tenants'
      }, {
        title: 'Capabilities',
        icon: 'traffic',
        path: '/capabilities'
      }]
    }, {
      title: 'Settings',
      icon: 'settings',
      path: '/settings'
    }, {
      title: 'Alerts',
      icon: 'error',
      path: '/alerts'
    }, {
      title: 'Advanced',
      icon: 'developer_board',
      expand: true,
      expanded: function () {
        return $scope.expandAdvanced; },
      toggleExpand: $scope.toggleExpandAdvanced,
      items: [{
        title: 'API Call Helper',
        icon: 'insert_link',
        path: '/api_helper'
      }, {
        title: 'Deployment Roles',
        icon: 'label_outline',
        path: '/deployment_roles'
      }, {
        title: 'Node Roles',
        icon: 'label',
        path: '/node_roles'
      }, {
        title: 'Attributes',
        icon: 'list',
        path: '/attribs'
      }, {
        title: 'Graphs',
        icon: 'pie_chart_outlined',
        path: '/graphs'
      }]
    }];

    $scope.setPath = function (path) {
      $location.path(path);
    };

    $scope.logout = function () {
      sessionStorage.clear();
      localStorage.clear();
      localStorageService.add('username', '');
      localStorageService.add('password', '');
      $scope.confirm(event, {
        title: "Cannot Loggout",
        message: "At this time, you must close the browser to change user sessions"
      });
    };

  });

  app.run(function ($rootScope, $location, $http, $cookies, debounce, $interval, localStorageService, api, $mdDialog, $mdMedia) {

    $rootScope.user;
    $rootScope.isAuth = function () {
      return !!$rootScope.user;
    };
    $rootScope.lastPath = '/';

    $rootScope.expandServices = false;
    $rootScope.toggleExpandServices = function () {
      $rootScope.expandServices = !$rootScope.expandServices;
    };
    $rootScope.expandProvisioner = false;
    $rootScope.toggleExpandProvisioner = function () {
      $rootScope.expandProvisioner = !$rootScope.expandProvisioner;
    };
    $rootScope.expandAccess = false;
    $rootScope.toggleExpandAccess = function () {
      $rootScope.expandAccess = !$rootScope.expandAccess;
    };
    $rootScope.expandAdvanced = false;
    $rootScope.toggleExpandAdvanced = function () {
      $rootScope.expandAdvanced = !$rootScope.expandAdvanced;
    };

    $rootScope.expandWorkloads = false;
    $rootScope.toggleExpandWorkloads = function () {
      $rootScope.expandWorkloads = !$rootScope.expandWorkloads;
    };

    $rootScope.setTenant = function (tenant_id) {
      api('/api/v2/users/'+$rootScope.user.id, {
        method: "PUT",
        data: {
          current_tenant_id: tenant_id
        }
      }).success(function (user) {
        $rootScope.user = user;
        api.reload();
      });
    };

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var path = next.split('/#/')[1];
      if (path) // if it's a valid path
        path = path.toLowerCase();
      else // default to Deployments
        path = 'deployments';

      if(!$rootScope.isAuth()) {
        var token = $cookies.get('DrAuthToken');
        var username = $cookies.get('DrAuthUser');

        if(typeof token !== 'undefined') {
          $rootScope.$emit('login', { username: username }); //store the user in rootScope so the isAuth function can use it!
          $rootScope.$emit('startUpdating'); // start auto-updating the api data
        } else {
          if (path !== 'login') {
            $rootScope.lastPath = '/' + path;
            $location.path('/login');
            return
          }          
        }
      }

      if (path === 'login' && $rootScope.isAuth()) {
        $location.path('/deployments');
      }
    });

    $rootScope.$on('login', function (event, data) {
      $rootScope.user = data;
      // get the current user data
      api('/api/v2/users/'+data.username).success(function (data) {
        $rootScope.user = data;
      });

      api('/api/v2/providers/templates').
      success(function (data) {
        $rootScope.providerTemplates = data;
      });
    });

    $rootScope.$on('host', function (event, data) {
      $rootScope.host = data;
    });

    $rootScope.$on('title', function (event, data) {
      $rootScope.title = data;
    });

    $rootScope.showEditAttribDialog = function (ev, attrib, target) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: 'DialogController',
        controllerAs: 'dialog',
        templateUrl: 'views/dialogs/editattribdialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
          id: attrib.id,
          value: JSON.stringify(attrib.value, null, '  '),
          attrib: attrib,
          api: api,
          target: target
        },
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      });
    }

    // a confirm dialog
    /*
      {
        title: "Confirm", // title of dialog
        yes: "Yes", // yes button text
        no: "No", // no button text
        yesCallback: function(){}, // function called when yes is pressed
        noCallback: function(){} // function called when no is pressed
      } 
    */
    $rootScope.confirm = function (ev, data) {
      var confirm = $mdDialog.confirm()
        .title(data.title || "Confirm")
        .textContent(data.message)
        .targetEvent(ev)
        .ok(data.yes || "Yes")
        .cancel(data.no || "No");
      $mdDialog.show(confirm).then(function () {
        if (typeof data.yesCallback !== 'undefined')
          data.yesCallback();
      }, function () {
        if (typeof data.noCallback !== 'undefined')
          data.noCallback();
      });
    };

    // key handling emitted to every view
    window.onkeydown = function (e) {
      var key = e.keyCode ? e.keyCode : e.which;
      var ctrl = e.ctrlKey;
      var alt = e.altKey;
      var shift = e.shiftKey;
      $rootScope.$evalAsync(function () {
        $rootScope.$broadcast("keyDown", {
          key: key,
          ctrl: ctrl,
          alt: alt,
          shift: shift
        });
      });
    };

    // icons use inside <md-icon> for each status
    $rootScope.icons = {
      'ready': 'check_circle',
      'error': 'warning',
      'process': 'autorenew',
      'todo': 'play_circle_outline',
      'off': 'power_settings_new',
      'queue': 'update',
      'reserved': 'pause_circle_outline',
      'proposed': 'add_circle_outline'
    };

    $rootScope.states = {
      '-1': 'error', //error
      '0': 'ready', //active
      '1': 'todo', //todo
      '2': 'process', //transition
      '3': 'queue', //blocked
      '4': 'proposed' //proposed
    };


  });

})();
