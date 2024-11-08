import {Link} from "react-router-dom"
export const BottomWarning=({label,buttonText,to})=>{
    return <div className="py-1 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link to={to} className="pointer underline pl-1">
        {buttonText}
        </Link>
     </div>}