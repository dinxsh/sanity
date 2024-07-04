import { Button } from '@/components/ui/button'
import React from 'react'

const BlogBanner = () => {
  return (
    <div className='blogBanner h-[420px] w-full flex flex-col justify-center gap-4 pl-5 pt-7 text-white'>
        <h1 className='text-2xl font-bold '>Welcome to Sanity Esports</h1>
        <span className='text-md'>Your Ultimate Source for Esports News and Blogs</span>
        <Button className='p-4 rounded-md bg-orange-500 hover:bg-orange-700 w-32'>Read Latest Blogs</Button>
    </div>
  )
}

export default BlogBanner