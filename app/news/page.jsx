import React from 'react'
import News from '../../components/News'

const page = async () => {
    return(
        <div className="flex flex-col mt-5 gap-7">
       <div className="bg-cover bg-center bg-opacity-50 bg-[url(https://im.indiatimes.in/facebook/2019/Oct/mobile_gaming_1570096408.jpg)] w-full flex flex-col justify-center text-center items-center pl-7 h-[500px] gap-3">
        <h1 className="text-5xl font-extrabold justify-center"> Welcome to {' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]'> 
             Esports News
            </span> </h1>
        <span className="auto text-md">Your Ultimate source for Esports News</span>
      </div>
      <News/>
      </div>

    )
}

export default page;