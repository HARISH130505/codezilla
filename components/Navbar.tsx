"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'EVENTS', path: '/events' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CLUB MEMBERS', path: '/members' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <nav className='bg-black px-10 py-6 shadow-lg'>
      <div className='container mx-auto flex items-center justify-between'>
        <div>
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={150}
              height={150}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-8'>
          {navItems.map((item) => (
            <li
              key={item.name}
              className='text-white text-2xl font-passion hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
            >
              <Link href={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button*/}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-white focus:outline-none'>
            {isOpen ? (
              <X className='w-8 h-8' />
            ) : (
              <Menu className='w-8 h-8' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className='md:hidden bg-gray-800 mt-4 rounded-xl shadow-lg'>
          <ul className='flex flex-col space-y-4 p-4'>
            {navItems.map((item) => (
              <li
                key={item.name}
                className='text-white text-center text-xl font-passion hover:text-[#6E008B] transition duration-300 ease-in-out cursor-pointer'
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;