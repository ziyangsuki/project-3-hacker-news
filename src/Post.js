import React from 'react';
import Comment from './Comment';
import axios from 'axios';
const { v4: uuid } = require('uuid');

export default class Post extends React.Component {
    
    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
        this.state = {
            post: Object,
            comments: []
        }
        
        // this.post = this.findPostById();
        // this.comments = this.findCommentsByPostId();
    }

    // findPostById() {
        componentDidMount() {
        axios.get(`/home/post/${this.postId}`, {})
            .then((response) => {
                // console.log(response);
                this.setState({
                    post: response.data.res_body
                })
            })
            .catch((error) => {
                console.error(error);
            })
    // }

    // findCommentsByPostId() {
        // find comments
        axios.get(`/home/comment/comments/${this.postId}`, {})
            .then((response) => {
                this.setState({
                    comments: response.data.res_body
                })
            })
            .catch((error) => {
                console.error(error);
            })
        
    }

    showOrHideInput() {
        const display = document.getElementById('addComment').style.display;
        document.getElementById('addComment').style.display = display === 'none' ? 'inline' : 'none';
    }

    addComment() {
        const newComment = {
            postId: this.postId,
            content: this.state.commentToAdd,
            account: 'test',
            commentId: uuid()
        }
        console.log(newComment.commentId);
        axios.post(`/home/comment/comments/${this.postId}`, newComment)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    comments: this.state.comments.concat(response.data.res_body)
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        const post = this.state.post;
        const comments = this.state.comments;
        return (
            <div>


                <div><h1>{post.title}</h1></div>
                <div>Account: {post.account}</div>
                <div>CreateDate: {post.createDate}</div>
                <div>Content: {post.content}</div>





                <div className="action">
                    <div onClick={() => this.showOrHideInput()}>Add Comment</div>
                </div>
                <div id="addComment" style={{ display: 'none' }} >
                    <input type="text" 
                        onChange={(e) => this.setState({commentToAdd: e.target.value})} />
                    <div onClick={() => this.addComment()}>Submit</div>
                    <div onClick={() => this.showOrHideInput()}>Cancel</div>
                </div>

                {comments?.map((comment) => (
                    <Comment postId={this.postId} commentId={comment.commentId}></Comment>
                ))}
                
            </div>

        )

    }

}