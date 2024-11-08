import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Appbar = ({ user }) => {
    const navigate = useNavigate()
    return (

            <div className="flex justify-between items-center shadow-md h-16 px-2">
                <div className="flex items-center">
                <div className="rounded-full h-11 w-11 bg-slate-300 flex items-center justify-center text-xl">
                    {user.firstName?.[0]}
                </div>
                <div className="m-1 text-base">{user.firstName}</div>
                </div>

                <div className="font-bold text-2xl">PayIT</div>

               <div onClick={
                ()=>{
                    localStorage.removeItem("token")
                    localStorage.removeItem("isLoggedIn")
                    navigate("/signin")
                    toast.error("signing off")
                }
               } className="text-3xl text-red-500 hover:text-red-700">
               <TbLogout/>
               </div>

            </div>

    );
};
