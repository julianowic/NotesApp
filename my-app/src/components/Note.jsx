import React, { useState, useEffect} from "react";
import axios from "axios";


function Note(props) {

 function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`)
    .then(() => { console.log("Note successfully deleted")
    props.setFetch(true)
  });
  }
 
return (
  <div>
  {/* pass the notes array from CreateArea as props */}
  {props.notes.map((noteItem, index) => {
    return (
        <div className="note">
       <h1>{noteItem.title}</h1>
       <p>{noteItem.content}</p>
       <button onClick={() => {deleteNote(noteItem._id)}}>
         Delete
       </button>
       <p>{noteItem.category}</p>
     </div>
    );
  })}
  </div>
)
  }
  
  export default Note