import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import EditNote from './EditNote'
import {useAuthContext} from '../hooks/useAuthContext'

function Note(props) {
  const [idToEdit, setIdToEdit] = useState('')
  const [buttonPopup, setButtonPopup] = useState(false); 
  const [noteToEdit, setNoteToEdit] = useState({
    title: "", 
    content: "",
    category: ""
  })

  const {user} = useAuthContext()

  axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`} 

//add the bearer token 
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

    const breakpoints = {
      default: 3, 
      1100: 2, 
      700: 1
    }
 
return (

  <div className="notes-grid">
  {/* pass the notes array from CreateArea as props */}
  <Masonry
  breakpointCols={breakpoints}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">

  {props.notes.map((noteItem) => {
    return (
        <div className="note" key={noteItem._id}>
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
  </Masonry>

  <EditNote trigger={buttonPopup} setButtonPopup={setButtonPopup} categories={props.categories} id={idToEdit} noteToEdit={noteToEdit} setFetch={props.setFetch}>
  </EditNote>
  </div>
    )
  }
  
  export default Note