angular.module('wingifyApp').controller('MainController', function($scope, socketService, api) {
  

  $scope.user = {};
  socketService.getSocket().on ('connectionSuccess', function (data) {
    $scope.user = data;
    $scope.$apply();
  });

  socketService.getSocket().on('add message', function(data){
    $scope.user = data;
    $scope.$apply();
  });
  
  $scope.markRead = function(){
      api.mark_read($scope.user.uuid).then(function (data) {
        $scope.user = data;
      });
  };
});