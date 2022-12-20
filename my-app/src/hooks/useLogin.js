import {useState} from 'react'
import { useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email, password) => {
        setError(null)

        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            console.log(error)
        } 
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            console.log("userlogged in!")
            //update the auth context
            dispatch({type : 'LOGIN', payload : json})
        }
    }
    return {login, error} 
}