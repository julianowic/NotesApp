import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BrowserRouter, Routes, Route} from "react-router-dom" 
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/notes')
    .then(res => res.json())
    .then(json => setNotes(json))
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/categories')
    .then(res => res.json())
    .then(json => setCategories(json))
  }, [])

  function addNote(newNote) {
    const notodb = newNote

    axios
      .post("http://localhost:5000/notes/add-note", notodb)
      .then((res) => {
        console.log('Note added');
        setNotes(prevNotes => {
          return [...prevNotes, newNote];
        });
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
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
      {/* <Route path="/edit/:id" element={<Note/>}/>
      <Route path="/create" element={<CreateArea/>}/> */}
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
            category={noteItem.category}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
