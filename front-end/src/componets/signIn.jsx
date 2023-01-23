//create react app name with two input field with axios post request on 4000 port and post request with axios with react hooks
import React, { useState,useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { BsArrowCounterclockwise } from "react-icons/bs";
import {Navigate, useNavigate} from "react-router-dom";


function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")

  document.body.style.backgroundColor = "#16213E";
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };


    try {
      const jsonData = JSON.stringify(data);
      const time = new Date().getTime();
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/SignIn",
        data: jsonData,
        headers: { "Content-Type": "application/json" },
      });
      setEmail("");
      setPassword("");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("time", time);
      
      navigate(
        "/mainPage"
      )
     
     
    } catch (err) {

      navigate("/SignIn")
      setEmail("");
      setPassword("");
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className=" w-1/2 m-auto">

        <form onSubmit={submitHandler}>
          <div className="flex flex-col rounded-md w-[70%] m-auto bg-[#2C3639] relative top-32 h-52">
          
            <input
              id="Username"
              type="text"
              placeholder="UserName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2  border-gray-300 rounded-sm w-[50%] bg-slate-600 focus:outline-none mt-10 mb-2
              m-auto "
            />
            <input
              type="password"
              id="Password"
              placeholder="password"
              value={password}
              className="px-3 py-2  border-gray-300 rounded-sm w-[50%] bg-slate-600 focus:outline-none my-2 m-auto"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className=" w-32 mx-auto my-3 py-2 text-white  rounded-sm"
              style={{ backgroundColor: "#3F4E4F" }}
              >Sing In</button>
              <p className="text-center text-red-600 font-bold">{error}</p>
              </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;