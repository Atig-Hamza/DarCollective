import React, { useState } from 'react';
import {
    ChevronDown, Star, Clock, Settings, Plus, MessageCircle,
    ChevronUp, TextAlignStart, CircleUserRound, LogOut, UserCog
} from 'lucide-react';

const SidebarIcon = ({ icon, active = false, label }) => (
    <button
        className={`p-3 rounded-xl ${active ? 'bg-yellow-100 text-yellow-600' : 'text-gray-500 hover:bg-gray-100'}`}
        aria-label={label}
    >
        {icon}
    </button>
);

const NameTag = ({ name }) => (
    <span className="font-bold hover:text-yellow-600 cursor-pointer">{name}</span>
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
    className = "",
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
        <li className={nested ? "pl-4 border-l border-gray-200" : ""}>
            <a
                href={href}
                className={`flex items-center gap-2 py-1.5 ${active ? "text-yellow-500 border-l-2 pl-1 border-l-amber-400 font-medium" : "text-gray-500 hover:text-gray-900"} ${className}`}
                onClick={handleToggle}
                style={{ cursor: collapsible ? 'pointer' : 'default' }}
            >
                {icon && <span>{icon}</span>}
                <span>{label}</span>
                {badge && (
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded-full">{badge}</span>
                )}
                {collapsible && (
                    <span className="ml-auto">
                        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                )}
                {!collapsible && rightIcon && <span className="ml-auto">{rightIcon}</span>}
            </a>
            {collapsible && open && (
                <ul className="mt-2 space-y-1">
                    {children}
                </ul>
            )}
        </li>
    );
};

const NavSection = ({ title, icon, rightIcon, children }) => (
    <div className="mt-4">
        <p className="font-semibold py-1.5 flex justify-between items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
            {rightIcon && <span>{rightIcon}</span>}
        </p>
        <ul className="pl-2 border-l border-gray-200">{children}</ul>
    </div>
);

const NavContent = () => (
    <div>
        <ul>
            <NavItem icon={<Star className="w-4 h-4" />} label="Home" active />
            <NavItem icon={<Clock className="w-4 h-4" />} label="History" />
        </ul>
        <NavSection title="Groupes">
            <NavItem
                label="Access"
                collapsible
            >
                <NavItem label="My Groups" nested />
                <NavItem label="Join Groups" nested />
                <NavItem label="Invitations" nested />
                <NavItem label="Reliability" nested />
            </NavItem>
            <NavItem
                label="Manage"
                collapsible
            >
                <NavItem label="Create Group" nested />
                <NavItem label="My Created Groups" nested />
                <NavItem label="Members Turn" nested />
                <NavItem label="Reports" nested />
                <NavItem label="Group Settings" nested />
            </NavItem>
        </NavSection>
        <NavSection title="Reports">
            <NavItem
                label="Contact Support"
                collapsible
            >
                <NavItem label="Chat Support" nested />
                <NavItem label="Email Support" nested />
                <NavItem label="FAQ" nested />
            </NavItem>
        </NavSection>
    </div>
);

function SideBar() {
    return (
        <aside className="w-64 flex flex-col bg-white border-r border-gray-200 h-screen fixed">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center font-bold text-white text-sm">T</div>
                    <NameTag name="TireLire" />
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>
            <div className="flex flex-1 overflow-y-auto">
                <nav className="w-16 flex flex-col items-center gap-4 py-4 border-r border-gray-200">
                    <SidebarIcon icon={<TextAlignStart className="w-5 h-5" />} active label="Home" />
                    <SidebarIcon icon={<MessageCircle className="w-5 h-5" />} label="Messages" />
                    <SidebarIcon icon={<CircleUserRound className="w-5 h-5" />} label="Profile" />
                    <SidebarIcon icon={<UserCog className="w-5 h-5" />} label="Settings" />
                    <SidebarIcon icon={<LogOut className="w-5 h-5" />} label="Logout" />
                </nav>
                <nav className="flex-1 p-4 text-sm">
                    <NavContent />
                </nav>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-around">
                <button className="text-gray-500 hover:text-gray-900" aria-label="Settings">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </aside>
    );
}

export default SideBar;
