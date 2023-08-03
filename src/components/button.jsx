import React from 'react'

function Button({OnCLick}) {
  return (
    <button onSubmit={OnCLick} type="submit" class="text-white shadow-md bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium  text-sm px-5 py-4 text-center flex items-center dark:focus:ring-[#4285F4]/55 w-full place-content-center">
            Connectez-vous
    </button>
  )
}

export default Button