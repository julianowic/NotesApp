import React from "react";
import MainArea from "./MainArea";
import { BrowserRouter, Routes, Route} from "react-router-dom" 


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