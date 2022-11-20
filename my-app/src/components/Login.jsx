import React from "react";
import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

export default function Login(props){
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const {email, password} = formData
    
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
            <h1><FaSignInAlt/>Login and start taking goals!</h1>
        </section>

        <section className="formReg"> 
    
            <form onSubmit={onSubmit}>

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
                <button type="submit" className="btn btn-block">Login</button>
            </div>
            </form>

            <p>Don't have an account? Register here</p>

        </section>

    </div>
}