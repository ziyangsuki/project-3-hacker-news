const mongoose = require('mongoose');

PostSchema = new mongoose.Schema({
    postId:{
        type: String,
    },
    userId:{
        type: String,
    },
    account:{
        type: String
    },
    title:{
        type: String
    },
    content:{
        type: String
    },
    commentNum:{
        type: Number,
        default:0,
        min: 0
    },
    createDate:{
        type: Date, 
        default: Date.now()
    },
    updateDate:{
        type: Date,
        default: Date.now()
    }
}, {collection: 'post'})

exports.PostSchema = PostSchema;
