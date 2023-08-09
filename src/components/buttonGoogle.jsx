import React from 'react'

function ButtonGoogle({usingFor,Title}) {
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL+usingFor}&response_type=code&scope=profile email`;
    const handleSignInWithGoogle = () => {
        window.open(googleAuthUrl, '_self');
        }
  return (
        <button onClick={handleSignInWithGoogle} type="button" class="block p-4 w-full focus:shadow-xl shadow text-sm focus:scale-105 text-gray-900 duration-300  outline-none flex place-content-center place-items-center">
            <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
            </svg>
            {Title} avec Google
        </button>
  )
}

export default ButtonGoogle