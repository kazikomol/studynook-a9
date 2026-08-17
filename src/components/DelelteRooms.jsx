'use client';

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const DelelteRooms = ({ roomId, token }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async (closeModal) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}` || '',
                },
            });

            if (res.ok) {
                closeModal();
                router.push('/rooms');
                router.refresh();
            } else {
                console.error('Failed to delete room');
            }
        } catch (error) {
            console.error('Error deleting room:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <Button className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-50 border border-red-200 cursor-pointer">
                    <span className="flex items-center justify-center gap-3">
                        <FaTrash /> Delete
                    </span>
                </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100 bg-white">
                        {({ close }) => (
                            <>
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>Confirm Deletion</AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    <p className="text-slate-600">
                                        Are you sure you want to delete this room? This action cannot be undone.
                                    </p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button
                                        className="text-slate-700"
                                        slot="close"
                                        variant="tertiary"
                                        isDisabled={isLoading}
                                        onPress={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="danger"
                                        className="font-bold text-white"
                                        isLoading={isLoading}
                                        onPress={() => handleDelete(close)}
                                    >
                                        Yes, Delete
                                    </Button>
                                </AlertDialog.Footer>
                            </>
                        )}
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DelelteRooms;