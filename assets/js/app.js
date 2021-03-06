'use strict';

angular
    .module('github-notify', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'ListController'
            })
            .when('/setup', {
                templateUrl: 'views/setup.html',
                controller: 'SetupController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(['$rootScope', '$location', 'Config', function($rootScope, $location, Config){
        $rootScope.$on('$routeChangeStart', function(event){
            if(!Config.have()){
                $location.path('/setup');
            }
        });
    }]);