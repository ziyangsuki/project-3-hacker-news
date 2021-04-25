const mongoose = require('mongoose');

const CommentSchema = require('../schema/comment.schema.js').CommentSchema;

const CommentModel = mongoose.model('comment', CommentSchema);

function addComment(comment){
    return CommentModel.create(comment);
}

function findComments(postId) {
    return CommentModel.find({commentId: commentId}).exec();
}

exports.findComments = findComments;
exports.addComment = addComment;
