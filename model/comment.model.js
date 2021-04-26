const mongoose = require('mongoose');

const CommentSchema = require('../schema/comment.schema.js').CommentSchema;

const CommentModel = mongoose.model('comment', CommentSchema);

function addComment(comment){
    return CommentModel.create(comment);
}

function findCommentsByPostId(postId) {
    return CommentModel.find({postId: postId}).exec();
}

function findCommentByCommentId(commentId) {
    return CommentModel.findOne({commentId}).exec();
}

function deleteCommentByCommentId(commentId) {
    return CommentModel.deleteOne({commentId}).exec();
}

function updateCommentByCommentId(commentId, updatedContent) {
    return CommentModel.updateOne({commentId:commentId}, updatedContent);
}

exports.findComments = findCommentsByPostId;
exports.addComment = addComment;
exports.findCommentByCommentId = findCommentByCommentId;
exports.deleteCommentByCommentId = deleteCommentByCommentId;
exports.updateCommentByCommentId = updateCommentByCommentId;
