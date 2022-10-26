import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BrowserRouter, Routes, Route} from "react-router-dom" 
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    const notodb = newNote

    axios
      .post("http://localhost:5000/notes/add-note", notodb)
      .then((res) => {
        console.log('Note added');
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
    <BrowserRouter>
    <div className="container"> 
      <Routes>
      <Route path="/" element={<CreateArea onAdd={addNote}/>} exact/>
      <Route path="/edit/:id" element={<Note/>}/>
      <Route path="/create" element={<CreateArea/>}/>
      {/* <Route path="/add-category" element={<Category/>}/> */}
      </Routes>
    </div>
    </BrowserRouter>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
