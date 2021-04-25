const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const PostModel = require('../model/post.model')
const CommentModel = require('../model/comment.model')

router.get('/all', function(req, res) {
    return PostModel.findAllPosts()
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

router.get('/comment/comments/:postId', function(req, res) {
    const postId = req.params.postId;
    return CommentModel.findComments(postId)
    .then(response => {
        res.status(200).send({res_msg:"Success", res_body: response});
    }, (error) => {
        res.status(500).send({res_msg:"Error", res_body: error});
    })
})

module.exports = router;