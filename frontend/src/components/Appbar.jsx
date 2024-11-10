import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDarkMode } from "../context/DarkContext";

export const Appbar = ({ user }) => {
  const navigate = useNavigate();
  const {DarkMode, toggleDarkMode} = useDarkMode()

  return (
        <div className=" fixed w-full z-50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-md h-16 px-2 dark:bg-gray-800">
          <div className="flex items-center max-w-40">
            <div className="rounded-full h-9 w-9 text-amber-700 dark:text-amber-500 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl">
              {user.firstName?.[0]}
            </div>
            <div className="m-1 text-base text-gray-900 dark:text-gray-200">{user.firstName}</div>
          </div>

          <div className="font-bold text-2xl text-gray-900 dark:text-slate-200">PayIT</div>
          <div className="flex items-center gap-1">
          <button onClick={toggleDarkMode} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-9 w-9 group rounded-lg border-none bg-transparent shadow-lg hover:bg-blue-600/5 m-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon absolute size-6 rotate-90 scale-0 transition-all group-hover:text-blue-500 dark:rotate-0 dark:scale-100 dark:text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun size-6 rotate-0 scale-100 text-black transition-all group-hover:text-blue-500 dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg><span className="sr-only">DarkMode Toggle</span></button>
            <div
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                navigate("/signin");
                toast.error("signing off");
              }}
              className="text-3xl text-red-500 hover:text-red-700"
            >
              <TbLogout />
            </div>
          </div>
        </div>
  );
};
