import React, { useState } from "react";
import axios from "axios"
import CreateCategory from "./CreateCategory";

export default function ListCategories(props) {
    return (
        <div className="category-group">
        <CreateCategory/>
        <div className="btn-group">
        {props.categories.map((categoryItem, index) =>{
             return(
                <button>{categoryItem.category}</button>
        )
    })}
        </div>
        </div>
    )
}
