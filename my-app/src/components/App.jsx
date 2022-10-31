import React, { useState, useEffect } from "react";
import Note from "./Note";
import MainArea from "./MainArea";
import { BrowserRouter, Routes, Route} from "react-router-dom" 
import axios from "axios"

function App() {
  // const [notes, setNotes] = useState([]);
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/notes')
  //   .then(res => res.json())
  // .then(json => {
  //   setNotes(json)})
  // }, [])

  // useEffect(() => {
  //   fetch('http://localhost:5000/categories')
  //   .then(res => res.json())
  //   .then(json => setCategories(json))
  // }, [])

  return (
    <div>
    <BrowserRouter>
    <div className="container"> 
      <Routes>
      <Route path="/" element={<MainArea/>} exact/>
      {/* <Route path="/edit/:id" element={<Note/>}/>
      <Route path="/create" element={<CreateArea/>}/> */}
      {/* <Route path="/add-category" element={<Category/>}/> */}
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;