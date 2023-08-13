import React ,{ useEffect } from 'react'

function NotFound() {

  useEffect(()=>{
    document.title = 'Not Found'
  },[])
  return (
    <div>NotFound</div>
  )
}

export default NotFound