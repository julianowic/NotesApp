import React, { useState } from "react";
import axios from "axios"
import {useAuthContext} from "../hooks/useAuthContext";

function Category(props){
    const [category, setCategory] = useState('')

    const {user} = useAuthContext()

    axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`} 

    function handleChange(e){
        const { name, value } = e.target;

        setCategory(prevCategory => {
          return {
            ...prevCategory,
            [name]: value
          };
        });
    }

    function submitCategory(e){
        e.preventDefault();
        axios
        .post("http://localhost:5000/categories/add-category", category)
        .then((res) => {
          setCategory('')
          console.log("Category added successfully");
          props.setFetchCategories(true)
        })
        .catch((err) => {
          console.log("Error couldn't create Category");
          console.log(err.message);
        });
    }

    return(   
      
    <form className="create-category">
    <label>Category:</label>
    <input type="text" name="category" value={category.category} onChange={handleChange}/>
    <button onClick={submitCategory}>Add</button>
    </form>
     
          )
     
    }


export default Category