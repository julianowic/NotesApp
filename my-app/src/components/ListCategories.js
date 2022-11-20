import React, { useState } from "react";
import axios from "axios"


export default function ListCategories(props) {

    function handleClick(category){
        props.filterNotes(category)
    }
 
    return (
        <div className="category-group">
        
        <div className="btn-group">
        {props.categories.map((categoryItem, index) =>{
             return(
                <button key={categoryItem._id} onClick={() => {handleClick(categoryItem.category)}}>{categoryItem.category}</button>
        )
    })}
        </div>
        </div>
    )
}
