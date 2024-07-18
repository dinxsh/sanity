import React from 'react';
import Image from 'next/image';
import team from '../public/myteam.png';
import Console from '../public/NoGame.svg';
import Space from '../public/NoSpace.svg';
import Trophy from '../public/trophy.svg';

const ProfileComp = () => {
  return (
    <div className='pb-10'>
      <div>
        <h1 className='mt-5 text-xl font-bold'>My Teams</h1>
        <div className='flex justify-center'>
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center'>
              <Image className='' src={team} alt='team logo' width={64} height={64}/>
            </div>
            <h1>No Teams found</h1>{/*Dynamic data*/}
            <div className='flex justify-center'>
              <button className="bg-orange-500 hover:bg-blue-700 mt-5 text-white text-sm font-bold py-2 px-4 rounded">Create Team</button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <h1 className='mt-5 text-xl font-bold'>Joined Tournaments</h1>
        <div className='flex justify-center'>
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center'>
              <Image className='' src={Trophy} alt='team logo' width={64} height={64}/>
            </div>
            <h1 className='mt-5'>You haven't joined any tournaments</h1>{/*Dynamic data*/}
            <div className='flex justify-center'>
              <button className="bg-orange-500 hover:bg-blue-700 mt-5 text-white px-4 text-sm font-bold py-2 rounded">Join Tournament</button>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <h1 className='mt-5 text-xl font-bold'>Joined Spaces</h1>
        <div className='flex justify-center'>
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center'>
              <Image className='' src={Space} alt='team logo' width={64} height={64}/>
            </div>
            <h1 className='mt-5'>You haven't joined any Space</h1>{/*Dynamic data*/}
            <div className='flex justify-center'>
              <button className="bg-orange-500 hover:bg-blue-700 mt-5 text-white px-4 text-sm font-bold py-2 rounded">Join Space</button>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <h1 className='mt-5 text-xl font-bold'>Favorite Games</h1>
        <div className='flex justify-center'>
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center'>
              <Image className='' src={Console} alt='team logo' width={64} height={64}/>
            </div>
            <h1 className='mt-5'>No favorite games found</h1>{/*Dynamic data*/}
            <div className='flex justify-center'>
              <button className="bg-orange-500 hover:bg-blue-700 mt-5 text-white px-4 text-sm font-bold py-2 rounded">Add Games</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
