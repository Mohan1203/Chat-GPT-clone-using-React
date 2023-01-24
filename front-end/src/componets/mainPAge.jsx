import React, { useEffect, useState } from "react";
import SideBar from "./header"
import Homepage from "./homepage"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function MainPage() {
  const navigate = useNavigate()

//  const [data,setData] = useState([])
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         let res = await axios({
//           url: "http://localhost:4000/home",
//           method: "get",
//           headers: { "Authorization": `${localStorage.getItem('token')}`, "Content-type": "apllication/json" }
//         })
//        setData(res.data)
//       } catch (err) {
//         navigate("/SignIn")
//         console.log("Error " + err)
//       }
//     }
//     getUser()
//   }, [])

  return (
    <div>

      <div className="flex ">
        <SideBar />
        <div className="h-full">
          <Homepage  />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
