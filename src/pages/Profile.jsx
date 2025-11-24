import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Info from '../components/info';
import Kyc from '../components/kyc';
import Picture from '../components/Picture';
import TwoFA from '../components/2fa';

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-[#F0EFE9] p-6 font-sans text-gray-800 selection:bg-yellow-300 flex flex-col">
            <nav className="flex flex-wrap items-center justify-between mb-12">
                <div className="flex items-center">
                    <Link to="/dashboard" className="border border-gray-300 rounded-full px-6 py-2 bg-transparent text-xl font-medium tracking-tight">
                        DarCollective
                    </Link>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700`}>
                        Inactive
                    </div>
                    <button className="w-10 h-10 bg-[#111] text-white rounded-full flex items-center justify-center hover:bg-black transition shadow-lg">
                        <UserIcon className="w-4 h-4" />
                    </button>
                </div>
            </nav>
            <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full pb-20">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-normal text-[#111] mb-4 tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-xl text-gray-500 font-light max-w-xl">
                        Manage your profile details, security preferences, and identity verification.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    <div className="flex flex-col gap-8">
                        <Info />
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FCD34D]/20 rounded-full blur-3xl group-hover:bg-[#FCD34D]/30 transition-all duration-500"></div>
                        <Kyc />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <Picture />
                        <TwoFA />
                    </div>
                </div>
            </main>
        </div>
    );
};


const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)

export default ProfilePage;