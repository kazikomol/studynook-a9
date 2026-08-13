"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@heroui/react';


import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const {data:session,isPending} = useSession();
  console.log(session);

  const handleSignOut = async () =>{
    await signOut();
    router.push('/login')

  }

  return (
    <nav className="border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                StudyNook
              </span>
            </Link>
          </div>

      <div className="hidden md:flex gap-8 items-center">
  <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
    Home
  </Link>
  <Link href="/rooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
    All Rooms
  </Link>

  {!isPending && session && (
    <>
      <Link href="/add-rooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
        Add Rooms
      </Link>
      <Link href="/my-listings" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
        My listing
      </Link>
      <Link href="/dashboard" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
        My Bookings
      </Link>
    </>
  )}
</div>

          {/* Auth & User Menu */}
          <div className="hidden md:flex items-center gap-4">
           {!isPending && !session ?
            <>
              <Link href="/login" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                  Register
                </Button>
              </Link>
            </> : 
           <div className="relative group">
              <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                <Image
                  width={40}
                  height={40}
                  src={session?.user?.image}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                />
                
              </button>

              <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-sm">Welcome back!</p>
                  <p className="text-xs truncate text-slate-500">{session?.user?.email}</p>
                </div>

                <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>

                <Link href="/settings" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                  <User className="w-4 h-4" /> Settings
                </Link>

                <Button onClick={handleSignOut} className="px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-3 transition-colors text-left">
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </div>
           
          }

            
          </div>

          
          </div>
        
      </div>

    
     
    </nav>
  );
};

export default Navbar;