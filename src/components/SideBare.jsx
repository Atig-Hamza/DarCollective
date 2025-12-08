import React, { useState } from 'react';
import {
    ChevronDown, Star, Clock, Settings, Plus, MessageCircle,
    ChevronUp, LayoutGrid, CircleUserRound, LogOut, UserCog,
    Wallet, CreditCard, Bell, Search, Zap, CheckCircle2,
    Users, FileText, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';


const SidebarIcon = ({ icon, active = false, label }) => (
    <div className="group relative flex justify-center w-full my-1">
        <Link 
            to={label === "Logout" ? `/dashboard` : `/${label.toLowerCase()}`}
            className={`
                p-3 rounded-2xl transition-all duration-300 ease-out flex items-center justify-center
                ${active 
                    ? 'bg-[#FCD34D] text-slate-900 shadow-md shadow-yellow-500/20' 
                    : 'text-slate-400 hover:bg-yellow-50 hover:text-yellow-700'
                }
            `}
            aria-label={label}
        >
            {React.cloneElement(icon, { size: 22, strokeWidth: active ? 2.5 : 2 })}
        </Link>
        
        <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-2 group-hover:translate-x-0">
            {label}
        </span>
    </div>
);

const NavItem = ({
    icon,
    label,
    href = "#",
    active = false,
    badge,
    children,
    nested = false,
    rightIcon,
    collapsible = false,
}) => {
    const [open, setOpen] = useState(false);

    const handleToggle = (e) => {
        if (collapsible) {
            e.preventDefault();
            setOpen((prev) => !prev);
        }
    };

    return (
        <li className="relative">
            {nested && <div className="absolute left-[-18px] top-0 bottom-0 w-px bg-slate-200"></div>}
            
            <a
                href={href}
                onClick={handleToggle}
                style={{ cursor: collapsible ? 'pointer' : 'default' }}
                className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative select-none
                    ${nested ? 'text-slate-500 my-0.5' : 'my-1'}
                    ${active 
                        ? 'bg-white text-slate-900 font-semibold shadow-sm ring-1 ring-slate-100' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }
                `}
            >
                {icon && (
                    <span className={`transition-colors duration-200 ${active ? 'text-yellow-600' : 'text-slate-400 group-hover:text-yellow-500'}`}>
                        {React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
                    </span>
                )}
                
                <span className="flex-1 truncate">{label}</span>
                
                {badge && (
                    <span className={`
                        text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                        ${active ? 'bg-[#FCD34D] text-slate-900' : 'bg-slate-100 text-slate-500 group-hover:bg-yellow-100'}
                    `}>
                        {badge}
                    </span>
                )}
                
                {collapsible && (
                    <span className={`transition-transform duration-300 text-slate-300 group-hover:text-slate-500 ${open ? 'rotate-180' : ''}`}>
                        <ChevronDown size={14} />
                    </span>
                )}
                
                {!collapsible && rightIcon && <span className="text-slate-300">{rightIcon}</span>}
            </a>

            <div 
                className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <ul className="overflow-hidden pl-7">
                    {children}
                </ul>
            </div>
        </li>
    );
};

const NavSection = ({ title, children }) => (
    <div className="mb-6">
        {title && (
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 mt-4 select-none">
                {title}
            </h3>
        )}
        <ul className="space-y-0.5">{children}</ul>
    </div>
);


function SideBar() {
    return (
        <aside className="flex h-screen fixed left-0 top-0 shadow-2xl shadow-slate-200/50 z-50 font-sans">
            <nav className="w-[80px] flex flex-col items-center py-6 bg-white border-r border-slate-100 z-20">
                <div className="mb-6">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#FCD34D] to-[#f59e0b] rounded-2xl flex items-center justify-center font-bold text-slate-900 text-xl shadow-lg shadow-yellow-500/25 cursor-pointer hover:scale-105 transition-transform">
                        T
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-2 w-full px-4">
                    <SidebarIcon icon={<LayoutGrid />} active label="Dashboard" />
                    <SidebarIcon icon={<MessageCircle />} label="Messages" />
                    <SidebarIcon icon={<Users />} label="Groups" />
                    <SidebarIcon icon={<CircleUserRound />} label="Profile" />
                </div>

                <div className="w-full px-4 flex flex-col gap-2">
                    <SidebarIcon icon={<UserCog />} label="Preferences" />
                    <SidebarIcon icon={<LogOut />} label="Logout" />
                </div>
            </nav>

            <div className="w-72 bg-[#FAFAFA] border-r border-slate-200 flex flex-col h-full">
                
                <div className="h-[80px] px-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex flex-col cursor-pointer group">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Workspace</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-lg group-hover:text-[#d97706] transition-colors">TireLire</span>
                            <div className="bg-slate-50 rounded-full p-0.5 group-hover:bg-yellow-100 transition-colors">
                                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-yellow-700" />
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">

                    <NavSection>
                        <NavItem icon={<Star />} label="Overview" active />
                        <NavItem icon={<Clock />} label="Recent Activity" />
                    </NavSection>

                    <NavSection title="Groupes & Tontines">
                        <NavItem 
                            label="Manage Groups" 
                            icon={<Settings />} 
                            collapsible
                        >
                            <NavItem label="My Groups" href="/groups" nested />
                            <NavItem label="Create Group" href="/groups/create" nested />
                        </NavItem>

                        <NavItem 
                            label="Discover" 
                            icon={<Wallet />} 
                            collapsible
                        >
                            <NavItem label="Join Groups" href="/groups/join" nested />
                        </NavItem>
                    </NavSection>

                    <NavSection title="Resources">
                        <NavItem 
                            label="Support" 
                            icon={<Shield />} 
                            collapsible
                        >
                            <NavItem label="Live Chat" nested />
                            <NavItem label="Email Us" nested />
                            <NavItem label="FAQ" nested />
                        </NavItem>
                    </NavSection>

                    <div className="mt-8 p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FCD34D] rounded-full blur-3xl opacity-20 -mr-6 -mt-6"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={16} className="text-[#FCD34D] fill-[#FCD34D]" />
                                <span className="font-bold text-xs uppercase tracking-wider text-slate-300">Pro Plan</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-3">Unlock advanced analytics and priority support.</p>
                            <div className="w-full h-1 bg-slate-700 rounded-full mb-3">
                                <div className="w-3/4 h-full bg-[#FCD34D] rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-slate-500">75% of limit used</p>
                        </div>
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
                                alt="User" 
                                className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:border-yellow-300 transition-colors"
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">Lora Piterson</p>
                            <p className="text-xs text-slate-400 truncate">Pro Member</p>
                        </div>
                        <Settings className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;