import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './PostAndComment.css'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.postId = props.postId;
        this.commentId = props.commentId;
        this.getPostCommentNum = props.func;
        this.state = {
            comment: Object,
            content: '',
            updateDate: Date.now()
        };
    }

    getCommentById() {
        axios.get(`/home/comment/comments/${this.postId}/${this.commentId}`, {})
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    comment: response.data.res_body
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getCommentById();
    }

    deleteCommentByCommentId() {
        this.setState({ doesExist: false });
        axios.delete(`/home/comment/comments/${this.postId}/${this.commentId}`, {})
            .then((response) => {
                console.log("Comment deleted")
                this.getPostCommentNum(this.postId);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    updateCommentByCommentId() {
        const updates = { content: this.state.content, updateDate: this.state.updateDate }
        axios.patch(`/home/comment/comments/${this.postId}/${this.commentId}`, updates)
            .then((response) => {
                this.setState({
                    comment: response.data.res_body
                })
                this.showOrHideInput(this.commentId)
                this.getCommentById();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    showOrHideInput(id) {
        const display = document.getElementById(id).style.display;
        document.getElementById(id).style.display = display === 'none' ? 'inline' : 'none';
    }

    render() {
        if (this.state.doesExist === false) return null;

        const comment = this.state.comment;

        let modifyButtonSet;
        if (comment.account === this.props.login.account && comment.account !== "Guest") {
            modifyButtonSet = (
                <div>
                    <div className="action-buttons-grid">
                        <button className="button" onClick={() => this.showOrHideInput(this.commentId)}>Edit Comment</button>
                        <button className="button" onClick={() => this.deleteCommentByCommentId()}>Delete Comment</button>
                    </div>
                    <div id={comment.commentId} style={{ display: 'none' }} className="edit-area">
                        <textarea defaultValue={this.state.comment.content}
                            onChange={(e) => this.setState({ content: e.target.value })} />
                        <div className="action-buttons-grid">
                            <button className="button" onClick={() => this.updateCommentByCommentId()}>Submit</button>
                            <button className="button" onClick={() => this.showOrHideInput(this.commentId)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="comment-body">
                <div className="info-grid" id="comment-info">
                    <div className="info">Account: {comment.account}</div>
                    <div className="info">Create Date: {comment.createDate}</div>
                </div>
                <div className="comment-content"><span>{comment.content}</span></div>
                {modifyButtonSet}
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
)(Comment);