'use client';

import { useState } from 'react';
import { Button, Input } from '@heroui/react';

import {
    DoorOpen,
    Image as ImageIcon,
    DollarSign,
    Layers,
    Users,
    Wifi,
    Tv,
    Zap,
    VolumeX,
    Wind,
    Presentation,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import toast from 'react-hot-toast';

const ameneties = [
    { label: 'Whiteboard', value: 'Whiteboard', icon: Presentation },
    { label: 'Projector', value: 'Projector', icon: Tv },
    { label: 'Wi‑Fi', value: 'Wi‑Fi', icon: Wifi },
    { label: 'Power Outlets', value: 'Power Outlets', icon: Zap },
    { label: 'Quiet Zone', value: 'Quiet Zone', icon: VolumeX },
    { label: 'Air Conditioning', value: 'Air Conditioning', icon: Wind },
];

export default function Page() {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAmenityChange = (amenityValue, isChecked) => {
        setSelectedAmenities((prev) =>
            isChecked
                ? [...prev, amenityValue]
                : prev.filter((item) => item !== amenityValue)
        );
    };

    const handleAddRooms = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            const roomData = {
                roomName: formData.get('roomName'),
                description: formData.get('description'),
                image: formData.get('image'),
                floor: formData.get('floor'),
                capacity: Number(formData.get('capacity')),
                hourlyRate: Number(formData.get('hourlyRate')),
                amenities: selectedAmenities,
            };

            console.log('Posting payload to server:', roomData);

            const { data: tokenData } = await authClient.token();
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;

            const res = await fetch(`${baseUrl}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(roomData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || `Server error: ${res.status}`);
            }

            console.log('Response from server:', data);

            toast.success("Room created successfully!");
            e.target.reset();
            setSelectedAmenities([]);
            setImageUrl('');

        } catch (error) {
            console.error('Failed to create room:', error);
            toast.error(error?.message || "Failed to create room");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
                <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                        <DoorOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Create New{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                            Room
                        </span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Add a new space to your booking platform
                    </p>
                </div>

                <form onSubmit={handleAddRooms} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Room Name */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="roomName" className="text-sm font-bold text-slate-700 ml-1">
                                Room Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="roomName"
                                name="roomName"
                                aria-label="Room Name"
                                required
                                placeholder="e.g. Executive Boardroom A"
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-slate-700 ml-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                aria-label="Description"
                                required
                                placeholder="Describe the room layout, environment, and ideal use cases..."
                                className="w-full h-32 p-4 border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none resize-none outline-none text-slate-900 placeholder:text-slate-400 text-sm"
                            />
                        </div>

                        {/* Image URL Input & Preview */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="image" className="text-sm font-bold text-slate-700 ml-1">
                                Image URL
                            </label>
                            <div className="relative">
                                <ImageIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    aria-label="Image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/room-image.jpg"
                                    className="w-full h-14 pl-10 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                                />
                            </div>

                            {imageUrl && (
                                <div className="mt-3 flex justify-center p-2 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                                    <Image
                                        src={imageUrl}
                                        alt="Room Image Preview"
                                        width={400}
                                        height={220}
                                        className="object-cover rounded-xl shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Floor */}
                        <div className="space-y-2">
                            <label htmlFor="floor" className="text-sm font-bold text-slate-700 ml-1">
                                Floor
                            </label>
                            <div className="relative">
                                <Layers className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                                <Input
                                    id="floor"
                                    name="floor"
                                    type="text"
                                    aria-label="Floor"
                                    placeholder="e.g. 3rd Floor"
                                    className="w-full h-14 pl-10 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                                />
                            </div>
                        </div>

                        {/* Capacity */}
                        <div className="space-y-2">
                            <label htmlFor="capacity" className="text-sm font-bold text-slate-700 ml-1">
                                Capacity
                            </label>
                            <div className="relative">
                                <Users className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                                <Input
                                    id="capacity"
                                    name="capacity"
                                    type="number"
                                    min={1}
                                    aria-label="Capacity"
                                    placeholder="e.g. 4"
                                    className="w-full h-14 pl-10 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                                />
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="hourlyRate" className="text-sm font-bold text-slate-700 ml-1">
                                Hourly Rate ($)
                            </label>
                            <div className="relative">
                                <DollarSign className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                                <Input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    aria-label="Hourly Rate"
                                    placeholder="e.g. 5"
                                    className="w-full h-14 pl-10 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                                />
                            </div>
                        </div>

                        {/* Amenities Checkboxes */}
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Amenities
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {ameneties.map((amenity) => {
                                    const IconComponent = amenity.icon;
                                    const isSelected = selectedAmenities.includes(amenity.value);

                                    return (
                                        <label
                                            key={amenity.value}
                                            className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                                                isSelected
                                                    ? 'border-blue-600 bg-blue-50/30 text-blue-900 font-bold'
                                                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) =>
                                                    handleAmenityChange(amenity.value, e.target.checked)
                                                }
                                                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                                            />
                                            <div className="flex items-center gap-2">
                                                <IconComponent className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm font-semibold">{amenity.label}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-4">
                        <Button
                            type="button"
                            variant="flat"
                            size="lg"
                            className="flex-1 font-bold rounded-2xl h-14 text-slate-700 bg-slate-100 hover:bg-slate-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            size="lg"
                            isLoading={isLoading}
                            className="flex-2 font-black rounded-2xl h-14 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                        >
                            Create Room
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}