var User = require('./models/User');


//Get user from uuid
exports.getUser = function(req, res){
	User.findOne({uuid : req.params.uuid}, function(err, user){
    if(err){handleError(res, err);}
    if(!user){
      return res.send(404);
    }
    return res.json(user);
  })
};

//Mark all messages as read when user clicks on the bell
exports.markRead = function(req, res){
  User.findOne({uuid : req.params.uuid}, function(err, user){
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    // var updated = JSON.parse(JSON.stringify(user));
    user.unreadMessages = 0;
    user.messages.forEach(function(msg){
      msg.read = true;
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};


function handleError(res, err) {
  console.log('err : ' + err);
  return res.send(500, err);
}