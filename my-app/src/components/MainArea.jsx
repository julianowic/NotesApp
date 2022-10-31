import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListCategories from "./ListCategories";
import Note from "./Note";
import axios from "axios"

function CreateArea(props) {
const [isExpanded, setExpanded] = useState(false);
const [categories, setCategories] = useState([])
const [notes, setNotes] = useState([])
const [fetchB, setFetch] = useState(true)
const [filterOn, setFilter] = useState(false)

const [note, setNote] = useState({
  title: "",
  content: "",
  category: ''
    });

useEffect(() => {
  fetch('http://localhost:5000/categories')
  .then(res => res.json())
  .then(json => setCategories(json))
}, [])


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
console.log("handleChange called")
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
        console.log(category)
        console.log(filterOn)
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem) => {
              return noteItem.category === category;
            });
          });
    }

    

      return (
      <div>
          <Header/>
          <ListCategories categories={categories} notes={notes} filterNotes={filterNotes} setFilter={setFilter}/>
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

      <Note notes={notes} setFetch={setFetch}/>
            <Footer/>
            <button onClick={()=>{setFetch(true)}}>All</button>
      </div>
        );
      }
export default CreateArea;