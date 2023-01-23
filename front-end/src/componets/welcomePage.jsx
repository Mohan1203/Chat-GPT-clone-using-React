import React from "react";
import { Link } from "react-router-dom";

function WelcomePage(){
    return(
    <div className="w-1/3 mx-auto ">
        <div className="m-auto w-[60%]  my-[55%]  text-center">
        <h1 className="text-2xl text-center text-white my-1">Welcome to the Code Guide App</h1>
        <p className="text-center text-white">Please Sign In or Sign Up to continue</p>
        <Link to="SignIn"><button className="px-5 py-2  bg-[#8675A9] m-2 text-white rounded-md">Sign In</button></Link>
        <Link to="SignUp"><button className="px-5 py-2  bg-[#8675A9] m-2 text-white rounded-md">Sign Up</button></Link>
        </div>
    </div>
    )
}

export default WelcomePage;