import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

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
    axios.post('/addUser', {user: newUser})
      .then((response) => {
        console.log(response.data);
        console.log(response.data.res_body.token);
        //1. set token
        this.props.setToken({type:"SETTOKEN", val:response.data.res_body.token});
        //2. return to front page

      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <div>
        <label>Account: </label>
        <input type="text" value={this.state.account} 
            onChange={e => this.setState({account:e.target.value})}>
        </input>
        <label>Password: </label>
        <input type="text" value={this.state.password} 
            onChange={e => this.setState({password:e.target.value})}>
        </input>
        <button onClick={()=> this.signUp()}>Sigh Up</button>
        <div>
            {this.props.token.token}
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
    console.log(state)
    return {
        token: state.sighUp
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SighUpPage);
