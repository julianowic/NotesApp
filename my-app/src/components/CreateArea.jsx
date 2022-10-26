import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Category from "./Category";
import axios from "axios"

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([])

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: 'test'
  });

  useEffect(() => {
    fetch('http://localhost:5000/categories')
    .then(res => res.json())
    .then(json => setCategories(json))
  }, [])

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);

    setNote({
      title: "",
      content: "",
      category: 'test'
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
    <Header/>
    <Category/>
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
        <select>
        {
          categories.map((cItem, index) => {
        return (
          <option value={note.category} name="category">{cItem.category}</option>
        );
      })}
        </select>
        

        <button onClick={submitNote}>Add</button>

      </form>
      <Footer/>
    </div>
  );
}

export default CreateArea;
