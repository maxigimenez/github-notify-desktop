'use strict';

angular.module('github-notify')
    .controller('ListController', ['$scope', 'Config', '$q', function($scope, Config, $q){

        var config = Config.get(),
            github = new Github({
                token: config.access
            });

        var fetch = function(){
            $scope.list = {};

            var accountName = config.account,
                repositoriesList = config.repositories.split(',');

            var get = function(item){
                var deferred = $q.defer(),
                    issues = github.getIssues(accountName, item.trim());

                issues.list({}, function(err, list){
                    $scope.list[item.trim()] = list;
                    deferred.resolve();
                });

                return deferred.promise;
            };

            var promises = repositoriesList.map(function(item){
                return get(item);
            });

            return $q.all(promises);
        };

        $scope.open = function(url){
            var shell = window.require('shell');
            shell.openExternal(url);
        };

        $scope.refresh = function(){
            if(!$scope.loading){
                $scope.loading = true;
                fetch().then(function(){
                    $scope.loading = false;
                });
            }
        };

        fetch().then(function(){
            $scope.loading = false;
        });
        
    }]);