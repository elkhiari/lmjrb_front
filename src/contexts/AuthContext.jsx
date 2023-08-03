import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [token,setToken] = useState(()=>Cookies.get('token-x') || '');
    const [loading,setloading] = useState(true)
    const [user,setUser] = useState()
    const [role,setRole] = useState() 
    const loginCardinalty = (token,user)=>{
        setToken(token)
        setUser(user)
        setRole(user.role)
        Cookies.set('token-x',token,{expires:7})
    }

    const logout = ()=>{
        setToken('');
        setUser('');
        Cookies.remove('token-x')
    }

    const tokenIsValid = async()=>{
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/me',{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUser(res.data)
            console.log(res.data)
            setRole(res.data.role);
        } catch (error) {
           logout() 
        }
        setloading(false)
    }

    useEffect(()=>{
        if (token !== undefined && token !== "") tokenIsValid();
        else setloading(false)
    },[token])


    return(
    <AuthContext.Provider value={{ user, token, role, loginCardinalty, logout, loading, setloading }}>
        {children}
      </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}