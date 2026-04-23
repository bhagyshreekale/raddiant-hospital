import React from 'react';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
} from 'react-icons/fa';

// 1. Define the shape of your contact data to fix the 'any' type error
interface ContactData {
    address?: string;
    phone?: string;
    email?: string;
    open_hours?: string;
    map_link?: string;
}

interface MapSectionProps {
    contactData: ContactData | null;
}

export default function MapSection({ contactData }: MapSectionProps) {
    // 2. Prepare the items with fallback values from your database data
    const items = [
        { 
            icon: <FaMapMarkerAlt />, 
            label: 'Address', 
            value: contactData?.address || 'Raddiant Plus Hospital, Nashik, Maharashtra' 
        },
        { 
            icon: <FaPhoneAlt />, 
            label: 'Phone', 
            value: contactData?.phone || '+91 253 000 0000' 
        },
        { 
            icon: <FaEnvelope />, 
            label: 'Email', 
            value: contactData?.email || 'info@raddiantplus.com' 
        },
        {
            icon: <FaClock />,
            label: 'OPD Hours',
            value: contactData?.open_hours || 'Mon–Sat: 9:00 AM – 8:00 PM | Emergency: 24/7',
        },
    ];

    // Default map embed if none is provided in the database
    const defaultMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.123456789!2d73.789!3d19.999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU5JzU2LjQiTiA3M8KwNDcnMjAuNCJF!5e0!3m2!1sen!2sin!4v1234567890";

    return (
        <section className="bg-gray-100 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    
                    {/* Left Column: Contact Info */}
                    <div className="w-full lg:w-5/12">
                        <span className="inline-block rounded-full bg-blue-600/10 px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
                            Find Us
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            Visit Raddiant Plus Hospital
                        </h2>

                        <div className="my-6 h-1 w-16 rounded-full bg-cyan-500" />

                        <div className="flex flex-col gap-6">
                            {items.map((item) => (
                                <div
                                    key={item.label}
                                    className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
                                >
                                    {/* Icon Square */}
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-blue-600/20 shadow-md transition-transform group-hover:scale-110">
                                        {item.icon}
                                    </div>

                                    {/* Label + Value */}
                                    <div>
                                        <div className="text-[0.7rem] font-bold tracking-wider text-gray-400 uppercase">
                                            {item.label}
                                        </div>
                                        <div className="mt-0.5 text-[0.95rem] leading-relaxed font-medium text-gray-700">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Google Map */}
                    <div className="w-full lg:w-7/12">
                        <div className="overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl shadow-gray-300">
                            <iframe
                                src={contactData?.map_link || defaultMap}
                                width="100%"
                                height="400"
                                className="block border-0 grayscale-[0.2] transition-all hover:grayscale-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Raddiant Plus Hospital Location Map"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}