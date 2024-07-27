import { Button } from '../components/ui/button'
import React from 'react'

const BlogBanner = () => {
  return (
    <div className='blogBanner h-[420px] w-full flex flex-col justify-center gap-4 pl-5 pt-7 text-white text-center items-center'>
        <h1 className='text-4xl font-extrabold md:text-5xl '>Welcome to{" "}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]'> 
             Sanity Esports
            </span>
          </h1>
        <span className='md:auto  text-md'>Your Ultimate Source for Esports News and Blogs</span>
        <Button className="items-center justify-center gap-4 border-indigo-800 " variant="outline" >Read Latest Blogs</Button>
    </div>
  )
}

export default BlogBanner