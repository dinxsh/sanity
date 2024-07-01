import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {
  return (
    <div className="relative flex items-center justify-between w-full px-8 py-5 mx-auto dark:bg-black">
      <Link href="/" className="text-3xl font-bold">
        Sanity
      </Link>
      <nav className="flex flex-row items-center gap-4">
        <Link href="/" className="text-3xl font-bold">
          Home
        </Link>
        <Link href="/blog" className="text-3xl font-bold">
          Blog
        </Link>
      </nav>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
