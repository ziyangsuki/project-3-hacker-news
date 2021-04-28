const mongoose = require('mongoose');

const UserSchema = require('../schema/user.schema.js').UserSchema;

const UserModel = mongoose.model('user', UserSchema);

function addUser(user){
    return UserModel.create(user);
}

function findAllUsers(){
    return UserModel.find().exec();
}

function findUser(account) {
    return UserModel.findOne({account: account}).exec();
}

exports.addUser = addUser;
exports.findAllUsers = findAllUsers;
exports.findUser = findUser;