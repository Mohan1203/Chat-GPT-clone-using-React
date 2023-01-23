import React,{useState,useEffect} from "react";
import SignIn from "../src/componets/signIn";
import SignUp from "../src/componets/signUp";
import MainPage from "./componets/mainPAge";
import WelcomePage from "./componets/welcomePage";
import ProtectRoute from "./protecteRoute/protectRoute";
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';


const App = () => {
 
  const [query,setQuery] = useState(false);


  document.body.style.backgroundColor = "#222831";


  
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mainPage" element={<ProtectRoute/>}>
        <Route path="/mainPage" element={<MainPage/>} />
        </Route>
      
      </Routes>
     

    </div>

  );
}
export default App;

