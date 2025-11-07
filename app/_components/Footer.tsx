'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
    const [email, setemail] = useState('');
    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please provide a valid email');
            return;
        }
        setemail(email);
        toast.success('Subscribed successfully!');
        setemail('');
    };

    return (
        <footer className="border-t border-gray-700 text-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand + short */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold">
                            MP
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">MazaPay</h3>
                            <p className="text-sm text-gray-400">
                                Secure. Fast. Local-friendly payments.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} MazaPay. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-3">
                        {/* social icons */}
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="p-2 rounded-md hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.11 1.53-1.92-.67.4-1.42.7-2.22.86A3.48 3.48 0 0015.5 4c-1.92 0-3.48 1.56-3.48 3.48 0 .27.03.53.09.78C8.5 8.1 5.3 6.1 3.14 3.1c-.3.52-.48 1.12-.48 1.76 0 1.22.62 2.3 1.56 2.93-.57-.02-1.1-.17-1.56-.43v.04c0 1.7 1.21 3.12 2.82 3.44-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.07.46 1.44 1.79 2.48 3.37 2.51A6.98 6.98 0 012 19.54a9.86 9.86 0 005.33 1.56c6.4 0 9.9-5.3 9.9-9.9v-.45c.68-.5 1.27-1.12 1.74-1.84-.62.28-1.28.48-1.96.57z" />
                            </svg>
                        </a>

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="p-2 rounded-md hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.9h2.8l-.45 2.9h-2.35V21.9C18.34 21.12 22 17 22 12z" />
                            </svg>
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="p-2 rounded-md hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18V10.5H6.08V18h2.26zM7.2 9.37a1.31 1.31 0 110-2.62 1.31 1.31 0 010 2.62zM18 18v-4.8c0-2.56-1.37-3.75-3.2-3.75-1.47 0-2.12.82-2.5 1.4V10.5H10.1c.03.6 0 7.5 0 7.5h2.2v-4.19c0-.22.02-.44.08-.61.18-.48.58-.98 1.25-.98.88 0 1.23.74 1.23 1.83V18H18z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navigation links */}
                <div>
                    <h4 className="text-sm font-semibold mb-3">প্রডাক্ট</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>
                            <a href="#" className="hover:text-white">
                                পেমেন্ট গেটওয়ে
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                ইনভয়েসিং
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                API ডকুমেন্ট
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                ডেভেলপার হাব
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Support links */}
                <div>
                    <h4 className="text-sm font-semibold mb-3">সহায়তা</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>
                            <a href="#" className="hover:text-white">
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                সাপোর্ট টিকিট
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                রিসোর্স সেন্টার
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                প্রাইভেসি পলিসি
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CTA: newsletter + payments */}
                <div className="md:col-span-1">
                    <h4 className="text-sm font-semibold mb-3">নিউজলেটার</h4>
                    <p className="text-sm text-gray-400 mb-3">নতুন আপডেট পেতে ইমেইল দিন।</p>

                    <form className="flex gap-2" onSubmit={handleSubscribe}>
                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            aria-label="Email"
                            type="email"
                            placeholder="আপনার ইমেইল"
                            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="px-4 py-2 rounded-md cursor-pointer bg-indigo-600 text-white text-sm hover:bg-indigo-500">
                            Join
                        </button>
                    </form>

                    <div className="mt-6">
                        <h5 className="text-sm font-medium mb-2">পেমেন্ট মেথড</h5>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-12 rounded-md bg-white/10 flex items-center justify-center text-xs">
                                Visa
                            </div>
                            <div className="h-8 w-12 rounded-md bg-white/10 flex items-center justify-center text-xs">
                                Master
                            </div>
                            <div className="h-8 w-12 rounded-md bg-white/10 flex items-center justify-center text-xs">
                                Bkash
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-xs text-gray-400 items-center gap-3">
                    <p>Made with ❤️ in Bangladesh</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white">
                            Terms
                        </a>
                        <a href="#" className="hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
