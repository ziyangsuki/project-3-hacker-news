import React from 'react';
import Comment from './Comment';
import axios from 'axios';
import { connect } from 'react-redux';
const { v4: uuid } = require('uuid');

class Post extends React.Component {
    
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

    findPostById() {
        
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
    }

    findCommentsByPostId() {
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
        console.log(this.state)
    }

    componentDidMount() {
        this.findPostById();
        this.findCommentsByPostId();
    }


    addComment() {
        this.showOrHideInput("addComment");
        const newComment = {
            postId: this.postId,
            content: this.state.commentToAdd,
            account: this.props.login.account,
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

    // deleteCommentByCommentId() {
    //     axios.delete(`/home/comment/comments/${this.postId}/${this.commentId}`, {})
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // }

    // updateCommentsByCommentId() {
    //     axios.patch(`/home/comment/comments/${this.postId}/${this.commentId}`, this.state)
    //         .then((response) => {
    //             console.log(response.data);
    //             this.setState({
    //                 comment: response.data.res_body
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // }

    showOrHideInput(id) {
        const display = document.getElementById(id).style.display;
        document.getElementById(id).style.display = display === 'none' ? 'inline' : 'none';
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
                    <div onClick={() => this.showOrHideInput('addComment')}>Add Comment</div>
                </div>
                <div id="addComment" style={{ display: 'none' }} >
                    <input type="text" 
                        onChange={(e) => this.setState({commentToAdd: e.target.value})} />
                    <button onClick={() => this.addComment()}>Submit</button>
                    <button onClick={() => this.showOrHideInput('addComment')}>Cancel</button>
                </div>

                {comments?.map((comment) => (
                    <Comment postId={this.postId} commentId={comment.commentId}></Comment>
                ))}
                
            </div>

        )

    }

}

let mapDispatchToProps = function(dispatch, props) {
    return {
        setToken: (val) => {
          dispatch(val);
        }
    }
}

let mapStateToProps = function(state, props) {
    return {
      login: state.login
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);