import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testUser: {
        userId: 12345,
        account: "hsinyulu",
        password: 12345,
      }
    }
  }

  componentDidMount(){
    axios.post('/testApiPost', {requestData: this.state.testUser})
      .then((response) => {
        this.setState({
          testData: response.data.responseDate
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    return (
      <div>
        {this.state.testData}
      </div>
    )
  }

}

export default App;
