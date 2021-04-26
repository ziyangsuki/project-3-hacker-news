import React from 'react';
import axios from 'axios';
// import { updateCommentByCommentId } from '../model/comment.model';
// import {findCommentsByCommentId, deleteCommentByCommentId} from '../model/comment.model'

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.postId = props.postId;
        this.commentId = props.commentId;
        this.comment = this.findCommentsByCommentId(this.id);
        this.state = {
            content:'',
            updateDate: Date.now()
        };
    }

    findCommentsByCommentId() {
        axios.get(`home/comment/comments/${this.postId}/${this.commentId}`, {})
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

    deleteCommentsByCommentId() {
        axios.get(`home/comment/comments/${this.postId}/${this.commentId}`, {})
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

    updateCommentsByCommentId() {
        axios.patch(`home/comment/comments/${this.postId}/${this.commentId}`, this.state)
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

    showOrHideInput() {
        const display = document.getElementById('editComment').style.display;
        document.getElementById('editComment').style.display = display === 'none' ? 'inline' : 'none';
    }

    render() {


        return (
            <div>
                <div>{this.comment.account}</div>
                <div>{this.comment.createDate}</div>
                <div>{this.comment.content}</div>
                <div className="action">
                    <div onClick={() => this.showOrHideInput()}>Edit Comment</div>
                    <div onClick={() => this.deleteCommentByCommentId()}>Delete Comment</div>
                </div>
                <div id="editComment" style={{ display: 'none' }} >
                    {/* <form>
                        <label>Edit Comment
                    <input type="text" value={this.comment.content}></input>
                            <button>Submit</button>
                            <button onClick={() => this.showOrHideInput()}>Cancel</button>
                        </label>
                    </form> */}
                    <input type="text" value={this.comment.content}
                        onChange={(e) => this.setState(e.target.value)} />
                    <div onChange={() => this.updateCommentByCommentId()}>Submit</div>
                    <div onClick={() => this.showOrHideInput()}>Cancel</div>
                </div>
            </div>


        )

    }

}