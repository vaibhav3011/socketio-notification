angular.module('wingifyApp').factory('socketService', function($cookies, uuid4) {

  var socket_io;
  var socket = {
    init : function(){
      /*
      Initialize user
      If uuid is not available in cookies, create new uuid
      Create new connection
       */
      socket_io = io();
      if($cookies.get('uuid')){
        socket_io.emit('new connection', { uuid: $cookies.get('uuid') });
      }
      else{
        var uuid = uuid4.generate();
        $cookies.put('uuid', uuid);
        socket_io.emit('new connection', { uuid: uuid });
      }
    },
    getSocket : function(){
      return socket_io;
    }
  };

  return socket;

});