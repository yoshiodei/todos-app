import { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";

function App() {
  
  const [ userCred, setUserCred ] = useState("");

  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} userCred={userCred} setUserCred={setUserCred} />
          <Route path="/todo" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
