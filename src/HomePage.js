import axios from 'axios';
import React from 'react';
import './HomePage.css';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    // Check if cookies has webtoken
    if(Cookies.get('webtoken')){
      this.props.setToken({type: "SETTOKEN", val: {webtoken:Cookies.get('webtoken'), account:Cookies.get('account')}});
    }
    
    // Get all posts
    axios.get('/home/post/all', {})
      .then((response) => {
        this.setState({
          posts:response.data.res_body
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  createPost(){

  }

  register(){
    this.props.history.push('/register')
  }

  login(){
    this.props.history.push('/login')
  }

  logout(){
    axios.post('/login//logout', {})
      .then((response) => {
        this.props.setToken({type: "CLEARTOKEN"});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {

    //Assemble render posts
    const renderedPosts = [];
    for(let i = 0; i < this.state.posts.length; i++){
      const post = this.state.posts[i];
      renderedPosts.push(
        <tr key={i}>
          <td>
            <div>
              {i+1}. {post.title}
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;{post.content} | {post.account} | comments: {post.commentNum} | {post.createDate}
            </div>
          </td>
        </tr>
      )
    }

    let loginButton;
    if(this.props.login.webtoken === ""){
      loginButton = (
        <div>
          <button onClick={()=> this.login()}>
            Login
          </button>
          <button onClick={()=> this.register()}>
            Register
          </button>
        </div>
      )
    }else{
      loginButton = (
        <div>
          <button onClick={()=> this.logout()}>
            Logout
          </button>
          <button onClick={()=> this.createPost()}>
            Create Post
          </button>
        </div>
      )
    }

    return (
      <div className="center">
        <div className="nav-bar">
            <div>
                Hacker News
            </div>
        </div>
        <div className="tool-bar">
            <div></div>
            <div>
              <span>
                {this.props.login.account}
              </span>
              &nbsp;&nbsp;&nbsp;
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
)(HomePage);