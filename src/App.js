import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      account: "",
      password: "",
      users: []
    }
  }

  componentDidMount(){
    // Call API, findAllUsers
    axios.get('/findAllUsers')
      .then((response) => {
        console.log(response.data.res_body)
        this.setState({
          users: response.data.res_body
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  buttonOnClick(){

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

    //Assemble render users
    const renderedUsers = [];
    for(let i = 0; i < this.state.users.length; i++){
      const user = this.state.users[i];
      renderedUsers.push(
        <div key={i}>
          {user.userId}, {user.account}, {user.password}
        </div>
      )
    }

    return (
      <div>
        <label>Account: </label>
        <input type="text" value={this.state.account} onChange={e => this.setState({account:e.target.value})}></input>
        
        <label>Password: </label>
        <input type="text" value={this.state.password} onChange={e => this.setState({password:e.target.value})}></input>
        
        <button onClick={()=> this.buttonOnClick()}>Add User</button>

        {renderedUsers}

      </div>
    )
  }
}

export default App;
