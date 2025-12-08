import React, { useState, useEffect } from 'react';
import { 
    Plus, Users, Settings, Trash2, UserPlus, X, ArrowLeft, 
    Edit2, Save, Search, Globe, Shield, MoreVertical, 
    Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';
import axios from 'axios';

const GroupsOverview = ({ initialView = 'list' }) => {
    const [groups, setGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [view, setView] = useState(initialView);
    const [activeTab, setActiveTab] = useState('my-groups'); 
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [newMemberId, setNewMemberId] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (initialView) {
            if (initialView === 'join') {
                setActiveTab('discover');
                setView('list');
            } else if (initialView === 'create') {
                setView('create');
            } else {
                setActiveTab('my-groups');
                setView('list');
            }
        }
    }, [initialView]);

    useEffect(() => {
        if (view === 'list') {
            if (activeTab === 'my-groups') {
                fetchMyGroups();
            } else {
                fetchAllGroups();
            }
        }
    }, [view, activeTab]);

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/v1/auth/info', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data && response.data.user) {
                setCurrentUser(response.data.user);
            }
        } catch (err) {
            console.error('Failed to fetch user info', err);
        }
    };

    const fetchMyGroups = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/v1/groups/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            if (Array.isArray(data)) {
                setGroups(data);
            } else if (data && Array.isArray(data.groups)) {
                setGroups(data.groups);
            } else {
                setGroups([]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load your groups');
            setLoading(false);
        }
    };

    const fetchAllGroups = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/v1/groups/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            if (Array.isArray(data)) {
                setAllGroups(data);
            } else if (data && Array.isArray(data.groups)) {
                setAllGroups(data.groups);
            } else {
                setAllGroups([]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load available groups');
            setLoading(false);
        }
    };

    const fetchGroupDetails = async (groupId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const groupRes = await axios.get(`http://localhost:5000/api/v1/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedGroup(groupRes.data);
            
            const membersRes = await axios.get(`http://localhost:5000/api/v1/groups/${groupId}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGroupMembers(Array.isArray(membersRes.data) ? membersRes.data : []);
            
            setView('detail');
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load group details');
            setLoading(false);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/v1/groups/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Group created successfully!');
            setFormData({ name: '', description: '' });
            setTimeout(() => {
                setSuccess('');
                setView('list');
                setActiveTab('my-groups');
                fetchMyGroups();
            }, 1500);
        } catch (err) {
            setError('Failed to create group');
            setLoading(false);
        }
    };

    const handleUpdateGroup = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/v1/groups/${selectedGroup._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Group updated successfully');
            fetchGroupDetails(selectedGroup._id);
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Failed to update group');
        }
    };

    const handleDeleteGroup = async () => {
        if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/v1/groups/${selectedGroup._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setView('list');
                fetchMyGroups();
            } catch (err) {
                setError('Failed to delete group');
            }
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/v1/groups/${selectedGroup._id}/members`, 
                { memberId: newMemberId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewMemberId('');
            setSuccess('Member added successfully');
            
            const membersRes = await axios.get(`http://localhost:5000/api/v1/groups/${selectedGroup._id}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGroupMembers(membersRes.data);
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Failed to add member. Please check the ID.');
        }
    };

    const isMember = (group) => {
        if (!currentUser || !group || !group.members) return false;
        return group.members.some(member => {
            const memberId = typeof member === 'string' ? member : member._id;
            return memberId === currentUser._id || memberId === currentUser.id;
        });
    };

    const handleJoinGroup = async (groupId) => {
        if (!currentUser) {
            setError('You must be logged in to join a group.');
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const memberId = currentUser._id || currentUser.id;
            
            if (!memberId) {
                throw new Error('User ID not found. Please try logging in again.');
            }

            await axios.post(`http://localhost:5000/api/v1/groups/${groupId}/members`, 
                { memberId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Successfully joined the group!');
            setTimeout(() => {
                setSuccess('');
                setActiveTab('my-groups'); 
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Failed to join group.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (window.confirm('Remove this member?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/v1/groups/${selectedGroup._id}/members/${memberId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const membersRes = await axios.get(`http://localhost:5000/api/v1/groups/${selectedGroup._id}/members`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setGroupMembers(membersRes.data);
            } catch (err) {
                setError('Failed to remove member');
            }
        }
    };

    return (
        <main className="flex-1 ml-[368px] p-8 min-h-screen bg-[#F8F9FA] font-sans">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Groups & Communities</h1>
                    <p className="text-slate-500 mt-1">Manage your tontines and connect with others.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    {view === 'list' && (
                        <button 
                            onClick={() => setView('create')}
                            className="flex items-center gap-2 bg-[#FCD34D] text-slate-900 px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-yellow-400 transition-all hover:shadow-md active:scale-95"
                        >
                            <Plus size={20} strokeWidth={2.5} />
                            <span>New Group</span>
                        </button>
                    )}
                    {view !== 'list' && (
                        <button 
                            onClick={() => {
                                setView('list');
                                setError('');
                                setSuccess('');
                            }}
                            className="flex items-center gap-2 bg-white text-slate-700 px-5 py-2.5 rounded-xl border border-slate-200 font-medium hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft size={20} />
                            <span>Back</span>
                        </button>
                    )}
                </div>
            </header>

            {(error || success) && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${error ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                    {error ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <span className="font-medium">{error || success}</span>
                    <button onClick={() => { setError(''); setSuccess(''); }} className="ml-auto p-1 hover:bg-black/5 rounded-full">
                        <X size={16} />
                    </button>
                </div>
            )}

            {view === 'list' && (
                <>
                    <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit mb-8 shadow-sm">
                        <button 
                            onClick={() => setActiveTab('my-groups')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'my-groups' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            My Groups
                        </button>
                        <button 
                            onClick={() => setActiveTab('discover')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'discover' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            Discover
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(activeTab === 'my-groups' ? groups : allGroups).map(group => (
                                <div key={group._id} className="group bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold ${activeTab === 'my-groups' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {group.name.charAt(0).toUpperCase()}
                                        </div>
                                        {activeTab === 'my-groups' && (
                                            <button 
                                                onClick={() => fetchGroupDetails(group._id)}
                                                className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                                            >
                                                <Settings size={20} />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{group.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1">{group.description || 'No description provided.'}</p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                            <Users size={14} />
                                            <span>{group.members ? group.members.length : 0} Members</span>
                                        </div>
                                        {activeTab === 'my-groups' || isMember(group) ? (
                                            <button 
                                                onClick={() => fetchGroupDetails(group._id)}
                                                className="text-sm font-bold text-slate-900 hover:text-yellow-600 transition-colors flex items-center gap-1"
                                            >
                                                {activeTab === 'my-groups' ? 'Manage' : 'View Group'}
                                                <ArrowLeft size={14} className="rotate-180" />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleJoinGroup(group._id)}
                                                className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                                            >
                                                Join Group
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {(activeTab === 'my-groups' ? groups : allGroups).length === 0 && (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Search size={32} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">No groups found</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">
                                        {activeTab === 'my-groups' 
                                            ? "You haven't joined any groups yet. Create one or discover existing communities." 
                                            : "There are no public groups available at the moment."}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {view === 'create' && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#FCD34D] rounded-2xl flex items-center justify-center text-slate-900">
                                <Plus size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Create New Group</h2>
                                <p className="text-slate-500 text-sm">Start a new tontine community</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateGroup} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Group Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#FCD34D] focus:outline-none transition-all font-medium"
                                    placeholder="e.g. Family Savings"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#FCD34D] focus:outline-none transition-all font-medium min-h-[120px] resize-none"
                                    placeholder="What is this group about?"
                                    required
                                />
                            </div>
                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Group</span>
                                            <ArrowLeft size={18} className="rotate-180" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {view === 'detail' && selectedGroup && (
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedGroup.name}</h2>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={16} />
                                                Created recently
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Globe size={16} />
                                                Public Group
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                setFormData({ name: selectedGroup.name, description: selectedGroup.description });
                                                // Simple toggle for edit mode could be added here
                                                alert('Edit mode enabled below');
                                            }}
                                            className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button 
                                            onClick={handleDeleteGroup}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
                                    {selectedGroup.description}
                                </p>

                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <div className="px-4 py-2 bg-slate-50 rounded-lg">
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Members</span>
                                        <span className="text-xl font-bold text-slate-900">{groupMembers.length}</span>
                                    </div>
                                    <div className="px-4 py-2 bg-slate-50 rounded-lg">
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                                        <span className="text-xl font-bold text-green-600 flex items-center gap-1">
                                            Active <CheckCircle2 size={16} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Members</h3>
                                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{groupMembers.length} Total</span>
                            </div>
                            
                            <div className="space-y-3">
                                {groupMembers.map((member, index) => (
                                    <div key={member._id || index} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 border border-slate-200 font-bold shadow-sm">
                                                {member.name ? member.name.charAt(0).toUpperCase() : <Users size={18} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{member.name || 'Unknown Member'}</p>
                                                <p className="text-xs text-slate-500 font-medium">{member.email || member._id}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveMember(member._id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Remove Member"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                                {groupMembers.length === 0 && (
                                    <div className="text-center py-8 text-slate-400">
                                        <Users size={32} className="mx-auto mb-2 opacity-50" />
                                        <p>No members in this group yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-200">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <UserPlus size={20} className="text-[#FCD34D]" />
                                Add Member
                            </h3>
                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Member ID / Email</label>
                                    <input 
                                        type="text" 
                                        value={newMemberId}
                                        onChange={(e) => setNewMemberId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-[#FCD34D] focus:outline-none transition-all placeholder:text-slate-600"
                                        placeholder="Enter ID or Email"
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full bg-[#FCD34D] text-slate-900 font-bold py-3 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
                                >
                                    Add to Group
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Group</h3>
                            <form onSubmit={handleUpdateGroup} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#FCD34D] focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Description</label>
                                    <textarea 
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#FCD34D] focus:outline-none transition-all h-24 resize-none"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full bg-white border-2 border-slate-100 text-slate-900 font-bold py-2 rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default GroupsOverview;
