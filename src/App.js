import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <Router>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route exact path={"/register"} component={SignUpPage}/>
                <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
        </Router>
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
