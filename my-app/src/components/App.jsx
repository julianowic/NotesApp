import React from "react";
import MainArea from "./MainArea";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route} from "react-router-dom" 


function App() {

  return (
    <div>
    <BrowserRouter>
    <div className="container"> 
      <Routes>
      <Route path="/" element={<MainArea/>} exact/>
      <Route path="/login" element={<Login/>} exact/>
      <Route path="/signup" element={<Signup/>} exact/>
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;