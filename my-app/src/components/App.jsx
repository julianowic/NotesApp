import React, { useState, useEffect } from "react";
import Note from "./Note";
import MainArea from "./MainArea";
import { BrowserRouter, Routes, Route} from "react-router-dom" 
import axios from "axios"

function App() {

  return (
    <div>
    <BrowserRouter>
    <div className="container"> 
      <Routes>
      <Route path="/" element={<MainArea/>} exact/>
      </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;