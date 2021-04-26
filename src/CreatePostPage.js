import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import './CreatePostPage.css';


class CreatePostPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      account: "",
      content: "",
      error: ""
    }
  }

  createPost(){
    if(!this.state.title || !this.state.content){
      this.setState({
          error: "Please fill the Title and Content."
      })
      return;
    }
    let post = {
      title:this.state.title,
      account:this.state.account,
      content: this.state.content,
    };

    axios.post('/home/post', post)
      .then((response) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({
            error: error.response.data.res_body
        })
      })
  }


  back(){
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="createPost-content">
        <div className="warning">
            {this.state.error}
        </div>
        <table>
          <tbody>
          <tr>
              <td><label>Account Name</label></td>
              <td>:</td>
              <td> 
                <input type="text" value={this.state.account} 
                  onChange={e => this.setState({account:e.target.value})}>
                </input>
              </td>
            </tr>
            <tr>
              <td><label>Title</label></td>
              <td>:</td>
              <td> 
                <input type="text" value={this.state.title} 
                  onChange={e => this.setState({title:e.target.value})}>
                </input>
              </td>
            </tr>
            <tr>
              <td><label>Content</label></td>
              <td>:</td>
              <td> 
                <input type="text" value={this.state.content} 
                  onChange={e => this.setState({content:e.target.value})}>
                </input>
              </td>
            </tr>
            <tr>
              <td/>
              <td/>
              <td>
                <button onClick={()=> this.back()}>Back</button>
                <button onClick={()=> this.createPost()}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

let mapDispatchToProps = function(dispatch, props) {
  return {
  }
}

let mapStateToProps = function(state, props) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostPage);
