import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListCategories from "./ListCategories";
import CreateCategory from "./CreateCategory";
import Note from "./Note";
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateArea() {
const [isExpanded, setExpanded] = useState(false);
const [categories, setCategories] = useState([])
const [notes, setNotes] = useState([])
const [fetchB, setFetch] = useState(true)
const [fetchCategories, setFetchCategories] = useState(true)

const [note, setNote] = useState({
  title: "",
  content: "",
  category: ''
    });

useEffect(() => {
  if(fetchCategories){
  fetch('http://localhost:5000/categories')
  .then(res => res.json())
  .then(json => {
    setCategories(json)
    setFetchCategories(false)
    })
  }
}, [fetchCategories])


useEffect(() => {
  if(fetchB) {
    fetch('http://localhost:5000/notes')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setNotes(json)
      setFetch(false)
    })
  }
}, [fetchB])

function handleChange(event) {
const { name, value } = event.target;

setNote(prevNote => {
return {
        ...prevNote,
        [name]: value
      };
    });
  }

function submitNote(e){
      e.preventDefault();
      axios.post("http://localhost:5000/notes/add-note", note)
           .then((res) => {
      setNote({
      category: '',
      title: "",
      content: ""
              })
      setFetch(true)
      console.log("Note added successfully");
      console.log(note)
            })
            .catch((err) => {
      console.log("Error couldn't create Note");
      console.log(err.message);
            });

        }


    function expand() {
    setExpanded(true);
      }

    function filterNotes(category){
          fetch('http://localhost:5000/notes')
              .then(res => res.json())
              .then(json => {
                  const filtered = json.filter((noteItem) => (noteItem.category === category));
                  setNotes(filtered);
            })    
    }

      return (
      <div>
          <Header/>

      <div className="categories">
      <CreateCategory setFetchCategories={setFetchCategories}/>
      <button className="all-button" onClick={()=>{setFetch(true)}}>All</button>
      <ListCategories categories={categories} notes={notes} filterNotes={filterNotes} setFetch={setFetch}/>
      </div>

      <div className="notes-container">
      <form className="create-note">
      {isExpanded && (
                <input
      name="title"
      onChange={handleChange}
      value={note.title}
      placeholder="Title"
      />
              )}
              <textarea
      name="content"
      onClick={expand}
      onChange={handleChange}
      value={note.content}
      placeholder="Take a note..."
      rows={isExpanded ? 3 : 1}
      />
                <select
                name="category"
      onChange={handleChange}
      value={note.category}>
      {
                      categories.map(function(cat) {
      return <option 
      key={cat.category} value={cat.value} > {cat.category} </option>;
                      })
      }
      </select>
            <button onClick={submitNote}>Add</button>
      </form>
      <div className="notes-group">
      <Note notes={notes} setFetch={setFetch} setNotes={setNotes} categories={categories}/>
      </div>
      </div>
            <Footer/>
            
      </div>
        );
      }
export default CreateArea;
