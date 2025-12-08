import axios from 'axios';
import { User } from 'lucide-react';
import React, { useEffect } from 'react'

async function getUserData() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/v1/auth/info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.user;

    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}


const Picture = () => {
    useEffect(() => {
        async function fetchUserData() {
            const user = await getUserData();
            console.log(user);
        }
        fetchUserData();
    }, []);
    return (
        <div className="group relative rounded-[2.5rem] bg-[#2A2B2E] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl overflow-hidden text-white">
            <div className="relative">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-medium text-white">Profile Details</h2>
                        <p className="text-gray-400">Public information shared with your groups.</p>
                    </div>
                    <button className={`px-5 py-2.5 rounded-full transition-colors duration-300 font-medium text-sm bg-white/10 text-white hover:bg-white hover:text-black`}>
                            Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-2">Username</label>
                        <div className={`rounded-2xl px-6 py-4 flex items-center gap-3 transition-colors bg-transparent border border-white/5`}>
                            <UserIcon className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                defaultValue={"Username"}
                                disabled={true}
                                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 disabled:opacity-70"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-2">Email Address</label>
                        <div className={`rounded-2xl px-6 py-4 flex items-center gap-3 transition-colors bg-transparent border border-white/5`}>
                            <MailIcon className="w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                defaultValue={"email@example.com"}
                                disabled={true}
                                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 disabled:opacity-70"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-gray-400 text-sm ml-2">Bio</label>
                        <div className={`rounded-2xl px-6 py-4 flex items-start gap-3 transition-colors bg-transparent border border-white/5`}>
                            <FileTextIcon className="w-5 h-5 text-gray-400 mt-1" />
                            <textarea
                                rows="2"
                                defaultValue={"This is a short bio about the user."}
                                disabled={true}
                                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 disabled:opacity-70 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    )
}

const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
const FileTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
)

export default Picture;