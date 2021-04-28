import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      error: ""
    }
  }

  login() {
    if (!this.state.account || !this.state.password) {
      this.setState({
        error: "Please fill the Account and Password."
      })
      return;
    }

    //1. Assemble user data
    let user = {
      account: this.state.account,
      password: this.state.password
    };

    //2. Call API, adduUser
    axios.post('/login/login', { user: user })
      .then((response) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.res_body
        })
      })
  }

  back() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="login-content">
        <div className="warning">
          {this.state.error}
        </div>
        <table>
          <tbody>
            <tr>
              <td><label>Account</label></td>
              <td>:</td>
              <td>
                <input type="text" value={this.state.account}
                  onChange={e => this.setState({ account: e.target.value })}>
                </input>
              </td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td>:</td>
              <td>
                <input type="password" value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}>
                </input>
              </td>
            </tr>
          </tbody>
        </table>
          <button className='button' onClick={() => this.login()}>Login</button>
          <button className='button' onClick={() => this.back()}>Back</button>
      </div>
    )
  }
}

let mapDispatchToProps = function (dispatch, props) {
  return {
  }
}

let mapStateToProps = function (state, props) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
