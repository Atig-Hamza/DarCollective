import axios from 'axios'
import React, { useEffect, useState } from 'react'


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

function Info() {
    const [user, setUser] = useState({
        username: 'Username',
        email: 'Not provided',
        bio: 'This is a short bio about the user.'
    });
    useEffect(() => {
        async function fetchUserData() {
            const user = await getUserData();
            if (user) setUser(user);
            if (!user.bio) user.bio = "Bio not provided";
            console.log(user);
        }
        fetchUserData();
    }, []);
    return (
        <div className="group relative rounded-[2.5rem] bg-white p-8 transition-all duration-500 hover:shadow-xl overflow-hidden border border-transparent hover:border-gray-200 text-center">
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gray-100 p-1 ring-4 ring-[#F0EFE9]">
                        <img src={user.avatar ? user.avatar : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="Avatar" className="w-full h-full rounded-full bg-gray-200 object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white uppercase">
                        {user.role}
                    </div>
                </div>
                <h2 className="text-3xl font-medium text-gray-900 mb-1">{user.username}</h2>
                <p className="text-gray-400 text-sm mb-6 max-w-[20ch] mx-auto">{user.bio}</p>
                <div className="grid grid-cols-3 gap-2 w-full mt-4">
                    <StatBox label="Groups" value={0} />
                    <StatBox label="Payments" value={0} />
                    <StatBox label="Tickets" value={0} />
                </div>
            </div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FCD34D]/20 rounded-full blur-3xl group-hover:bg-[#FCD34D]/30 transition-all duration-500"></div>
        </div>
    );
}

const StatBox = ({ label, value }) => (
    <div className="bg-[#F0EFE9] rounded-xl p-3 flex flex-col items-center">
        <span className="text-xl font-bold text-[#111]">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
    </div>
);

export default Info;