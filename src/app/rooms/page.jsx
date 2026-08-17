import RoomCard from '@/components/RoomCard';
import SearchBar from '@/components/SearchBar';
import { allRooms } from '@/lib/rooms/data';
import React from 'react';

const AllRoomsPage = async ({ searchParams }) => {
    const sParams = await searchParams;
    const rooms = await allRooms(sParams?.searchTerm || "");

    return (
        <section className="relative min-h-screen px-6 py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-black leading-tight text-4xl sm:text-5xl">
                    All Study Rooms
                </h1>
                <p className="mt-2 text-sm leading-7 sm:text-base text-slate-600">
                    Browse the full catalog. Filter by amenity, price, or search by name.
                </p>
            </div>

            {/* Layout Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                
                {/* Search Bar Sidebar (Left Side - 1 Column) */}
                <div className="lg:col-span-1 sticky top-6">
                    <SearchBar defaultValue={sParams?.searchTerm || ''} />
                </div>

                {/* Room Cards (Right Side - 3 Columns) */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {rooms?.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AllRoomsPage;