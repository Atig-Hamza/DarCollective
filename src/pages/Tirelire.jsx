import React from 'react';
import SideBar from '../components/SideBare';

import { 
    ChevronDown, Search, Star, Clock, BarChart2, Folder, FileText, Bot, 
    Link, Settings, UserCircle, Plus, Bell, MessageCircle, SlidersHorizontal, List, 
    BarChart, ArrowUpRight, ArrowDownRight, Download, Upload, ThumbsUp, Flame, 
    MoreHorizontal, MoveRight, ChevronUp 
} from 'lucide-react';

const DashboardCard = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
        {children}
    </div>
);

const UserAvatar = ({ src, alt, color, initial, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
    };
    if (src) {
        return <img src={src} alt={alt} className={`${sizeClasses[size]} rounded-full object-cover`} />;
    }
    return (
        <div className={`flex items-center justify-center rounded-full font-bold text-white ${sizeClasses[size]} ${color}`}>
            {initial}
        </div>
    );
};

const SalesStatCard = ({ title, value, trend, trendType, selected = false, className = '' }) => (
    <DashboardCard className={`relative ${selected ? 'ring-2 ring-pink-500' : ''} ${className}`}>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-xl font-bold my-1">{value}</p>
        <div className={`flex items-center text-xs ${trendType === 'up' ? 'text-green-500' : 'text-gray-400'}`}>
            {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            <span>{trend}</span>
        </div>
    </DashboardCard>
);


const Tirelire = () => {
    const salesData = [
        { name: 'Armin A.', revenue: '$209,633', leads: { new: 41, total: 118 }, kpi: '0.84', wl: { rate: '31%', win: 12, lose: 29 }, avatarSrc: 'https://i.pravatar.cc/32?img=1' },
        { name: 'Mikasa A.', revenue: '$156,841', leads: { new: 54, total: 103 }, kpi: '0.89', wl: { rate: '39%', win: 21, lose: 33 }, avatarSrc: 'https://i.pravatar.cc/32?img=2', active: true },
        { name: 'Eren Y.', revenue: '$117,115', leads: { new: 22, total: 84 }, kpi: '0.79', wl: { rate: '32%', win: 7, lose: 15 }, avatarSrc: 'https://i.pravatar.cc/32?img=3' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            
        </div>
    );
};

export default Tirelire