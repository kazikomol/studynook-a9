"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiClock, FiLayers, FiUsers } from 'react-icons/fi';

const RoomCard = ({ room }) => {
    // const { data: session, isPending } = authClient.useSession()
    // const user = session?.user;

    const {
        _id,
        roomName,
        description,
        imageUrl,
        floor,
        capacity,
        hourlyRate,
        amenities = [],
    } = room;

    const visibleAmenities = amenities.slice(0, 3);
    const extraCount = amenities.length - visibleAmenities.length;

    return (
        <div className="group flex flex-col rounded-2xl border border-[#e2d5c3] bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8b2619] hover:shadow-md overflow-hidden">

            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#ebdccb]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={roomName || 'Room image'}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">
                        
                    </div>
                )}

                {/* Floor badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#2b1810]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md shadow-sm">
                    <FiLayers className="text-[#e2a87a]" />
                    {floor || 'N/A'}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">

                <h3 className="mb-1.5 text-base font-bold text-[#2b1810] leading-snug line-clamp-1 group-hover:text-[#8b2619] transition-colors">
                    {roomName}
                </h3>

                <p className="mb-4 text-xs font-light leading-relaxed text-[#6e5849] line-clamp-2">
                    {description}
                </p>

                {/* Meta row */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#523d31] bg-[#f4ebe1] px-2.5 py-1 rounded-md">
                        <FiUsers className="text-[#8b2619]" />
                        {capacity} people
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#523d31] bg-[#f4ebe1] px-2.5 py-1 rounded-md">
                        <FiClock className="text-[#8b2619]" />
                        Hourly
                    </div>
                </div>

                {/* Amenity chips */}
                {amenities.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                        {visibleAmenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-md border border-[#e2d5c3] bg-[#fcf9f5] px-2.5 py-1 text-[10px] font-medium text-[#523d31]"
                            >
                                {amenity}
                            </span>
                        ))}
                        {extraCount > 0 && (
                            <span className="rounded-md border border-[#8b2619]/20 bg-[#8b2619]/5 px-2.5 py-1 text-[10px] font-semibold text-[#8b2619]">
                                +{extraCount} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#f0e4d7]">
                    <div>
                        <span className="font-playfair text-2xl font-bold text-[#8b2619]">
                            ${hourlyRate}
                        </span>
                        <span className="ml-1 text-xs font-light text-[#8c7465]">/hr</span>
                    </div>
                    <Link
                        
                        href={`/all-rooms/${_id}`}
                        className="flex items-center gap-2 rounded-xl bg-[#8b2619] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#6e1e13]"
                    >
                        View Details
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RoomCard;