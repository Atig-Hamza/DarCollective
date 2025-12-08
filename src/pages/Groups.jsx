import React from 'react';
import SideBar from '../components/SideBare';
import GroupsOverview from '../components/GroupsOverview';

const Groups = ({ view }) => {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            <SideBar />
            <GroupsOverview initialView={view} />
        </div>
    );
};

export default Groups;
