import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import './EditPostPage.css';


class EditPostPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      error: ""
    }
  }

  editPost(){
    if(!this.state.title){
      this.setState({
          error: "Please fill the Title."
      })
      return;
    }
    let post = {
      title:this.state.title,
      content: this.state.content,
    };

    axios.put('/home/post', post)
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
      <div className="eidtPost-content">
        <div className="warning">
            {this.state.error}
        </div>
        <table>
          <tbody>
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
              <td><label>New Content</label></td>
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
                <button onClick={()=> this.editPost()}>Submit</button>
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
)(EditPostPage);
