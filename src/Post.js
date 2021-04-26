import React from 'react';
// import {findPostById} from '../model/comment.model';
import {Comment} from './Comment';
import axios from 'axios';
// import {findCommentsByPostId} from '../model/comment.model'


export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.postID;
        
    }

    findCommentsByPostId() {
        axios.get(`home/comment/comments/${this.postId}`, {})
            .then((response) => {
                console.log(response.data);
                this.setState({
                    posts: response.data
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    findPostById() {
        axios.get(`home/post/${this.postId}`, {})
            .then((response) => {
                console.log(response.data);
                this.setState({
                    posts: response.data
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        const post = this.findPostById();
        const comments = this.findCommentsByPostId();

        return (
            <div>
                <div>{post.title}</div>
                <div>{post.account}</div>
                <div>{post.createDate}</div>
                <div>{post.content}</div>

                {comments?.map((comment) => (
                    <Comment postId={this.id} commentId={comment.commentId}></Comment>
                ))}
            </div>

        )

    }

}