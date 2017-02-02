/**
 * Created by gozoomo on 26/7/16.
 */
angular.module('wingifyApp').factory('api', function($http, $q) {

  var base_url = 'http://localhost:8080/';
  var api = {
    get_user : function(uuid){
      var deferred = $q.defer();
      $http.get(base_url + uuid)
        .success(function (res) {
          deferred.resolve(res);
        })
        .error(function (res) {
          deferred.reject(res);
        });
      return deferred.promise;
    },

    mark_read : function(uuid){
      var deferred = $q.defer();
      $http.get(base_url + 'markRead/' + uuid)
        .success(function (res) {
          deferred.resolve(res);
        })
        .error(function (res) {
          deferred.reject(res);
        });
      return deferred.promise;
    }
  };

  return api;
  
});