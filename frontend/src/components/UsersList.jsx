import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const UsersList = () => {
    const [users, setUsers] = useState([])
    const [filter,setFilter] = useState("")

    useEffect(()=>{
        const fetchUsers = async()=>{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/bulk?filter=${filter}`)
            setUsers(response.data.user)
        }
        fetchUsers()
    },[filter])

    return <>
        <div className="font-bold mt-4 text-lg px-2 text-gray-900 dark:text-gray-200">
            contacts
        </div>
        <div className="my-2 px-2">
            <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-gray-200 dark:border-gray-600 bg-white  dark:bg-slate-800 text-gray-900 dark:text-gray-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} key = {user._id}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between px-2">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 dark:bg-slate-700 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl text-cyan-700 dark:text-cyan-600">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center text-gray-900 dark:text-gray-200">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center">
            <Button onPress={(e)=>{
                navigate("/send?id="+user._id + "&name="+ user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}
