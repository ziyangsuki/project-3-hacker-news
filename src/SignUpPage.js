import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import './SignUpPage.css';


class SighUpPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        account: "",
        password: ""
    }
  }

  componentDidMount(){
    
  }

  signUp(){
    if(!this.state.account || !this.state.password){
      return alert("Please fill the Account and Password.");
    }

    //1. Assemble user data
    let newUser = {
      account:this.state.account,
      password:this.state.password
    };

    //2. Call API, adduUser
    axios.post('/login/register', {user: newUser})
      .then((response) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error(error);
      })
  }

  back(){
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="signup-content">
        <table>
          <tbody>
            <tr>
              <td><label>Account</label></td>
              <td>:</td>
              <td> 
                <input type="text" value={this.state.account} 
                  onChange={e => this.setState({account:e.target.value})}>
                </input>
              </td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td>:</td>
              <td>
                <input type="text" value={this.state.password} 
                  onChange={e => this.setState({password:e.target.value})}>
                </input>
              </td>
            </tr>
            <tr>
              <td/>
              <td/>
              <td>
                <button onClick={()=> this.back()}>Back</button>
                <button onClick={()=> this.signUp()}>Sigh Up</button>
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
)(SighUpPage);
