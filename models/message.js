var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//Middleware given by mongoose -> used to remove message from stack of messages of a particular/selected user
schema.post('remove',function(message){
    User.findById(message.user,function(err,user){
        user.messages.pull(message._id);
        user.save();
    });
});
module.exports = mongoose.model('Message', schema);