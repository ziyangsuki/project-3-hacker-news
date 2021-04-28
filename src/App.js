import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CreatePostPage from './CreatePostPage';
import PostPage from './PostPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route exact path={"/login"} component={LoginPage}/>
                <Route exact path={"/register"} component={SignUpPage}/>
                <Route exact path={"/home/post/new"} component={CreatePostPage}/>
                <Route exact path={"/home/post/:postId"} component={PostPage}/>
                <Route exact path={"/home/post/edit/:postId"} component={CreatePostPage} />
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
