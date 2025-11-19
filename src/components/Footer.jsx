import React from 'react';

// A placeholder SVG for the QR Code
const QrCodeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H40V40H0V0ZM10 10V30H30V10H10Z" fill="black" />
        <path d="M15 15H25V25H15V15Z" fill="#A78BFA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M60 0H100V40H60V0ZM70 10V30H90V10H70Z" fill="black" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 60H40V100H0V60ZM10 70V90H30V70H10Z" fill="black" />
        <path d="M60 60H70V70H60V60Z" fill="black" /><path d="M80 60H90V70H80V60Z" fill="black" />
        <path d="M70 70H80V80H70V70Z" fill="black" /><path d="M90 70H100V80H90V70Z" fill="black" />
        <path d="M60 80H70V90H60V80Z" fill="black" /><path d="M80 80H90V90H80V80Z" fill="black" />
        <path d="M70 90H80V100H70V90Z" fill="black" />
    </svg>
);

// SVG for the dropdown arrow in the language selector
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
);


function Footer() {
    return (
        <footer>
            <div className="w-[80%] mx-auto border-b border-gray-300"></div>
            <div className=" text-black relative overflow-hidden font-sans h-[60vh]">
                <div className="max-w-7xl mx-auto mt-[60px]">
                    <div className="flex flex-col lg:flex-row justify-between gap-16">
                        <div className="flex flex-col justify-between max-w-sm">
                            <div>
                                <p className="text-3xl text-gray-400">Easiest way to</p>
                                <h2 className="text-4xl font-bold">Buy House with Darna and get first push with TirLire</h2>
                            </div>
                            <div className="mt-8">
                                <div className="flex items-center gap-3 bg-white p-2 rounded-lg w-fit">
                                    <QrCodeIcon />
                                    <a href="#" className="bg-gray-100 text-black font-semibold py-2 px-4 rounded-md text-sm hover:bg-gray-200 transition-colors">
                                        Join Beta
                                    </a>
                                </div>
                                <p className="text-sm text-gray-500 mt-8">
                                    © 2025. All rights reserved. DarCollection
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-12 md:gap-20">
                            <div>
                                <h3 className="font-bold mb-4">Features</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">One-click import</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">AI Copilot</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Auto Resize</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Social Share</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Community</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">About Klipstream</h3>
                                <ul className="space-y-3 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                                </ul>
                                <button className="mt-6 flex items-center gap-2 bg-[#1C1C1C] text-white py-2 px-3 rounded-md text-sm border border-gray-700 hover:bg-gray-800 transition-colors">
                                    EN
                                    <ChevronDownIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h1 className="text-black mt-[20px] text-[15.43vw] font-black leading-none whitespace-nowrap mx-auto ml-[-20px]">
                        DarCollective
                    </h1>
                </div>
            </div>
        </footer>
    );
}

export default Footer;