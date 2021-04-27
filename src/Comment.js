import React from 'react';
import axios from 'axios';
// import { updateCommentByCommentId } from '../model/comment.model';
// import {findCommentsByCommentId, deleteCommentByCommentId} from '../model/comment.model'

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.postId = props.postId;
        this.commentId = props.commentId;
        this.state = {
            comment: Object,
            content:'',
            updateDate: Date.now()
        };
    }

    // get comment by id
    componentDidMount() {
        console.log(this)
        axios.get(`/home/comment/comments/${this.postId}/${this.commentId}`, {})
            .then((response) => {
                console.log(response.data);
                this.setState({
                    comment: response.data.res_body
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }

    deleteCommentByCommentId() {
        axios.delete(`/home/comment/comments/${this.postId}/${this.commentId}`, {})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    updateCommentsByCommentId() {
        axios.patch(`/home/comment/comments/${this.postId}/${this.commentId}`, this.state)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    comment: response.data.res_body
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
        const comment = this.state.comment;

        return (
            <div>
                <div>{comment.account}</div>
                <div>{comment.createDate}</div>
                <div>{comment.content}</div>
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
                    {/* <input type="text" value={comment.content} */}
                    <input type="text"
                        onChange={(e) => this.setState({content: e.target.value})} />
                    <div onClick={() => this.updateCommentByCommentId()}>Submit</div>
                    <div onClick={() => this.showOrHideInput()}>Cancel</div>
                </div>
            </div>


        )

    }

}