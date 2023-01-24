import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../dist/output.css"
import Chat from "../componets/chat"
import { FaCaretRight } from "react-icons/fa"
import EmptyPage from "../componets/emptyPage"
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()
  const [props, setProps] = useState("")
  const [data, setData] = useState([])


  const handleclick = () => {
    data.push({ query: props, response: "" })
  }


  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await axios({
          url: "http://localhost:4000/home",
          method: "get",
          headers: { "Authorization": `${localStorage.getItem('token')}`, "Content-type": "apllication/json" }
        })
        setData(res.data)

      } catch (err) {
        navigate("/SignIn")
        console.log("Error " + err)
      }
    }
    getUser()
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      props
    }
    try {
      const jsonData = JSON.stringify(data)
      setProps("")
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/home",
        data: jsonData,
        headers: { "Authorization": `${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      })
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="">
        {data.length !== 0 ? <Chat data={data} /> : <EmptyPage />}
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit} method="post">
            <div className="relative left-52 ">
              <textarea onChange={(e) => { setProps(e.target.value) }} value={props} className="flex bg-[#444F5A] text-white px-5 border-2  w-[56%] m-auto  min-h-[50px] overflow-y-auto word-break max-h-[200px] scrollbar scrollbar-thumb-gray-dark scrollbar-track-gray-light scrollbar-w-2 scrollbar-h-8 fixed bottom-10 border-black rounded-md" style={{ resize: "none" }} onKeyUp={(el) => {
                el.target.style.height = (el.target.scrollHeight > el.target.clientHeight) ? (el.target.scrollHeight) + "px" : "50px";
              }} />
              <button type="submit" className="fixed bottom-[2.7em] right-[10.5em] bg-[#ffffff] mx-2" onClick={handleclick}><FaCaretRight className="h-10 w-10 " /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;