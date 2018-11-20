(function(){
  'use strict';
  
  angular
    .module('toDoList')
    .constant('getAPI', {
      getUrlAPI: 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=4ad062b44d7248e09180b47f14e5eff0'
    })
})();