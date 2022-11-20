import React from "react";
import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

export default function Signup(props){
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return <div>

        <section className="heading">
            <h1><FaUser/>Register</h1>
            <p>Please create an account</p>
        </section>

        <section className="formReg"> 
    
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter your name" 
                id='name' 
                name='name' 
                value={name} 
                onChange={onChange}
                />
            </div>

            <div className="form-group">
                <input 
                className="form-control" 
                type="text" 
                placeholder="Enter your email" 
                id='email' 
                name='email' 
                value={email} 
                onChange={onChange}
                />
            </div>

            <div className="form-group">
                <input 
                className="form-control" 
                type="password" 
                placeholder="Enter your password" 
                id='password' 
                name='password' 
                value={password} 
                onChange={onChange}
                />
            </div>

            <div className="form-group">
                <input 
                className="form-control" 
                type="password2" 
                placeholder="Confirm password" 
                id='password2' 
                name='password2' 
                value={password2} 
                onChange={onChange}
                />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
            </form>
        <p>Already have an account? Login here</p>
        </section>

    </div>
}