import React, { useState, useEffect } from "react";
import { BsFillChatRightFill, BsSun, BsDiscord, BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import "../dist/output.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SideBar() {

    const navigate = useNavigate();

    const logoutHandle = async() => {
        try{
        const res = await axios({
            url:"http://localhost:4000/logout",
            method:"post",
            headers: { "Authorization": `${localStorage.getItem("token")}`,"Content-Type": "application/json" }

        })
        localStorage.removeItem("token");
        navigate("/")
    }catch(err){
        console.log(err)
    }
    }

    const clearChatHandle = async() => {
        try{
        const res = await axios({
            url:"http://localhost:4000/clearChat",
            method:"post",
            headers: { "Authorization": `${localStorage.getItem("token")}`,"Content-Type": "application/json" }
        })
        navigate("/mainPage")
    }catch(err){
        console.log(err)
    }
}

    return (
        <div className="h-full static">
            <div className="flex flex-col w-52 h-screen   bg-[#222831]">
                <div className="fixed top-0 left-0">
                    <div >
                        <ul className="font-display ">
                            <li className="text-center"><button className="flex flex-row w-[28vh] mx-2 my-3   bg-[#393E46] py-2 px-8 rounded-sm text-white text-center hover:bg-[#222831]" onClick={clearChatHandle}><p className="font-bold text-center h-full my-auto ml-4">Clear chat</p></button></li>
                        </ul>
                    </div>

                    <div className="flex flex-col  overflow-y-auto scrollbar scrollbar-thumb-gray-dark scrollbar-track-gray-light scrollbar-w-2 scrollbar-h-8">
                       
                    </div>
                </div>
                <div className="flex  flex-row fixed bottom-0 left-0 text-white bg-[#222831]">
                    <hr />
                    <ul className=" ">
                        <li className="flex flex-row  hover:bg-[#393E46] p-[2.7rem]  py-4"><span className="mx-2 mt-1"><BsSun /></span><button onClick={()=>{alert("Light mode is not working and developer never use it if you like light mode you are not developer")}}>Light Mode</button></li>
                        <li className="flex flex-row hover:bg-[#393E46] p-[2.7rem]  py-4"><span className="mx-2 mt-1"><BsDiscord /></span><button >Discord</button></li>
                        <li className="flex flex-row hover:bg-[#393E46] p-[2.7rem]  py-4"><span className="mx-2 mt-1"><BsFillArrowRightSquareFill /></span><button >Help</button></li>
                        <li className="flex flex-row hover:bg-[#393E46] p-[2.7rem]  py-4"><span className="mx-2 mt-1"><FaSignOutAlt /></span><button onClick={logoutHandle}>Log out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;