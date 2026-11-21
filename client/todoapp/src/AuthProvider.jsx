import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(); // Keep the token only in application memory so it is less vulnerable to XSS

    const login = async (credentials) => {
        const { data } = await axios.post("http://localhost:8000/accounts/login", credentials);
        setToken(data.access);
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/accounts/logout"); // Lets the server clear the refresh cookie
        } catch (_) {}

        setToken(null);
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Add the token to our HTTP requests if it exists
        }

        else {
            delete axios.defaults.headers.common["Authorization"]; // Remove the token from our HTTP requests if it does not exist
        }
    }, [token]);

   return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuthProvider = () => {
    return useContext(AuthContext);
}