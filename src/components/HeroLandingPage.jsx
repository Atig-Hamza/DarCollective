import React from 'react';
import video from '../assets/images/output.mp4';
import { Link } from 'react-router-dom';


const ChevronDownIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

const StarIcon = () => (
    <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);



function HeroLandingPage() {
    const brands = ["HEIRESS", "TOZO", "Hell Babes", "cocokind", "Oxyfresh", "DOT & KEY", "Skybags", "Bellefit", "AMAZING LACE"];

    return (
        <div className="bg-white font-sans">
            <div className="container mx-auto px-4">
                
                <header className="py-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-medium">DarCollection</span>
                    </div>
                    <nav className="hidden lg:flex items-center gap-8 text-gray-700">
                        <a href="#" className="flex items-center hover:text-black">Products <ChevronDownIcon /></a>
                        <a href="#" className="hover:text-black">Customer Stories</a>
                        <a href="#" className="hover:text-black">Resources</a>
                        <a href="#" className="hover:text-black">Pricing</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden sm:block text-gray-700 hover:text-black font-medium">Login</Link>
                        <Link to="/signup" className="bg-black text-white font-medium py-2 px-5 rounded-full hover:bg-gray-800">Register</Link>
                    </div>
                </header>

                
                <main className="text-center py-16 md:py-24">
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 leading-tight">
                        Effortlessly Buy Your Dream Home <br /> and Unlock Financial Support with <span className="text-amber-400">TirLire</span>
                    </h1>
                    <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                        Seamlessly manage every step—from inspiration to ownership. TirLire empowers you to discover, purchase, and finance your ideal home with ease and confidence.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800">
                            Scroll Down
                        </button>
                        <button className="bg-white text-black font-semibold py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-100">
                            Get Started Free
                        </button>
                    </div>
                    <div className="mx-auto w-[95%]">
                        <video
                            src={video}
                            muted
                            loop
                            autoPlay
                            controlsList="nodownload noremoteplayback nofullscreen"
                            style={{ outline: 'none' }}
                            className="mt-12 rounded-lg shadow-lg"
                        ></video>
                    </div>
                </main>
    <div className="py-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
        {brands.map(brand => (
            <span key={brand} className="font-bold text-xl tracking-wider text-gray-800">{brand}</span>
        ))}
    </div>
            </div >
        </div >
    );
}

export default HeroLandingPage;