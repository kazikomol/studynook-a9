"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@heroui/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/rooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
              All Rooms
            </Link>
            {/* <Link href="/add-rooms" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Add Rooms</Link>
            <Link href="/my-listings" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">My listing</Link>
            <Link href="/dashboard" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">My Bookings</Link> */}
          </div>

          {/* Auth & User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <>
              <Link href="/login" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                  Join Free
                </Button>
              </Link>
            </>

            <div className="relative group">
              <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                <Image
                  width={40}
                  height={40}
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold truncate max-w-25">Nazmus Sakib</p>
                  <p className="text-[10px] text-slate-500">Student</p>
                </div>
              </button>

              <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-sm">Welcome back!</p>
                  <p className="text-xs truncate text-slate-500">sakib@gmail.com</p>
                </div>

                <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>

                <Link href="/settings" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                  <User className="w-4 h-4" /> Settings
                </Link>

                <button className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 px-4 pt-2 pb-4 space-y-3">
          <Link href="/" className="block font-medium text-slate-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/courses" className="block font-medium text-slate-700 hover:text-blue-600">
            All Rooms
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/login" className="block font-medium text-slate-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register">
              <Button color="primary" className="w-full font-bold rounded-full">
                Join Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;