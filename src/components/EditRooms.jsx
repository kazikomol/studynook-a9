'use client';

import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from '@heroui/react';
import { DollarSign, Layers, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const EditRooms = ({ room = {}, token }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Controlled Form State to guarantee capture
    const [formData, setFormData] = useState({
        roomName: room?.roomName || '',
        floor: room?.floor || '',
        capacity: room?.capacity || '',
        hourlyRate: room?.hourlyRate || '',
        description: room?.description || '',
    });

    const [selectedAmenities, setSelectedAmenities] = useState(room?.amenities || []);
    const [isLoading, setIsLoading] = useState(false);

    // Sync state when props change
    useEffect(() => {
        if (room) {
            setFormData({
                roomName: room.roomName || '',
                floor: room.floor || '',
                capacity: room.capacity || '',
                hourlyRate: room.hourlyRate || '',
                description: room.description || '',
            });
            setSelectedAmenities(room.amenities || []);
        }
    }, [room]);

    const onOpen = () => setIsOpen(true);
    const onCloseModal = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateRoom = async (e) => {
        e.preventDefault();

        if (!room?._id) {
            console.error('Room ID is missing.');
            return;
        }

        setIsLoading(true);

        const updatedData = {
            roomName: formData.roomName,
            description: formData.description,
            floor: formData.floor,
            capacity: Number(formData.capacity),
            hourlyRate: Number(formData.hourlyRate),
            amenities: selectedAmenities,
        };

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${apiUrl}/rooms/${room._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                onCloseModal();
                router.refresh();
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error('Server failed to update room:', res.status, errorData);
            }
        } catch (error) {
            console.error('Error updating room:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button
                onPress={onOpen}
                className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 border border-slate-300 cursor-pointer"
            >
                <span className="flex items-center justify-center gap-3">
                    <FaEdit /> Edit
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="bg-white sm:max-w-lg">
                            <Modal.CloseTrigger onClick={onCloseModal} />
                            <Modal.Header >
                                <Modal.Heading >Edit Room Details</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Update the details below to save changes to this room.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="bg-white p-6">
                                <Surface variant="default">
                                    <form id="edit-room-form" onSubmit={handleUpdateRoom} className="bg-white flex flex-col gap-4">
                                        <TextField className="w-full" variant="secondary">
                                            <Label>Room Name</Label>
                                            <Input className='bg-white border border-default'
                                                name="roomName"
                                                value={formData.roomName}
                                                onChange={handleChange}
                                                placeholder="Enter room name"
                                                required
                                            />
                                        </TextField>

                                        <div className="grid grid-cols-2 gap-4">
                                            <TextField className="w-full" variant="secondary">
                                                <Label>Floor</Label>
                                                <div className="flex items-center gap-2">
                                                    <Layers className="text-slate-400" size={20} />
                                                    <Input
                                                    className='bg-white border border-default'
                                                        name="floor"
                                                        value={formData.floor}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 3rd Floor"
                                                        required
                                                    />
                                                </div>
                                            </TextField>

                                            <TextField className="w-full" variant="secondary">
                                                <Label>Capacity</Label>
                                                <div className="flex items-center gap-2">
                                                    <Users className="text-slate-400" size={20} />
                                                    <Input
                                                    className='bg-white border border-default'
                                                        name="capacity"
                                                        type="number"
                                                        value={formData.capacity}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 10"
                                                        required
                                                    />
                                                </div>
                                            </TextField>
                                        </div>

                                        <TextField className="w-full" variant="secondary">
                                            <Label>Hourly Rate ($)</Label>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="text-slate-400" size={20} />
                                                <Input
                                                className='bg-white border border-default'
                                                    name="hourlyRate"
                                                    type="number"
                                                    value={formData.hourlyRate}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 50"
                                                    required
                                                />
                                            </div>
                                        </TextField>

                                        <TextField className="w-full" variant="secondary">
                                            <Label>Description</Label>
                                            <Input

                                            className='bg-white border border-default'
                                            
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Enter description"
                                            />
                                        </TextField>
                                    </form>
                                </Surface>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" variant="secondary" onClick={onCloseModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" form="edit-room-form" isDisabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default EditRooms;