import './App.css'

import { Route, Routes, BrowserRouter } from "react-router-dom"; 

import Home from "../Home/Home.jsx";
import Login from "../Login/Login.jsx";

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>    
    );
}