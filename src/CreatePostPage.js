import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import './CreatePostPage.css';


class CreatePostPage extends React.Component {
  constructor(props) {
    super(props);
    this.postId = this.props.match.params.postId;
    this.state = {
      title: "",
      content: "",
      error: ""
    }
  }

  componentDidMount() {
    // Check if cookies has webtoken
    if (Cookies.get('webtoken')) {
      this.props.setToken({ type: "SETTOKEN", val: { webtoken: Cookies.get('webtoken'), account: Cookies.get('account') } });
    }
    if (this.postId) {
      axios.get(`/home/post/${this.postId}`, {})
        .then((response) => {
          // console.log(response);
          const res_body = response.data.res_body;
          this.setState({
            title: res_body.title,
            content: res_body.content,
            account: res_body.account
          });
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  createPost() {
    if (!this.state.title || !this.state.content) {
      this.setState({
        error: "Please fill the Title and Content."
      })
      return;
    }
    let post = {
      title: this.state.title,
      account: this.props.login.account,
      content: this.state.content,
    };

    if (this.postId) {
      // postId exists, which means we'd like to edit instead of creating the post
      axios.put(`/home/post/${this.postId}`, post)
        .then((response) => {
          this.props.history.push('/');
        })
        .catch((error) => {
          this.setState({
            error: error.response.data.res_body
          })
        })
    } else {
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
  }


  back() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="body">
        <div className="warning">
          {this.state.error}
        </div>
        <table>
          <tbody>
            <tr>
              <td><label><h3>Title</h3></label></td>
              <td>:</td>
              <td>
                <input type="text" value={this.state.title} id="title-input"
                  onChange={e => this.setState({ title: e.target.value })}>
                </input>
              </td>
            </tr>
            <tr>
              <td><label><h3>Content</h3></label></td>
              <td>:</td>
              <td>
                <input type="text" value={this.state.content} id="content-input"
                  onChange={e => this.setState({ content: e.target.value })}>
                </input>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="button" onClick={() => this.createPost()}>Submit</button>
        <button className="button" onClick={() => this.back()}>Back</button>
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
)(CreatePostPage);
