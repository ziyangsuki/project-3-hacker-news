const mongoose = require('mongoose');

CommentSchema = new mongoose.Schema({
    commentId:{
        type: String,
    },
    postId:{
        type: String,
    },
    userId:{// commentator id
        type: String,
    },
    account:{// commentator account
        type: String
    },
    content:{
        type: String
    },
    createDate:{
        type: Date, 
        default: Date.now()
    },
    updateDate:{
        type: Date,
        default: Date.now()
    }
}, {collection: 'comment'})

exports.CommentSchema = CommentSchema;
