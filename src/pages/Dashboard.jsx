import React from 'react';
import { Link } from 'react-router-dom';

const userInfo = async () => {
}

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F0EFE9] p-6 font-sans text-gray-800 selection:bg-yellow-300 flex flex-col">
      
      
      <nav className="flex flex-wrap items-center justify-between mb-16">
        <div className="flex items-center">
          <div className="border border-gray-300 rounded-full px-6 py-2 bg-transparent text-xl font-medium tracking-tight">
            DarCollective
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full hover:bg-white transition text-sm font-medium">
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <Link to="/profile" className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center hover:bg-white transition text-gray-500">
            <UserIcon className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      
      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full pb-20">
        
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-normal text-[#111] mb-6 tracking-tight">
            Where to today?
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Select a workspace to continue
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

          
          <a 
            href="/tirelire" 
            className="group relative h-96 rounded-[2.5rem] bg-white p-8 md:p-12 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden border border-transparent hover:border-gray-200"
          >
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#FCD34D] rounded-2xl flex items-center justify-center text-black">
                    <WalletIcon className="w-7 h-7" />
                </div>
                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-[#FCD34D] transition-colors duration-300">
                    <ArrowUpRightIcon className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-medium text-gray-900 mb-3">Tirelire</h2>
                <p className="text-gray-500 text-lg">Manage finances, contributions, and savings.</p>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FCD34D]/10 rounded-full blur-3xl group-hover:bg-[#FCD34D]/20 transition-all duration-500"></div>
          </a>
          <a 
            href="/darna" 
            className="group relative h-96 rounded-[2.5rem] bg-[#2A2B2E] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                    <HomeIcon className="w-7 h-7" />
                </div>
                <div className="bg-white/10 p-3 rounded-full text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRightIcon className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-medium text-white mb-3">Darna</h2>
                <p className="text-gray-400 text-lg">Property oversight, tenant management, and logistics.</p>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
          </a>

        </div>
      </main>
    </div>
  );
};

// --- Icons ---

const SettingsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
)
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const ArrowUpRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
)
const WalletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
)
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
)

export default Dashboard;