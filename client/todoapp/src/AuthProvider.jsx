import { createContext, useContext, useLayoutEffect, useState, useRef } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const tokenRef = useRef(null);

    const setToken = (t) => {
        tokenRef.current = t;   // Available instantly

        if (t === null) {
            setIsAuthenticated(a => false);    // For UI re-renders
        }

        else {
            setIsAuthenticated(a => true);    // For UI re-renders
        }
    };

    const login = async (credentials) => {
        const { data } = await axios.post("http://localhost:8000/api/accounts/login/", credentials);
        setToken(data.access);
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/accounts/logout/"); // Lets the server clear the refresh cookie
        } catch (_) { }

        setToken(null);
    }

    useLayoutEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(config => {
            if (tokenRef.current) {
                config.headers.Authorization = `Bearer ${tokenRef.current}`;
            }

            return config;
        });

        // axios.interceptors.response.use() sets up an interceptor, which is a hook that runs on every request/response
        // axios.interceptors.response.use() has two parameters, onSuccess and onError
        // On success, we can just forward through the response object
        // On an error, we ask for a new refresh token and resend the request with the new token
        const refreshInterceptor = axios.interceptors.response.use((response) => response,
            async (error) => {
                const originalRequest = error.config; // The request that failed
                const isAuthUrl = originalRequest.url?.includes("/accounts/");

                if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry && !isAuthUrl) {
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
            axios.interceptors.request.eject(reqInterceptor);
        };
    }, []);


    return (
        <AuthContext.Provider value={{ tokenRef, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthProvider = () => {
    return useContext(AuthContext);
}