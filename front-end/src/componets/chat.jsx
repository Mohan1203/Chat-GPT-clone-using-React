import React, { useState, useEffect ,useRef} from "react";
import HumanChat from "../componets/humanChat";
import AiChat from "../componets/aiChat";

function Chat({data}) {

return (
        <div className="w-[171vh] ">
          {data.map((item,index) => {
    return(
        <div className="">
        <HumanChat data={item.query}  key={item.user}/>
        <AiChat data={item.response} key={item._id}/>
        </div>
    )
})}
 
        </div>
    )}

export default Chat;


