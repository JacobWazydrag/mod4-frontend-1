import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LoginPage from './components/login'
import SignUpPage from './components/signup'
import NotesPage from './containers/notes'
import { connect } from 'react-redux';
import Header from './containers/header'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
          <Route path='/' render={routerProps => <Header {...routerProps}/>} />
          <Route exact path="/SignUp" render={routerProps => <SignUpPage {...routerProps}/>} />
          <Route exact path="/login" render={routerProps => <LoginPage {...routerProps}/>} />
          {this.props.user.username?
            <Route path="/notes" render={renderProps => <NotesPage {...renderProps} notes={this.props.notes}/>} />
          :
            <Redirect to="/login" />
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notes: state.notes
  }
}

export default connect(mapStateToProps)(App);
