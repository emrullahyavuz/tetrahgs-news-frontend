import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState(false)

    const login = () => {
        setAuth(true)
    }
    const logout = () => {
        setAuth(false)
    }


  return <AuthContext.Provider value={{auth,login,logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// context custom hook

export const useAuth = () => {

    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
