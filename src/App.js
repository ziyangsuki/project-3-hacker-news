import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import SignUpPage from './SignUpPage';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <SignUpPage></SignUpPage>
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
)(App);
