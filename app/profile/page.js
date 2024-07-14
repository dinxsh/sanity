import React from 'react';
import ProfileComp from '../../components/ProfileComp';

const Page = () => {
  return (
    <><div className='p-5'>
    <div className='grid xl:grid-cols-10'>
      <div className='xl:col-span-4 flex justify-center'>
      <div className='rounded-lg max-w-96 min-w-96 h-svh text-red-500 bg-[#16182a]'>
        <div className='flex justify-center'>
          <div className='text-slate-300'>
            <div className='h-40 w-40 mt-8  border-4 border-gray-400 rounded-xl'>
              {/* Placeholder for image  */}
            </div>
            <div className='flex justify-center '>
              <h1 className='text-2xl mt-2 font-bold'>Name</h1>{/*Dynamic data*/}
            </div>
            <div className='flex justify-around font-semibold text-sm'>
              <h1>beginner</h1>{/*Dynamic data*/}
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <div className='w-80 text-slate-300 text-xs rounded-md bg-[#2c2c54] px-2 py-3 flex justify-around '>
            <div>
              <h1>Spaces</h1>
              <div className='flex justify-center pt-2'>
                <h1>0</h1>{/*Dynamic data*/}
              </div> 
            </div>
            <div>
              <h1>Tournaments</h1>
              <div className='flex justify-center pt-2'>
                <h1>0</h1>{/*Dynamic data*/}
              </div> 
            </div>
            <div>
              <h1>Games</h1>
              <div className='flex justify-center pt-2'>
                <h1>0</h1>{/*Dynamic data*/}
              </div> 
            </div>
          </div> 
        </div>  
        <div className=' flex justify-center'>
            <h1 className='text-[#5764ad] mt-4 font-semibold'>----Achievements----</h1>
        </div>
        <div className='text-[#5764ad] font-light text-sm h-60 flex justify-center flex-col'>
          <div className='flex justify-center'><p className=''>coming soon</p></div>
        </div>
        
      </div>
      </div> 
      <div className='col-span-6 hidden xl:block'>
        <ProfileComp/>
      </div>
    </div>
    </div>
    </>
  );
}

export default Page;