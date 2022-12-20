import React from "react";
import MainArea from "./MainArea";
import Login from "./Login";
import Register from "./Signup";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom" 
import {useAuthContext} from '../hooks/useAuthContext'
import Header from "./Header";
function App() {
  const {user} = useAuthContext()

  return (
    <div>
    <BrowserRouter>
    <Header/>
    <div className="container"> 
      <Routes>
      <Route path="/" element={user ? <MainArea/> : <Navigate to='/login'/>}/>
      <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
      <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
