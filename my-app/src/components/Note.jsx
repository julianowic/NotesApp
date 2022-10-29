import React, {useState,useEffect} from "react";
import axios from "axios";
import CreateArea from "./CreateArea";

function Note(props) {
  const [notes, setNotes] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:5000/notes')
  //   .then(res => res.json())
  // .then(json => {console.log(json)
  //   setNotes(json)})
  // }, [])

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`)
    .then(() => { console.log("Note successfully deleted")});
    // // setNotes(prevNotes => {
    // //   return prevNotes.filter((noteItem, index) => {
    // //     return index !== id;
    // //   });
    // // });
  }

return (
  <div>
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