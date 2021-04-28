import axios from 'axios';
import React from 'react';
import './HomePage.css';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    // Check if cookies has webtoken
    if (Cookies.get('webtoken')) {
      this.props.setToken({ type: "SETTOKEN", val: { webtoken: Cookies.get('webtoken'), account: Cookies.get('account') } });
    }
    // Get all posts
    axios.get('/home/post/all', {})
      .then((response) => {
        this.setState({
          posts: response.data.res_body
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createPost() {
    this.props.history.push('/home/post/new')
  }

  edit(postId) {
    this.props.history.push(`/home/post/edit/${postId}`)
  }

  linkToPost(postId) {
    this.props.history.push(`/home/post/${postId}`);
  }

  deleteAllComments(postId) {
    axios.delete('/home/comment/comments/' + postId, {})
      .then((response) => {
        console.log('successfully deleted comments of ' + postId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  delete(postId) {
    axios.delete('/home/post/' + postId, {})
      .then((response) => {
        console.log('successfully deleted ' + postId);
        let updatedposts = this.state.posts.filter((p) => p._id !== postId);
        this.setState({
          posts: updatedposts
        });
        this.deleteAllComments(postId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  register() {
    this.props.history.push('/register')
  }

  login() {
    this.props.history.push('/login')
  }

  logout() {
    axios.post('/login//logout', {})
      .then((response) => {
        this.props.setToken({ type: "CLEARTOKEN" });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {

    //Assemble render posts
    const renderedPosts = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      const post = this.state.posts[i];
      renderedPosts.push(
        <tr key={i}>
          <td>
            <div onClick={() => this.linkToPost(post._id)}>
              <b className="post-title">{i + 1}. {post.title}</b>
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;{post.account} | comments: {post.commentNum} | {post.createDate}
            </div>
          </td>
        </tr>
      )
      let modifyButton;
      if (post.account === this.props.login.account) {
        modifyButton = (
          <span>
            <button className="small-button" onClick={() => this.edit(post._id)}>
              Edit
            </button>
            <button className="small-button" onClick={() => this.delete(post._id)}>
              Delete
            </button>
          </span>
        )
        renderedPosts.push(modifyButton)
      }

    }


    let loginButton;
    if (this.props.login.webtoken === "") {
      loginButton = (
        <div className="home-buttons-box">
          <button className="home-button" onClick={() => this.login()}>
            Login
          </button>
          <button className="home-button" onClick={() => this.register()}>
            Register
          </button>
        </div>
      )
    } else {
      console.log(this.props.login)
      loginButton = (
        <div className="home-buttons-box">
          <button className="button" onClick={() => this.logout()}>
            Logout
          </button>
          <button className="button" onClick={() => this.createPost()}>
            Create Post
          </button>
        </div>
      )
    }

    return (
      <div className='body'>
        <div className="center">
          <div className="nav-bar">
            <div className='topic'>
              Amazing  Web  Development  Ideas
              </div>
          </div>
          <div className="tool-bar">
            <div className="left-space"></div>
            <div className="account">
              <div className='accountName'>
                <b>{this.props.login.account}</b>
              </div>
                {loginButton}
            </div>
          </div>
          
          <div className="content">
            <table className="post-content">
              <tbody>
                {renderedPosts}
              </tbody>
            </table>
          </div>
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
)(HomePage);