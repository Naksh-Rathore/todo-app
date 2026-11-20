import { Route, Routes } from "react-router-dom"; 

import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";

import AuthProvider from "./AuthProvider.jsx";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>  
        </AuthProvider>  
    );
}

// Auth Provider: Wraps around the apps requesting the tokens
// Auth Context: The channel which the Auth Provider puts its data into so every child component can also access the values