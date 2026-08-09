import React from 'react';
import RoomCard from './RoomCard';
import {  featuredRooms } from '@/lib/rooms/data';

const FeaturedRoom = async() => {
    const rooms = await featuredRooms();
    return (
        <div className='container mx-auto'>
            <div>
                <h2 className='text-3xl text-center font-bold italic '>Top Featured Rooms</h2>
            </div>
            <div className="max-w-7xl py-5 mx-auto  grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
         
    );
};

export default FeaturedRoom;