import { createContext, useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // True until the on-mount refresh finishes, so protected routes don't redirect too early
    const tokenRef = useRef(null);
    const refreshPromiseRef = useRef(null); // Holds the in-flight refresh so concurrent 401s share one request

    const setToken = (t) => {
        tokenRef.current = t;
    };

    // Single refresh function used by both the mount effect and the interceptor
    const refreshToken = () => {
        if (!refreshPromiseRef.current) {
            refreshPromiseRef.current = axios
                .post("http://localhost:8000/api/accounts/login/refresh/")
                .then(({ data }) => {
                    setToken(data.access);
                    setIsAuthenticated(true);
                    return data.access;
                })
                .finally(() => {
                    refreshPromiseRef.current = null;
                });
        }

        return refreshPromiseRef.current;
    };

    const login = async (credentials) => {
        const { data } = await axios.post("http://localhost:8000/api/accounts/login/", credentials);
        setToken(data.access);

        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/accounts/logout/"); // Lets the server clear the refresh cookie
        } catch (_) { }

        setToken(null);
        setIsAuthenticated(false);
    }

    // Restore the session on page load using the refresh cookie
    useEffect(() => {
        refreshToken()
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, []);

    useLayoutEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(config => {
            if (tokenRef.current) {
                config.headers.Authorization = `Bearer ${tokenRef.current}`;
            }

            return config;
        });

        // axios.interceptors.response.use() sets up an interceptor, which is a hook that runs on every response
        // axios.interceptors.response.use() has two parameters, onSuccess and onError
        // On success, we can just forward through the response object
        // On an error, we ask for a new refresh token and resend the request with the new token
        const refreshInterceptor = axios.interceptors.response.use((response) => response,
            async (error) => {
                const originalRequest = error.config; // The request that failed
                const isAuthUrl = originalRequest?.url?.includes("/accounts/"); // FIX: originalRequest can be undefined for non-HTTP errors

                // FIX: retry on 401 only; a 403 means "not allowed", and a new token won't change that
                if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthUrl) {
                    originalRequest._retry = true; // ._retry is a custom field; it checks whether this request is going to be resent a 2nd time

                    try {
                        const newAccessToken = await refreshToken(); // FIX: shared refresh; setToken now happens inside refreshToken()

                        // Difference between this and axios.defaults.headers.common["Authorization"] is that this is for one specific request
                        // axios.defaults.headers.common["Authorization"] is for all future requests (global header settings)
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        return axios(originalRequest);
                    }

                    catch (refreshError) {
                        setToken(null);
                        setIsAuthenticated(false);
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
        <AuthContext.Provider value={{ tokenRef, login, logout, isAuthenticated, isLoading }}> {/* FIX: isLoading exposed */}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthProvider = () => {
    return useContext(AuthContext);
}