import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../actions/noteActions";

class NewNotePage extends Component {
  state = {
    title: "",
    innerText: "",
    tags: "",
  };

  handleOnTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleOnTextChange = (event) => {
    this.setState({
      innerText: event.target.value,
    });
  };

  handleOnTagsChange = (event) => {
    this.setState({
      tags: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const note = { ...this.state };

    const postConfigObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: this.state.title,
        inner_text: this.state.innerText,
        user_id: this.props.userId,
        tags: this.state.tags,
      }),
    };

    fetch("http://localhost:3001/notes", postConfigObj)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        if (response.id) {
          this.props.addNote(response);
        }
        this.props.history.push("/notes");
      });
  };
  render() {
    return (
      <div id="new-note" className="container">
        <form
          className="white"
          onSubmit={this.handleOnSubmit}
        >
          <h5 className="grey-text text-darken-3">New Note</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
            id="title"
            type="text"
              rows="2"
              onChange={this.handleOnTitleChange}
              value={this.state.title}
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="description">Note Content</label>
            <textarea
            id="description"
            className="materialize-textarea"
              onChange={this.handleOnTextChange}
              value={this.state.innerText}
            ></textarea>
          </div>
          <div className="input-field">
            <label htmlFor="description">
              Note Tags (Please seperate by commas and a space)
            </label>
            <textarea
            id="description"
            className="materialize-textarea"
              rows="2"
              onChange={this.handleOnTagsChange}
              value={this.state.tags}
            ></textarea>
          </div>
          <button className="btn green lighten-1 z-depth-0" type="submit">
            Save
          </button>
          <div className="center red-text"></div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => {
      dispatch(addNote(note));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotePage);
