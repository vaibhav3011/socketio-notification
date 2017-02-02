/**
 * Created by gozoomo on 27/7/16.
 */

module.exports = function(socket, io) {

  var User = require('./models/User');
  var Q = require('q');

  /*
  If user with given uuid is in database then return user
  else create new user and return that user
   */
  exports.set_user = function (uuid) {
    var defer = Q.defer();
    User.findOne({uuid: uuid}, function (err, user) {
      if (err) {
        //Handle errors
        handleError(err);
        return defer.reject(err);
      }
      if (!user) {
        User.create({uuid: uuid, messages: [], unreadMessages : 0}, function (err, usr) {
          return defer.resolve(usr);
        });
      }
      else {
        return defer.resolve(user);
      }
    });
    return defer.promise;
  };
  /*
  16400 - shiva cabs
  16300 - zyppys
  1
  /*
  Add message to user.messages
   */
  exports.add_message = function (uuid, name) {
    var defer = Q.defer();
    User.findOne({uuid: uuid}, function (err, user) {
      if (err) {
        return defer.reject(err)
      }
      if (!user) {
        return defer.reject("not found");
      }
      user.unreadMessages++;
      user.messages.push({name : name, message: "posted a photo on your wall", read : false});
      user.save(function (err) {
        if (err) {
          handleError(err);
          return defer.reject(err);
        }
        return defer.resolve(user);
      });
    });
    return defer.promise;
  };

  function handleError(err) {
    console.log('err : ' + err);
//   return res.send(500, err);
  }
  
  /*
  'new connection' will be fired from frontend,
  on 'new connection', it will start triggering new messages to user on random intervals
   */
  socket.on('new connection', function (data) {
    var user;
    var names = ["Batman", 'Yoda', 'Gandalf', 'Superman', 'Captain'];
    var  i=0;
    var timeout;
    exports.set_user(data.uuid).then(function (data) {
      
      user = data;
      
      //send user data to frontend on every new connection
      io.to(socket.id).emit("connectionSuccess", user);
      function trigger_message(){
        exports.add_message(user.uuid, names[i]).then(function(user){
          io.to(socket.id).emit("add message", user);   
        });
        i = (i+1)%5;
        timeout = setTimeout(trigger_message, Math.random()*20000);
      }
      setTimeout(trigger_message, Math.random()*20000);
    });

    //On disconnection from clientside, stop the timeout to prevent from keep on adding new messages
    socket.on('disconnect', function () {
      clearTimeout(timeout);
    });
  });
};