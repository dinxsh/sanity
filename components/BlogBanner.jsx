import { Button } from '../components/ui/button'
import React from 'react'

const BlogBanner = () => {
  return (
    <div className='blogBanner h-[420px] w-full flex flex-col justify-center gap-4 pl-5 pt-7 text-white text-center items-center'>
        <h1 className='text-4xl font-extrabold md:text-5xl '>Welcome to Sanity Esports</h1>
        <span className='md:auto text-md'>Your Ultimate Source for Esports News and Blogs</span>
        <Button className='p-4 rounded-md bg-orange-500 hover:bg-orange-700 w-32 '>Read Latest Blogs</Button>
    </div>
  )
}

export default BlogBanner