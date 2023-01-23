import React,{useState,useEffect,} from "react";
import { Outlet,useNavigate } from "react-router-dom";
import axios from "axios";

function ProtectRoute() {
    const navigate = useNavigate();
    const [isAuth,setIsAuth] = useState(false);

 

    useEffect(()=>{
        const token = localStorage.getItem("token");
       
        const verify = async () =>{
            if(!token){
                navigate("/signIn")
            }
            try{
                const res = await axios({
                    method:"GET",
                    url:"http://localhost:4000/protect",
                    headers:{
                        "Authorization":`${token}`,
                        "content-type":"application/json"
                    }
                })
                setIsAuth(res.data)
                
            }catch(err){
                setIsAuth(false);
                navigate("/signIn")
            }
        }
        verify();
        
    },[])
  

    return (
        <Outlet/>
    )
}

export default ProtectRoute;