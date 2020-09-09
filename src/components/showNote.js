import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/noteActions'



class NoteShowPage extends Component {

    handleDeleteClick = () => {
        const note = this.clickedNote()
        const deleteConfigObj = {
            method: "DELETE",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
      
          fetch(`http://localhost:3001/notes/${note.id}`, deleteConfigObj)
          .then(resp => resp.json())
          .then(response => {
              console.log(response)
              this.props.deleteNote(response)
              this.props.history.push('/notes')
          })
    }

    clickedNote = () => {
        return this.props.notes.filter(note => {
            return note.id === parseInt(this.props.match.params.noteId)
        })[0]
    }

    joinedTags = () => {
        if (this.clickedNote().tags) {
            const stringTags = this.clickedNote().tags.map(tag => {
                return tag.name
            })

            return stringTags.join(", ")
        }
    }
    
    render() {
        if (this.clickedNote()) {
            return (
                <div className="card z-depth-0" id="show-note">
                    <h2>{this.clickedNote().title}</h2>
                    <p className="note-text">Content: {this.clickedNote().innerText}</p>
                    <p className="tag-text">Tags: {this.joinedTags()}</p>
                    <button id="edit-button" className="ui right floated button" onClick={() => this.props.toggleEdit(this.clickedNote())}>Edit</button>
                    <button id="delete-button" className="ui right floated button" onClick={this.handleDeleteClick}>Delete</button>
                </div>
                
            )
        } else {
            return null
        }
    }

}

const mapDispatchToProps = dispatch => {
    return {
        deleteNote: deletedNote => {
            dispatch(deleteNote(deletedNote))
        }
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteShowPage)