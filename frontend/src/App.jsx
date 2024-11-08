
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from './pages/Signup';
import { Signin } from './pages/Signin';
import Home from './pages/Home';
import { Send } from './pages/Send';

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path = "/signup" element = {<Signup/>}/>
    <Route path = "/signin" element = {<Signin/>}/>
    <Route path = "/" element={isLoggedIn?<Home/>:<Signin/>}/>
    <Route path = "/send" element = {isLoggedIn?<Send/>:<Signin/>}/>
    </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App

