import React, { useState, useEffect} from "react";
import axios from "axios";

export default function EditNote(props){
    const [note, setNote] = useState({
        title: props.noteToEdit.title,
        content: props.noteToEdit.content
      });

    function handleChange(event) {
        event.preventDefault();
        console.log("handleChange called")
        const {name, value} = event.target;
        setNote({...note, [name]: value});
        console.log(note)
    }
    
    const updateNote = (event) => {
        console.log(props.noteToEdit)
        event.preventDefault();
        if (!note.title || !note.content) {
            alert("'Title' or 'Content' cannot be blank");
        } else {
            axios.post(`http://localhost:5000/notes/update/${props.id}`, note) 
                .then((res) =>{
                    console.log("Note updated successfully")
                    props.setFetch(true)   
                })
                .catch(err => console.log("Error: " + err));
        }
        props.setButtonPopup(false)
      };

    return (props.trigger) ? (
    <div className="edit-notes-form">
    <form className="popup-inner">
        <input
      name="title"
      onChange={handleChange}
      defaultValue={props.noteToEdit.title}
      placeholder="Title"
      />
      <textarea
      name="content"
      onChange={handleChange}
      defaultValue={props.noteToEdit.content}
      placeholder="Take a note..."
      rows={3}
      />
      <select
      name="category"
      onChange={handleChange}
      defaultValue={props.noteToEdit.category}
      >
      {
        props.categories.map(function(cat) {
      return <option
      key={cat.category} value={cat.value} > {cat.category} </option>;
        })
      }
      </select>
      <div className="btn-update-note">
            <button className="btn-update" onClick={updateNote}>Save</button>
            <button className="btn-update" onClick={() => props.setButtonPopup(false)}>Close</button>
      </div>
      </form>
    </div> ) : '' 
}