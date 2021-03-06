'use strict';

angular
    .module('github-notify')
    .factory('Config', [function(){
        var key = 'GITHUB-NOTIFY-CONFIG';
        return {
            get: function(){
                return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : undefined;
            },
            have: function(){
                return (
                    !angular.isUndefined(this.get(key)) 
                    ) ? true : false;
            },
            save: function(data, callback){
                localStorage.setItem(key, JSON.stringify(data));
                callback();
            },
            remove: function(callback){
                localStorage.removeItem(key);
                callback();
            }
        };
    }]);