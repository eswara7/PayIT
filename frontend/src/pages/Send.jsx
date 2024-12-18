import axios from "axios"
import { useState } from "react"
import {Toaster, toast } from 'sonner'
import { useSearchParams } from "react-router-dom"
import { useDarkMode } from "../context/DarkContext"
export const Send = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount,setAmount] = useState(0)
    const sound = new Audio("/transfer.mp3");
    const {DarkMode} = useDarkMode()
    const handleTransfer = async()=>{
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        try {
          const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URI}/account/transfer`,{
                toAccountId:id,
                amount
            },
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
        toast.success(`${amount}rs sent`)
        sound.play(); 
        }
        else{
            toast.error(response.data.message)
        }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Transfer failed");
            }
        }
    }
  return (<>
<Toaster richColors position='bottom-center'  />
<div className={`${DarkMode?"dark":""}`}>
<div className="flex justify-center items-center h-screen  bg-slate-200 dark:bg-slate-800">
          <div className="border w-96 bg-white border-gray-200 dark:border-slate-800 dark:bg-slate-700 shadow-lg rounded-lg">
              <h2 className="text-3xl font-bold text-center mt-4 dark:text-gray-200">Send Money</h2>
                <div className="p-8">
                 <div className="flex items-center">
                 <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-semibold px-1 text-gray-700 dark:text-gray-300">{name}</h3>
                 </div>
                  <input
                        onChange={(e)=>{
                            setAmount(e.target.value)
                        }}
                      className="flex h-10 w-full px-3 py-2 text-sm mt-4 rounded-md border dark:text-gray-100 border-gray-200 dark:border-gray-600 dark:bg-slate-700"
                      placeholder="Enter amount (in Rs)"
                  />
                   <button
                                onClick={handleTransfer}
                                className="mt-4 text-center ml-20 relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 dark:text-green-500 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-green-500/10 group"
                            >
                                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 dark:bg-green-400 group-hover:h-full"></span>
                                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                    <svg
                                        className="w-5 h-5 text-green-400 dark:text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                    <svg
                                        className="w-5 h-5 text-green-400 dark:text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="relative w-full text-center transition-colors duration-200 ease-in-out group-hover:text-white">
                                    Transfer
                                </span>
                            </button>
                </div>
            </div>
    </div>
</div>
  
  </>)
}