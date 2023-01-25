import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function AiChat({data}) {
   const [output,setOutput]=useState(data);
   const [code,setCode] = useState(output.split(/;/g));




    return (
        <div className="w-[171vh] bg-[#2C3639] overflow-y-auto">
            <div className="flex w- m-auto py-5 w-[85%]  ">
            <IconContext.Provider value={{color:"white" }}>
                <span className="relative left-32   top-1">
                    <FaRobot className="h-6 w-6"/>
                </span>
                </IconContext.Provider> 
                <pre className="flex  flex-col relative left-[10rem] text-white w-[50rem]"
                >
                 {code.map((item,index)=>{
                   
                    return(
                        <div>
                        {item}
                        {(index!==code.length-1) && <br/>}
                        </div>
                    
                    )
                })}
              
                </pre>
            </div>
        </div>
    )
}

export default AiChat