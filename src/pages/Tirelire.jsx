import React from 'react';
import SideBar from '../components/SideBare';
import TirelireOverview from '../components/TirelireOverview';



const Tirelire = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            <SideBar />
            <TirelireOverview />
        </div>
    );
};

export default Tirelire