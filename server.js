var express = require('express');
var app = express();
var mongoose       = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var route = require('./app/routes');
server.listen(8080, function(){
  console.log('Server listening at port 8080');
});

var db = require('./config/db');
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//Routes
app.get('/:uuid', route.getUser);
app.get('/markRead/:uuid', route.markRead);


io.on('connection', function (socket) {
  require('./app/socketEvents')(socket, io);
});