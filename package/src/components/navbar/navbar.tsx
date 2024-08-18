"use client"
import { useStore } from '@/store/store';
import React, { useEffect, useState } from 'react';
import ShoppingCartComponent from '../cart/cartmenu';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useStore((state) => state.user); 

  const [searchValue, setSearchValue] = useState(""); 
  const setSearchString = useStore((state) => state.setSearchValue);
  useEffect(() => {
    setSearchString(searchValue);
  }, [searchValue])

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll); 
    }

  },[])
  return (
    <nav 
    className={`text-gray-100 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled? 'bg-gray-800/95 backdrop-blur-md shadow-md':'bg-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="store" className="font-semibold text-xl">
              RagBuy.com
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4 text-sm">
              <Link href="store" className="text-gray-300 hover:text-white transition-colors">Store</Link>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Orders</a>
              <Link href="checkout" className="text-gray-300 hover:text-white transition-colors">Cart</Link>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">User</a>
              <Link href="login" className="text-gray-300 hover:text-white transition-colors">{user}</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button> 
            <ShoppingCartComponent/>
          </div>
          <div className="flex md:hidden">
            <ShoppingCartComponent/>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-gray-700 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-0 focus:placeholder-gray-500 focus:text-gray-100 sm:text-sm"
                placeholder="Search"
                type="search"
                value = {searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 text-sm">
            <Link href="store" className="block text-gray-300 hover:text-white transition-colors py-2">Store</Link>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Orders</a>
            <Link href="checkout" className="block text-gray-300 hover:text-white transition-colors py-2">Cart</Link>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">User</a>
            <Link href="login" className="block text-gray-300 hover:text-white transition-colors py-2">Login</Link>

          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex-col items-center px-2 space-x-4">
            <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;