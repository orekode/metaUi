

import React from 'react'

const Loading = ({ show }) => {

    if(show)
    return (
        <div className='h-screen w-screen top-0 left-0 fixed z-50 flex items-center justify-center bg-black bg-opacity-55'>
            <div className="h-[50px] w-[50px] bg-[#222] flex items-center justify-center p-1 rounded shadow-xl">
                <img src="/images/loading.gif" alt="loading" className="h-full w-full object-contain" />
            </div>
        </div>
    )
    
    return <></>
}

export default Loading