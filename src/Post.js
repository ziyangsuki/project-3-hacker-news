import React from 'react';
import Comment from './Comment';
import axios from 'axios';


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
                console.log(response);
                this.setState({
                    post: response.data.res_body
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    findCommentsByPostId() {
        
        axios.get('/home/comment/comments/'+this.postId, {})
            .then((response) => {
                this.setState({
                    comments: response.data.res_body
                })
            })
            .catch((error) => {
                console.error(error);
            })
        
    }



    render() {
        //  this.findPostById();
        // const comments = this.findCommentsByPostId();
        // console.log(this.state.post);
        const post = this.state.post;
        const comments = this.state.comments;
        return (
            <div>
                {/* <button onClick={()=>this.findPostById()}>click</button> */}
                {/* <div>{this.post}</div> */}
                <div><h1>{post.title}</h1></div>
                <div>Account: {post.account}</div>
                <div>CreateDate: {post.createDate}</div>
                <div>Content: {post.content}</div>

                {comments?.map((comment) => (
                    <Comment postId={this.id} commentId={comment.commentId}></Comment>
                ))}
                
            </div>

        )

    }

}