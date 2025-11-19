import React from "react";
import video from '../assets/images/output.mp4'
import PostForm from '../components/PostForm.jsx';


const Signup = () => {
  const imageUrl = video;

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="flex w-screen h-screen overflow-hidden bg-white">
        <div className="hidden lg:flex w-1/2 bg-cover bg-center p-12 text-white relative flex-col justify-between">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={imageUrl}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative z-10">
            <h2 className="font-sans font-bold text-2xl tracking-widest uppercase">DARCOLLECTIVE</h2>
            <div className="w-24 h-px bg-white mt-2"></div>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="font-serif text-5xl font-bold leading-tight">Get everything you want</h1>
            <p className="mt-6 text-gray-200 font-sans text-lg">
              You can get anything you want if you work hard. And trust the god who has shown you the dream you are chasing
            </p>
          </div>
        </div>
        <PostForm signup/>
      </div>
    </div>
  );
};

export default Signup;