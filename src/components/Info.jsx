import React from 'react'

const Info = () => {
    return (
        <div className="group relative rounded-[2.5rem] bg-white p-8 transition-all duration-500 hover:shadow-xl overflow-hidden border border-transparent hover:border-gray-200 text-center">
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gray-100 p-1 ring-4 ring-[#F0EFE9]">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full rounded-full bg-gray-200 object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white uppercase">
                        role
                    </div>
                </div>
                <h2 className="text-3xl font-medium text-gray-900 mb-1">username</h2>
                <p className="text-gray-400 text-sm mb-6 max-w-[20ch] mx-auto">bio</p>
                <div className="grid grid-cols-3 gap-2 w-full mt-4">
                    <StatBox label="Groups" value={2} />
                    <StatBox label="Payments" value={5} />
                    <StatBox label="Tickets" value={3} />
                </div>
            </div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FCD34D]/20 rounded-full blur-3xl group-hover:bg-[#FCD34D]/30 transition-all duration-500"></div>
        </div>
    )
}

const StatBox = ({ label, value }) => (
    <div className="bg-[#F0EFE9] rounded-xl p-3 flex flex-col items-center">
        <span className="text-xl font-bold text-[#111]">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
    </div>
);

export default Info;