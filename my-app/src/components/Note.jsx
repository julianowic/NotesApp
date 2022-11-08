import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import EditNote from './EditNote'


function Note(props) {
  const [idToEdit, setIdToEdit] = useState('')
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [noteToEdit, setNoteToEdit] = useState({
    title: "", 
    content: "",
    category: ""
  })


 function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`)
    .then(() => { console.log("Note successfully deleted")
    props.setFetch(true)
  });
  }

  function changeNotes(id, title, content, category){
        setButtonPopup(true)
        setNoteToEdit(prevNote => {
          return {
                  ...prevNote,
                  title : title, 
                  content : content,
                  category : category
                };
              });
        setIdToEdit(id)
    }
 
return (

  <div>
  {/* pass the notes array from CreateArea as props */}
  {props.notes.map((noteItem) => {
    return (
        <div className="note">
       <h1>{noteItem.title}</h1>
       <p>{noteItem.content}</p>
       <button onClick={() => {changeNotes(noteItem._id, noteItem.title, noteItem.content, noteItem.category)}}>
         Edit
       </button>
       <button onClick={() => {deleteNote(noteItem._id)}}>
         Delete
       </button>
       <p>{noteItem.category}</p>
     </div>
    );
  })}

  <EditNote trigger={buttonPopup} setButtonPopup={setButtonPopup} categories={props.categories} id={idToEdit} noteToEdit={noteToEdit} setFetch={props.setFetch}>
  </EditNote>
  </div>
    )
  }
  
  export default Note