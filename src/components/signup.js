import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions/userActions";
import { loadNotes } from "../actions/noteActions";

class SignUp extends Component {
  state = {
    username: "",
  };

  handleOnChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    const postConfigObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
      }),
    };

    fetch("http://localhost:3001/users", postConfigObj)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        if (response.id) {
          this.props.signIn(response);
          this.props.loadNotes(response.notes);
        }
      });
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div id="log-in">
        <form  className="container" onSubmit={this.handleOnSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              className="input-field"
              type="text"
              id="login-input"
              value={this.state.username}
              onChange={this.handleOnChange}
            />
          </div>
          <button
            className="btn green lighten-1 z-depth-0"
            id="login-button"
            type="submit"
          >
            Create Account
          </button>
          <div className="center red-text"></div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username) => {
      dispatch(signIn(username));
    },
    loadNotes: (notes) => {
      dispatch(loadNotes(notes));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
