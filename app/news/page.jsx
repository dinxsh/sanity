import React from 'react'
import News from '../../components/News'

const page = async () => {
    return(
        <div className="flex flex-col">
            <div className="bg-cover bg-center bg-[url(https://im.indiatimes.in/facebook/2019/Oct/mobile_gaming_1570096408.jpg)] w-full flex flex-col justify-center items-center h-[200px] py-8 px-4">
            </div>
            <News/>
        </div>
    )
}

export default page;