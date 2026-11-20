import { createContext, useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
   return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuthProvider = () => {
    return useContext(AuthContext);
}