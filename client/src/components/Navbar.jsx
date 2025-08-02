import { MenuIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="max-md:flex-1 ml-[-50px] flex items-center">
            <img src={assets.bankofmaha} alt="Logo" className="w-47  h-15" />
          </NavLink>

          <div
            className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 
            max-md:h-screen min-md:rounded-full backdrop-blur bg-amber-50 md:bg-white/90 md:border border-gray-300/60 overflow-hidden 
            transition-all duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0 max-md:opacity-0 max-md:pointer-events-none'}`}
          >
            <XIcon
              className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <NavLink
              to="/"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-200 ${
                  isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about-us"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-200 ${
                  isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/locate-us"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-200 ${
                  isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              Locate Us
            </NavLink>

            <NavLink
              to="/careers"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-200 ${
                  isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              Careers
            </NavLink>

            <NavLink
              to="/contact-us"
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              className={({ isActive }) =>
                `hover:scale-105 transition-all duration-200 ${
                  isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-white border-2 border-blue-600 shadow-[0_0_20px_rgba(165,152,224,0.5)] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            >
              🔐 Sign In
            </button>
          </div>

          <MenuIcon
            className="bg-amber-200 rounded-2xl max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
