// grab the mongoose module
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var message = new Schema({
	name : String,
	message : String,
	read : Boolean
});
var UserSchema = new Schema({
	uuid : String,
	messages : [message],
	unreadMessages : Number
});
module.exports = mongoose.model('User', UserSchema);
