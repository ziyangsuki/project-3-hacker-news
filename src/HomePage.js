import axios from 'axios';
import React from 'react';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    
  }

  createPost(){

    if(!this.state.account || !this.state.password){
      return alert("Please fill the Account and Password.");
    }

    //1. Assemble user data
    let newUser = {
      account:this.state.account,
      password:this.state.password
    };

    //2. Call API, adduUser
    axios.post('/addUser', {user: newUser})
      .then((response) => {
        console.log(response.data);
        //3. Call API, findAllUsers again
        return axios.get('/findAllUsers')
      })
      .then((response) => {
        console.log(response.data)
        this.setState({
          users: response.data.res_body
        })
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
        <div key={i}>
          <span>{i+1}.</span><span>{post.title}</span><span>{post.date}</span><span>{post.numOfComments}</span>
        </div>
      )
    }

    return (
      <div>
        <div className="nav-bar">
            <div>
                Title
            </div>
            <div>
                <button onClick={()=> this.createPost()}>
                    Post
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