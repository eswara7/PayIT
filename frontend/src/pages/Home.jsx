import React, { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Appbar } from "../components/Appbar";
import { UsersList } from "../components/UsersList";
import axios from "axios";
import { useDarkMode } from "../context/DarkContext";

function Home(){
const [balance,setBalance] = useState()
const [user,setUser] = useState({})
const {DarkMode} = useDarkMode()
useEffect(()=>{

    const getBalance = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/account/balance` ,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setBalance(parseInt(response.data.balance))
    }

    const getUser = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getUser`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setUser(response.data.user)
    }
    getBalance()
    getUser()
},[])

    return <div className={`${DarkMode?"dark":" "}`}>
        <div className="  flex flex-col bg-white dark:bg-slate-800 min-h-screen">
        <Appbar user={user}/>
        <div className="mt-16 ">
        <Balance amount={balance} />
        <UsersList/>
        </div>
        </div>
    </div>
}
export default Home
