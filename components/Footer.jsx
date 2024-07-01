import Image from 'next/image';
import React from 'react';
import sanity from '../app/assets/sanity.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex flex-col gap-5 pl-10 mt-10">
      <div className="flex flex-row gap-36">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <Image
              src={sanity}
              alt="logo"
              width={25}
              height={25}
              className="object-cover"
            />
            <h1 className="text-lg font-bold">Sanity Esports</h1>
          </div>
          <span>© 2023 Sanity Esports. All rights reserved.</span>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg">Quick Links</h1>
          <Link href={'/'} className="hover:text-orange-500">
            Home
          </Link>
          <Link href={'/blog'} className="hover:text-orange-500">
            Blog
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg">Connect</h1>
          <Link href={'#'} className="hover:text-orange-500">
            Facebook
          </Link>
          <Link href={'#'} className="hover:text-orange-500">
            Instagram
          </Link>
          <Link href={'#'} className="hover:text-orange-500">
            Youtube
          </Link>
        </div>
      </div>
      <span className="text-center">Sanity Esports © 2024</span>
    </div>
  );
};

export default Footer;
