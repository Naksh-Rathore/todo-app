import { createContext, useContext, useLayoutEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(); // Keep the token only in application memory so it is less vulnerable to XSS

    const login = async (credentials) => {
        const { data } = await axios.post("http://localhost:8000/api/accounts/login/", credentials);
        setToken(data.access);
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/accounts/logout/"); // Lets the server clear the refresh cookie
        } catch (_) {}

        setToken(null);
    }

    useLayoutEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Add the token to our HTTP requests if it exists
        }

        else {
            delete axios.defaults.headers.common["Authorization"]; // Remove the token from our HTTP requests if it does not exist
        }
    }, [token]);

    useLayoutEffect(() => {
        // axios.interceptors.response.use() sets up an interceptor, which is a hook that runs on every request/response
        // axios.interceptors.response.use() has two parameters, onSuccess and onError
        // On success, we can just forward through the response object
        // On an error, we ask for a new refresh token and resend the request with the new token
        const refreshInterceptor = axios.interceptors.response.use((response) => response,
        async (error) => {
            const originalRequest = error.config; // The request that failed

            if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
                originalRequest._retry = true; // ._retry is a custom field; it checks whether this request is going to be resent a 2nd time

                try {
                    const refreshResponse = await axios.post("http://localhost:8000/api/accounts/login/refresh/");
                    const newAccessToken = refreshResponse.data.access;

                    setToken(newAccessToken);

                    // Difference between this and axios.defaults.headers.common["Authorization"] is that this is for one specific request
                    // axios.defaults.headers.common["Authorization"] is for all future requests (global header settings)
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; 

                    return axios(originalRequest);
                }           
        
                catch (refreshError) {
                    setToken(null);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return () => {
        axios.interceptors.response.eject(refreshInterceptor);
    };
    }, []);


   return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuthProvider = () => {
    return useContext(AuthContext);
}