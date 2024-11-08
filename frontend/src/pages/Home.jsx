import React, { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Appbar } from "../components/Appbar";
import { UsersList } from "../components/UsersList";
import axios from "axios";
import { Toaster } from "sonner";


function Home(){
const [balance,setBalance] = useState()
const [user,setUser] = useState({})




useEffect(()=>{

    const getBalance = async()=>{
        const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setBalance(parseInt(response.data.balance))
    }

    const getUser = async()=>{
        const response = await axios.get("http://localhost:3000/api/v1/user/getUser",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        setUser(response.data.user)
    }
    getBalance()
    getUser()
},[])
console.log(user)
    return <div>
        
        <Appbar user={user}/>
        <Balance amount={balance} />
        <UsersList/>
    </div>
}
export default Home
