const mongoose = require('mongoose');

const TestUserSchema = require('../schema/testUser.schema.js').TestUserSchema;

const TestUserModel = mongoose.model('testUser', TestUserSchema);

function addUser(user){
    return TestUserModel.create(user);
}

function findAllUsers(){
    return TestUserModel.find().exec();
}


exports.addUser = addUser;
exports.findAllUsers = findAllUsers;