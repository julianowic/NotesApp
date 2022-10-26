import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: 'test'
  });

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
        <button onClick={submitNote}>Add</button>
      </form>
      <Footer/>
    </div>
  );
}

export default CreateArea;
