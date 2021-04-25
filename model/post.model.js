const mongoose = require('mongoose');

const PostSchema = require('../schema/post.schema.js').PostSchema;

const PostModel = mongoose.model('post', PostSchema);

function addPost(post){
    return PostModel.create(post);
}

function findAllPosts(){
    return PostModel.find().exec();
}

exports.addPost = addPost;
exports.findAllPosts = findAllPosts;
