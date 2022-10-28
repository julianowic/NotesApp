import React from "react";
import axios from "axios";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        Delete
      </button>
      <p>{props.category}</p>
    </div>
  );
  }
  
  export default Note