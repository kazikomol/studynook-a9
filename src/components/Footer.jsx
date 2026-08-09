import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaPhoneAlt, FaLinkedin } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { X } from 'lucide-react';
import { MdMail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-black tracking-tighter text-blue-600">StudyNook</span>
            <p className="text-sm text-slate-500 font-medium">© 2026 StudyNook Inc. All rights reserved.</p>
          </div>

          {/* Useful links */}
          <div className="flex flex-row justify-center items-center gap-6 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/rooms" className="hover:text-blue-600 transition-colors">Rooms</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </div>

          {/* Contact information */}
          <div className="flex flex-col items-center gap-2 text-sm font-bold text-slate-600">
            <a href="mailto:support@studynook.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <MdMail className="w-4 h-4 text-blue-600" /> support@studynook.com
            </a>
            <a href="tel:+18005550199" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <FaPhoneAlt className="w-4 h-4 text-blue-600" /> +1 (800) 555-0199
            </a>
          </div>

          {/* Social icons */}
          <div className="flex flex-row justify-center items-center gap-3 text-slate-600">
            <p className="text-sm font-semibold">Social Links:</p>
            <a href="#" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors" aria-label="X">
              <X className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors" aria-label="Instagram">
              <BsInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;