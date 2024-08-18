"use client"
import { useStore } from '@/store/store';
import Link from 'next/link';
import React, { useState } from 'react';

const AppleInspiredLoginPage = () => {
  const [password, setPassword] = useState('');

  const user = useStore((state) => state.user); 
  const setUser = useStore((state) => state.setUser); 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { user, password });
    setUser(user)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-xl">
        <div className="text-center">
            <div className = "flex">
                <svg className="mx-auto h-16 w-16 text-gray-300" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 5 10 5 10s5-4.75 5-10c0-3.87-3.13-7-7-7zm-2 7.5C10 8.57 11.57 7 13.5 7 14.88 7 16 8.12 16 9.5S14.88 12 13.5 12c-1.43 0-2.5-1.57-2.5-2.5zm-1 3.5c-.41 0-.75-.34-.75-.75S8.59 11 9 11s.75.34.75.75S9.41 13 9 13zm-2.5-1.75c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM15 11c-.41 0-.75-.34-.75-.75S14.59 9.5 15 9.5s.75.34.75.75S15.41 11 15 11zm0 1.5c-.41 0-.75-.34-.75-.75S14.59 10.5 15 10.5s.75.34.75.75S15.41 12.5 15 12.5zm2-1.75c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-5 6.25c-.53 0-1-.47-1-1s.47-1 1-1 1 .47 1 1-.47 1-1 1z" />
                </svg> 

            </div>
            
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="user" className="sr-only">user</label>
              <svg className="absolute top-3 left-3 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="user"
                name="user"
                type="user"
                autoComplete="user"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <svg className="absolute top-3 left-3 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Link href='store'>           
                <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Create and Sign in
                </button>
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AppleInspiredLoginPage;