import React from 'react'
import LoadingAn from '../components/loading'

function Loading() {
  return (
    <div className='w-full min-h-screen top-0 z-50 overflow-hidden fixed flex place-content-center place-items-center bg-white'>
      <LoadingAn />
    </div>
  )
}

export default Loading