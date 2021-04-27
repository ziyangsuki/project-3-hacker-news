const mongoose = require('mongoose');

const PostSchema = require('../schema/post.schema.js').PostSchema;

const PostModel = mongoose.model('post', PostSchema);

function addPost(post){
    return PostModel.create(post);
}

function findAllPosts(){
    return PostModel.find().exec();
}

function findPostById(id) {
    const post = PostModel.findById(id);
    return post;
}

//updateDoc is an object
function editPost(postId, updateDoc){
    return PostModel.findByIdAndUpdate({_id: postId},
        updateDoc);
}

function deletePostById(postId){
    return PostModel.findByIdAndDelete(postId);
}

function updatePostCommentNum(postId, NewcommentNum) {
    return PostModel.findByIdAndUpdate({_id: postId},
        NewcommentNum)
}


exports.addPost = addPost;
exports.findAllPosts = findAllPosts;
exports.editPost = editPost;
exports.deletePostById = deletePostById;
exports.findPostById = findPostById;
exports.updatePostCommentNum = updatePostCommentNum;
