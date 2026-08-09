
import RoomCard from '@/components/RoomCard';
import { allRooms } from '@/lib/rooms/data';
import React from 'react';

const AllRoomsPage = async () => {
   const rooms = await allRooms();
    
    return (
        <section className="relative min-h-screen overflow-hidden px-6 py-16 ">
            <div className='text-center mb-5'>
                <h1 className="font-black leading-tight text-4xl sm:text-5xl">
                    All Study Rooms
                </h1>
                <p className="mt-1 text-sm leading-7 sm:text-base ">
                    Browse the full catalog. Filter by amenity, price, or search by name.
                </p>
            </div>

            <div className="max-w-7xl py-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </section>
    );
};

export default AllRoomsPage;