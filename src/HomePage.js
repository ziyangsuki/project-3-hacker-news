import axios from 'axios';
import React from 'react';
import './HomePage.css';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: "Guest",
      posts: []
    }
  }

  componentDidMount(){
    //check if cookies has webtoken
    
    axios.get('/home/post/all', {})
      .then((response) => {
        console.log(response.data);
        this.setState({
          posts:response.data
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

  render() {

    //Assemble render posts
    const renderedPosts = [];
    for(let i = 0; i < this.state.posts.length; i++){
      const post = this.state.posts[i];
      renderedPosts.push(
        <div key={i}>
          <span>{i+1}.</span><span>{post.title}</span><span>{post.date}</span><span>{post.numOfComments}</span>
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
                {this.state.user}
              </span>
              &nbsp;&nbsp;&nbsp;
              <button onClick={()=> this.register()}>
                Register
              </button>
              <button onClick={()=> this.createPost()}>
                Create Post
              </button>
            </div>
        </div>
        <div className="content">
            {renderedPosts}
        </div>
      </div>
    )
  }
}

export default HomePage;