(function(){
  'use strict';
  
  angular
    .module('toDoList')
    .factory('dataService', ['$http', 'getAPI', function($http, getAPI) {
      return {
        getData: () => {
          return $http( {method: 'GET', url: getAPI.getUrlAPI} )
            .then( (response) => { return response.data.articles }, 
                   (response) => { return response.status }
            );
        }
      };
    }])
  })();