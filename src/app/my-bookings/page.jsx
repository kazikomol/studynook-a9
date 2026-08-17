import { auth } from '@/lib/auth';
import { Button, Chip } from '@heroui/react';
import Link from 'next/link';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import CancelBooking from '@/components/CancelBooking';

const NotFound = () => {
    return (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="mb-4 text-slate-600 font-medium text-lg">No courses yet</p>

            <Link href="/rooms">
                <Button color="primary" className="font-medium">
                    Browse Courses
                </Button>
            </Link>
        </div>
    );
};

const MyBookingPage = async () => {
    const headerList = await headers();

    const { token } = await auth.api.getToken({
        headers: headerList,
    });

    const session = await auth.api.getSession({
        headers: headerList,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollment/${session?.user?.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    let data = null;
    if (res.ok) {
        data = await res.json();
    }

   

    return (
        <div className="  px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mb-80">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

                {/* Enrollments Container */}
                <div className="w-full md:w-3/4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                       My-Bookings
                    </h1>

                    {data.length === 0 ? (
                        <NotFound />
                    ) : (
                        <div className="space-y-4">
                            {data.map((data) => (
                                <div
                                    key={data?._id || data?.id}
                                    // Flex container to hold all content
                                    className="flex items-center gap-4 p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 w-full"
                                >
                                    {/* Image Section */}
                                    {data?.image && (
                                        <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                            <Image
                                                src={data.image}
                                                alt={data?.roomName || "course image"}
                                                fill
                                                className="object-cover"
                                                sizes="112px"
                                            />
                                        </div>
                                    )}

                                    {/* Right Content Area (Grouped details and action) */}
                                    <div className="flex items-center justify-between w-full">
                                        
                                        {/* Course Details (Title, Date, Chip) - Left aligned */}
                                        <div className="flex flex-col gap-1.5 grow">
                                            <h3 className="font-semibold text-lg text-slate-900 leading-tight">
                                                {data?.title || 'Course Title N/A'}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {data?.enrollmentAt ? new Date(data.enrollmentAt).toDateString() : 'Date N/A'}
                                            </p>
                                            
                                            {/* Status Chip goes here */}
                                            <Chip
                                                color="success"
                                                size="sm"
                                                variant="flat"
                                                className="font-medium mt-0.5"
                                            >
                                                Active
                                            </Chip>
                                        </div>

                                        {/* Action Button - Far right aligned */}
                                        <div className="shrink-0 ml-4">
                                            <CancelBooking id={data?._id} token={token} />
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingPage;