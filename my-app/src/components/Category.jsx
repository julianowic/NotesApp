import React, { useState } from "react";
import axios from "axios"

function Category(props){
    const [category, setCategory] = useState('')

    function handleChange(e){

    }

    function submitCategory(e){

    }

    return(   
    <form>
    <label for="fname">Category:</label>
    <input type="text" id="category" name="category" value={category.category} onChange={handleChange}/>
    <input type="submit" value="Submit"/>
    </form>
     
          )
     
    }


export default Category