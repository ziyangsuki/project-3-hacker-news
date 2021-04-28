const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const PostModel = require('../model/post.model')
const CommentModel = require('../model/comment.model');
const { response } = require('express');

router.get('/post/all', function(req, res) {
    return PostModel.findAllPosts()
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.post('/post', function(req,res) {
    console.log(req);
    const post = req.body;
    return PostModel.addPost(post)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.get('/post/:postId', function(req,res) {
    const postId = req.params.postId;
    return PostModel.findPostById(postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.put('/post/:postId', function(req,res) {
    const postId = req.params.postId;
    const updateDoc = req.body;
    return PostModel.editPost(postId, updateDoc)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.delete('/post/:postId', function(req,res) {
    const postId = req.params.postId;
    return PostModel.deletePostById(postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.patch('/post/:postId', function(req, res) {
    console.log("what")
    return PostModel.updatePostCommentNum(req.params.postId, req.body)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

/*Comments*/

router.get('/comment/comments/:postId', function(req, res) {
    return CommentModel.findComments(req.params.postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.get('/comment/comments/:postId/:commentId', function(req, res) {
    return CommentModel.findCommentByCommentId(req.params.commentId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.post('/comment/comments/:postId', function(req, res) {
    return CommentModel.addComment(req.body)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.delete('/comment/comments/:postId/:commentId', function(req, res) {
    return CommentModel.deleteCommentByCommentId(req.params.commentId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.delete('/comment/comments/:postId', function(req, res) {
    return CommentModel.deleteAllCommentsByPostId(req.params.postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.patch('/comment/comments/:postId/:commentId', function(req, res) {
    return CommentModel.updateCommentByCommentId(req.params.commentId, req.body)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.get('/comment/comments/:postId/num', function(req, res) {
    return CommentModel.countCommentByPostID(req.params.postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

module.exports = router;
