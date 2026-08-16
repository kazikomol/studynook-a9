"use client";
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="relative w-full min-h-[400px] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:p-10">
           
           {/* Left Side: Text and Button */}
           <div className="relative z-10 flex flex-col items-start justify-center gap-3 text-left max-w-3xl">
             <h2 className='text-4xl md:text-5xl font-bold text-[#9a0002]'>
               Find Your Perfect<br></br> Study Room
             </h2>
             <p className=' text-lg text-slate-400 font-medium'>
               Browse and book quiet, private study rooms in your library.<br/> List your own room and earn.
             </p>
            <Link href={'/room'}><Button className={"bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-95 transition-all rounded-xl border-none hover:bg-white/10 backdrop-blur-md"}>EXPLORE</Button></Link>
           </div>

           {/* Right Side: Image */}
           <div className="w-full min-w-0">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>  <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden">
             <Image
               src="https://www.scottishbooktrust.com/uploads/store/mediaupload/8650/image/xl_limit-book-read-architecture-interior-building-old-reading-historic-room-bookshelf-aisle-uk-wales-inside-cool-image-study-library-books-domain-stock-public-british-michael-learn-d-gladstone-gladstones-gladstones.jpg"
               fill
               priority
               alt='banner'
               className="object-cover"
             />
             <div className="absolute inset-0 " />
           </div></SwiperSlide>
        <SwiperSlide>  <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden">
             <Image
               src="https://www.scottishbooktrust.com/uploads/store/mediaupload/8650/image/xl_limit-book-read-architecture-interior-building-old-reading-historic-room-bookshelf-aisle-uk-wales-inside-cool-image-study-library-books-domain-stock-public-british-michael-learn-d-gladstone-gladstones-gladstones.jpg"
               fill
               priority
               alt='banner'
               className="object-cover"
             />
             <div className="absolute inset-0 " />
           </div></SwiperSlide>
              <SwiperSlide>  <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden">
             <Image
               src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               fill
               priority
               alt='banner'
               className="object-cover"
             />
             <div className="absolute inset-0 " />
           </div></SwiperSlide>
              <SwiperSlide>  <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden">
             <Image
               src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               fill
               priority
               alt='banner'
               className="object-cover"
             />
             <div className="absolute inset-0 " />
           </div></SwiperSlide>
     
      </Swiper>
    </div>

        </div>
    );
};

export default Banner;