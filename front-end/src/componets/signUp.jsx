//create react component with four input field type name,age,password,password with post request on port 4000 using axios with react hooks
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("")
    

    const submitHandler = async(e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
         
        };
        const jsonData = JSON.stringify(data);
        try{
       const res =  await axios({
            method: "post",
            url: "http://localhost:4000/SignUp",
            data: jsonData,
            headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token)
        navigate(
            "/mainPage"
        );
        setName("");
        setEmail("");
        setPassword("");
        }catch(err){
            setName("");
            setEmail("");
            setPassword("");
            setError(err.response.data);
            if(error==="User Already Exist Please Login"){
                navigate("/")
            }
            navigate("/SignUp")
            
        }
     };

    return (
        <div className="App">
            <div className=" w-1/2 m-auto">
                <form onSubmit={submitHandler}>
                <div className="flex flex-col rounded-md w-[70%] m-auto bg-[#2C3639] relative top-32 h-72">
                        <input
                            type="text"
                            placeholder="UserName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="Name"
                            className="px-3 py-2  border-gray-300 rounded-sm w-[50%] bg-slate-600 focus:outline-none mt-10 mb-2
                            m-auto"
                        />
                        <input
                            type="email"
                            id="Email"
                            placeholder="Email"
                            className="px-3 py-2  border-gray-300 rounded-sm w-[50%] bg-slate-600 focus:outline-none my-2
                            m-auto"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            className="px-3 py-2  border-gray-300 rounded-sm w-[50%] bg-slate-600 focus:outline-none my-2
                            m-auto"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                       
                       <button type="submit" className=" w-20 mx-auto my-3 py-2 text-white  rounded-sm"
            style={{backgroundColor: "#3F4E4F"}}>Sign Up </button>
                    <p className="text-center font-bold text-red-700">{error}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;