import React, { useState, useEffect } from "react";
import {  BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function HumanChat({data}) {
    return (
        <div className="w-[171vh] m-auto">
            <div className=" flex  m-auto py-5 w-[85%]">
                <IconContext.Provider value={{color:"white"}}>
                <span className="relative top-1 left-32">
                    <BsPersonCircle className="h-6 w-6"/>
                </span>
                </IconContext.Provider>
                <p className="flex relative left-[10rem] text-white w-[50rem]">
                    {data}
                </p>
            </div>
            
        </div>
    )
}

export default HumanChat;