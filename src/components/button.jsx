import React from 'react'

function Button({OnCLick}) {
  return (
    <button onSubmit={OnCLick} type="submit" className="shadow hover:shadow-xl backdrop-blur-sm hover:tracking-widest hover:font-bold duration-300   hover:bg-white/50  focus:outline-none  font-medium  text-sm px-5 py-4 text-center flex items-center  w-full place-content-center">
            Connectez-vous
    </button>
  )
}

export default Button