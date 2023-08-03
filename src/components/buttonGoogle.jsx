import axios from 'axios';
import React, { useEffect,useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

function ButtonGoogle({setError}) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const {loginCardinalty,setloading} = useContext(AuthContext)
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&response_type=code&scope=profile email`;
    const handleSignInWithGoogle = () => {
        window.open(googleAuthUrl, '_self');
        }

        const hanlde_Change = async()=>{
            setloading(true)
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + '/oauth/google',{code})
                loginCardinalty(res.data.token,res.data.user)
            } catch (error) {
                if(error.response && error.response.data && error.response.data.message) setError(error.response.data.message)
                console.log(error)
                // else alert("Internet !!!!")
                setError("Verifier connexion internet")
            }
            setloading(false)
        }
    useEffect(()=>{
        if (code) hanlde_Change()
    },[])

  return (
        <button onClick={handleSignInWithGoogle} type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium  text-sm px-5 py-4 text-center flex items-center dark:focus:ring-[#4285F4]/55 w-full place-content-center">
            <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
            </svg>
            Connectez-vous avec Google
        </button>
  )
}

export default ButtonGoogle