import { Card } from '@heroui/react';
import { CoffeeIcon, Monitor } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { BsProjector } from 'react-icons/bs';
import { FaCalendar, FaEdit, FaTrash, FaWifi } from 'react-icons/fa';
import { FiClock, FiLayers, FiUsers } from 'react-icons/fi';
import { GiSoundOff } from 'react-icons/gi';

const amenityIcons = {
    'High-Speed Wi-Fi': <FaWifi/>,
    '4K Projector':  <BsProjector />, 
    'Whiteboard': <Monitor/>,
    'Soundproof': <GiSoundOff/> ,
    'Coffee Machine': <CoffeeIcon/>,
};

const details = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`);
    const data = await res.json();
    return data || {};
};

const RoomsDetailsPage = async ({ params }) => {
    const { id } = await params;
    const RoomDetails = await details(id);

    const {
        _id,
        roomName,
        description,
        imageUrl,
        floor,
        capacity,
        hourlyRate,
        ownerEmail,
        amenities = [],
    } = RoomDetails;

    const isOwner = false;

    return (
        <Card className="relative min-h-screen   mx-auto my-10 overflow-hidden px-6 py-16 bg-slate-50">
            

            <div className="relative z-10 mx-auto max-w-6xl w-full">

                {/* Eyebrow */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#8b2619] shadow-sm">
                
                    <span>ROOM DETAILS</span>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image */}
                        <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:h-96">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={roomName || 'Room image'}
                                    fill
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-7xl text-slate-300">
                                    
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur-sm shadow-sm">
                                <FiLayers className="text-[#8b2619]" />
                                {floor || 'N/A'}
                            </div>
                        </div>

                        {/* Title + Meta */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h1 className="mb-1 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                                {roomName}
                            </h1>
                            <p className="mb-4 text-sm text-slate-500">Listed by {ownerEmail || 'Unknown'}</p>

                            <div className="mb-6 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                                    <FiUsers className="text-[#8b2619]" />
                                    <span>{capacity} people</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                                    <FiLayers className="text-[#8b2619]" />
                                    <span>{floor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                                    <FiClock className="text-[#8b2619]" />
                                    <span>Hourly booking</span>
                                </div>
                            </div>

                            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8b2619]">
                                About this room
                            </div>
                            <p className="text-sm font-light leading-relaxed text-slate-600">
                                {description}
                            </p>
                        </div>

                        {/* Amenities */}
                        {amenities.length > 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[#8b2619]">
                                    Amenities
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {amenities.map((amenity) => (
                                        <div
                                            key={amenity}
                                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                        >
                                            <span className="text-[#8b2619]">
                                                {amenityIcons[amenity] ?? '✦'}
                                            </span>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN — Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">

                            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8b2619]">
                                Hourly Rate
                            </div>
                            <div className="mb-6 flex items-end gap-1">
                                <span className="font-playfair text-4xl font-bold text-slate-900">${hourlyRate}</span>
                                <span className="mb-1 text-sm font-light text-slate-500">/ hr</span>
                            </div>

                            <div className="mb-5 h-px w-full bg-slate-100" />

                            <div>
                                <label htmlFor="my_modal_9" className="flex justify-center w-full rounded-xl bg-[#8b2619] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#6e1e13] cursor-pointer shadow-sm">
                                    <span className='flex items-center justify-center gap-3'><FaCalendar /> Book Now</span>
                                </label>
                            </div>

                            {isOwner && (
                                <div className="flex justify-between gap-2 mt-3">
                                    <label htmlFor="my_modal_7" className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 border border-slate-300 cursor-pointer">
                                        <span className='flex items-center justify-center gap-3'><FaEdit /> Edit </span>
                                    </label>
                                    <label htmlFor="my_modal_8" className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-50 border border-red-200 cursor-pointer">
                                        <span className='flex items-center justify-center gap-3'><FaTrash /> Delete </span>
                                    </label>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </Card>
    );
};

export default RoomsDetailsPage;