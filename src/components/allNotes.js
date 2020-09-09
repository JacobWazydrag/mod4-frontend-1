import React, { Component } from "react";
import { connect } from "react-redux";
import NoteShowPage from "./showNote";
import { Route } from "react-router-dom";
import EditNotePage from "./editNote";
import { NavLink } from "react-router-dom";

class AllNotesPage extends Component {
  state = {
    edit: false,
    note: "",
  };

  toggleEdit = (note) => {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
        note: note,
      };
    });
  };

  createNoteItems = () => {
    return this.props.notes.map((note) => {
      return (
        <div id="note-card" className="card z-depth-0 project-summary">
          <div className="card-content grey-text text-darken-3">
            <div className="card-content">
              <span className="card-title">{note.title.slice(0, 20)}</span>
              <p className="grey-text">{note.innerText.slice(0, 29)}</p>
              <button id="edit-btn" className="waves-effect waves-light btn"
    
                onClick={() => this.handleOnClick(note)}
              >
                {""}
                <i className="tiny material-icons">create</i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  handleOnClick = (note) => {
    this.props.history.push(`/notes/${note.id}`);
  };

  render() {
    return (
      <div className="ui grid">
        <div className="four wide column">
          <div className="ui vertical menu" id="notes-list">
            {this.createNoteItems(this.props.notes)}
          </div>
        </div>
        {this.state.edit ? (
          <div className="twelve wide stretched column">
            <Route
              path={"/notes/:noteId"}
              render={(routerProps) => (
                <EditNotePage
                  {...routerProps}
                  toggleEdit={this.toggleEdit}
                  note={this.state.note}
                />
              )}
            />
          </div>
        ) : (
          <div className="twelve wide stretched column">
            <Route
              path={"/notes/:noteId"}
              render={(routerProps) => (
                <NoteShowPage {...routerProps} toggleEdit={this.toggleEdit} />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps)(AllNotesPage);
