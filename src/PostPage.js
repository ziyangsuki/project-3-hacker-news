import React from 'react';
import Comment from './Comment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import './PostAndComment.css'
const { v4: uuid } = require('uuid');

class PostPage extends React.Component {

    constructor(props) {
        super(props);
        this.postId = this.props.match.params.postId;
        this.state = {
            post: Object,
            comments: []
        }

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
    }

    componentDidMount() {
        // Check if cookies has webtoken
        if (Cookies.get('webtoken')) {
            this.props.setToken({ type: "SETTOKEN", val: { webtoken: Cookies.get('webtoken'), account: Cookies.get('account') } });
        }
        this.findPostById();
        this.findCommentsByPostId();
    }

    // updateCommentNum(postId, num) {
        // axios.patch(`/home/post/${this.postId}`, {commentNum:num})
        // axios.patch(`/home/post/${postId}`, { commentNum: num })
        //     .then((response) => {
        //         console.log(response.res_body);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
    // }

    getCommentNum(postId) {
        let comments;
        let num;
        // axios.get(`/home/comment/comments/${this.postId}`, )
        axios.get(`/home/comment/comments/${postId}`,)
            .then((response) => {
                comments = response.data.res_body
                num = comments.length;
                // this.updateCommentNum(postId, num);
                axios.patch(`/home/post/${postId}`, { commentNum: num })
                    .then((response) => {
                        console.log(response.res_body);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    addComment() {
        this.showOrHideInput("addComment");
        const newComment = {
            postId: this.postId,
            content: this.state.commentToAdd,
            account: this.props.login.account,
            commentId: uuid()
        }
        console.log(newComment.postId);
        axios.post(`/home/comment/comments/${this.postId}`, newComment)
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    comments: this.state.comments.concat(response.data.res_body)
                })
            })
            .catch((error) => {
                console.error(error);
            })
        this.getCommentNum(this.postId);
    }

    showOrHideInput(id) {
        const display = document.getElementById(id).style.display;
        document.getElementById(id).style.display = display === 'none' ? 'inline' : 'none';
    }

    edit() {
        this.props.history.push(`/home/post/edit/${this.postId}`)
    }

    back() {
        this.props.history.push('/');
    }

    render() {
        const post = this.state.post;
        const comments = this.state.comments;

        let editButton;
        if (this.props.login && this.props.login.account && post.account === this.props.login.account) {
            editButton = (
                <span>
                    <div className="button" onClick={() => this.edit()}>
                        Edit
                </div>
                </span>
            )
        }
        return (

            <div className="body">
                <div className="button" onClick={() => this.back()}>Back</div>

                <div className="post-outline">
                    <div><h1>{post.title}</h1></div>
                    {editButton}
                    <div className="info-grid">
                        <div>Account: {post.account}</div>
                        <div>CreateDate: {post.createDate}</div>
                    </div>
                    <div className="post-content-box">
                        <div className="post-content">{post.content}</div>
                    </div>
                </div>

                <div className="button" onClick={() => this.showOrHideInput('addComment')}>Add Comment</div>

                <div id="addComment" style={{ display: 'none' }} >
                    <div className="flex-box">
                        <input type="text"
                            onChange={(e) => this.setState({ commentToAdd: e.target.value })} />
                    </div>
                    <div className="action-buttons-grid">
                        <div className="button" onClick={() => this.addComment()}>Submit</div>
                        <div className="button" onClick={() => this.showOrHideInput('addComment')}>Cancel</div>
                    </div>
                </div>
                <div className="comment-outline" style={{display:comments.length>0?'inline':'none'}}>
                    {comments?.map((comment) => (
                        <Comment key={comment.commentId} postId={this.postId} commentId={comment.commentId} func={this.getCommentNum}></Comment>
                    ))}
                </div>

            </div>

        )

    }
}

let mapDispatchToProps = function (dispatch, props) {
    return {
        setToken: (val) => {
            dispatch(val);
        }
    }
}

let mapStateToProps = function (state, props) {
    return {
        login: state.login
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage);