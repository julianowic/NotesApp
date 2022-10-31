import React, { useState } from "react";
import axios from "axios"
import CreateCategory from "./CreateCategory";

export default function ListCategories(props) {
    const [notes, setNotes] = useState(props.notes)

    console.log("Notes from ListCategories: " + notes)

    function handleClick(category){
        props.setFilter(true)
        props.filterNotes(category)
    }
 
    return (
        <div className="category-group">
        <CreateCategory/>
        <div className="btn-group">
        {props.categories.map((categoryItem, index) =>{
             return(
                <button onClick={() => {handleClick(categoryItem.category)}}>{categoryItem.category}</button>
        )
    })}
        </div>
        </div>
    )
}
