import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import ListCategories from "./ListCategories";
import CreateCategory from "./CreateCategory";
import Note from "./Note";
import axios from "axios"
import {useAuthContext} from "../hooks/useAuthContext";

function CreateArea() {
const [isExpanded, setExpanded] = useState(false);
const [categories, setCategories] = useState([])
const [notes, setNotes] = useState([])
const [fetchB, setFetch] = useState(true)
const [fetchCategories, setFetchCategories] = useState(true)

const {user} = useAuthContext()

axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`}

const [note, setNote] = useState({
  title: "",
  content: "",
  category: ''
    });

//add the bearer token to those 
useEffect(() => {
  if(user && fetchCategories){
      fetch('http://localhost:5000/categories', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      .then(res => res.json())
      .then(json => {
        setCategories(json)
        setFetchCategories(false)
        })
  }
}, [fetchCategories, user])


useEffect(() => {
  if(user && fetchB) {
    fetch('http://localhost:5000/notes', {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setNotes(json)
      setFetch(false)
    })
  }
}, [fetchB, user])

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
      setExpanded(false)
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
          fetch('http://localhost:5000/notes', {
            headers: { 'Authorization': `Bearer ${user.token}` }
          })
              .then(res => res.json())
              .then(json => {
                  const filtered = json.filter((noteItem) => (noteItem.category === category));
                  setNotes(filtered);
            })    
    }

      return (
      <div>

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
