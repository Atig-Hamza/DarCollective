import React from 'react';
import {
    Calendar, ChevronDown, Plus, MoreHorizontal, Users, DollarSign,
    Activity, Layers, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
    AreaChart, Area, XAxis, CartesianGrid, Tooltip
} from 'recharts';

const TirelireOverview = () => {
    const chartData = [
        { name: 'Week 1', value: 4000, secondary: 2400 },
        { name: 'Week 2', value: 3000, secondary: 1398 },
        { name: 'Week 3', value: 5000, secondary: 9800 },
        { name: 'Week 4', value: 2780, secondary: 3908 },
        { name: 'Week 5', value: 1890, secondary: 4800 },
        { name: 'Week 6', value: 2390, secondary: 3800 },
        { name: 'Week 7', value: 3490, secondary: 4300 },
    ];
    const pieData = [
        { value: 4000, color: '#EAB308' },
        { value: 3000, color: '#FACC15' },
        { value: 2000, color: '#FEF08A' },
        { value: 1000, color: '#F3F4F6' },
    ];

    return (
        <main className="flex-1 ml-[368px] p-8 min-h-screen bg-[#F8F9FA] font-sans">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <div className="flex gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                        <button className="px-4 py-1.5 rounded-full bg-[#FCD34D] text-slate-900 text-sm font-bold shadow-sm">Overview</button>
                        <button className="px-4 py-1.5 rounded-full text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">Tontines</button>
                        <button className="px-4 py-1.5 rounded-full text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">Reports</button>
                        <button className="px-4 py-1.5 rounded-full text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors">Customize</button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600 cursor-pointer hover:border-yellow-400 transition-colors group">
                        <Calendar size={16} className="text-slate-400 group-hover:text-yellow-600" />
                        <span>30 days: Oct 16 - Nov 14</span>
                        <ChevronDown size={14} className="text-slate-400 ml-2" />
                    </div>
                    <button className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                        <Plus size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6 mb-8">
                <div className="col-span-12 lg:col-span-3 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Summary</h3>
                        <MoreHorizontal size={20} className="text-slate-300 cursor-pointer" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-2xl mb-2 bg-blue-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-blue-600">
                                    <Users size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Joined Groups</span>
                            </div>
                            <span className="font-bold text-slate-900">1,552</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl mb-2 bg-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-purple-600">
                                    <DollarSign size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Total Pools</span>
                            </div>
                            <span className="font-bold text-slate-900">842</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl mb-2 bg-pink-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-pink-600">
                                    <Layers size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Active Tontines</span>
                            </div>
                            <span className="font-bold text-slate-900">128</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl mb-2 bg-yellow-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-yellow-600">
                                    <Activity size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Pending</span>
                            </div>
                            <span className="font-bold text-slate-900">15</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Top 5 Groups by Savings</h3>
                            <p className="text-slate-400 text-sm mt-1">Total score distribution</p>
                        </div>
                        <MoreHorizontal size={20} className="text-slate-300 cursor-pointer" />
                    </div>

                    <div className="flex-1 flex items-center justify-center relative mt-4">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="75%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={130}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center">
                            <p className="text-4xl font-extrabold text-slate-800">2,985</p>
                            <div className="bg-slate-100 px-3 py-1 rounded-full inline-block mt-2">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Score</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Highest Pool Value</h3>
                        <MoreHorizontal size={20} className="text-slate-300 cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-50 pb-2">
                            <span className="flex-1">Campaign</span>
                            <span className="w-16 text-right">Fund</span>
                            <span className="w-16 text-right">Goal</span>
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-pink-100 text-pink-600">S</div>
                                <span className="text-sm font-semibold text-slate-700 truncate">Summer Trip 24</span>
                            </div>
                            <div className="text-right w-16 text-sm text-slate-500">$1,250</div>
                            <div className="text-right w-16 text-sm font-bold text-green-600">+12%</div>
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-yellow-100 text-yellow-600">F</div>
                                <span className="text-sm font-semibold text-slate-700 truncate">Family Fund</span>
                            </div>
                            <div className="text-right w-16 text-sm text-slate-500">$850</div>
                            <div className="text-right w-16 text-sm font-bold text-green-600">+5%</div>
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-blue-100 text-blue-600">N</div>
                                <span className="text-sm font-semibold text-slate-700 truncate">New Car Fund</span>
                            </div>
                            <div className="text-right w-16 text-sm text-slate-500">$3,400</div>
                            <div className="text-right w-16 text-sm font-bold text-green-600">+22%</div>
                        </div>

                        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-purple-100 text-purple-600">W</div>
                                <span className="text-sm font-semibold text-slate-700 truncate">Wedding Gift</span>
                            </div>
                            <div className="text-right w-16 text-sm text-slate-500">$540</div>
                            <div className="text-right w-16 text-sm font-bold text-red-500">-2%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Orders Created</h3>
                        <MoreHorizontal size={20} className="text-slate-300" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold tracking-tight text-slate-800">$134,970</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">$128,451 prev.</span>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            <ArrowUpRight size={14} /> 12.98%
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-[20px] shadow-sm border border-slate-800 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-slate-400">Total Sales</h3>
                        <MoreHorizontal size={20} className="text-slate-600" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold tracking-tight text-white">$2,145,132</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">$2.1M prev.</span>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300">
                            <ArrowDownRight size={14} /> 4.98%
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-slate-500">PPC Sales</h3>
                        <MoreHorizontal size={20} className="text-slate-300" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold tracking-tight text-slate-800">$890.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">$872.00 prev.</span>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            <ArrowUpRight size={14} /> 0.17%
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-slate-500">Unit Sales</h3>
                        <MoreHorizontal size={20} className="text-slate-300" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold tracking-tight text-slate-800">$151,740</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">145,869 prev.</span>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            <ArrowUpRight size={14} /> 0.12%
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Costs Analysis</h3>
                            <p className="text-slate-400 text-sm">Aug 21 - Sep 21</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Costs
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Exps
                            </div>
                            <MoreHorizontal size={20} className="text-slate-300" />
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="secondary" stroke="#FCD34D" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">ACoS vs TACoS</h3>
                            <p className="text-slate-400 text-sm">Aug 21 - Sep 21</p>
                        </div>
                        <MoreHorizontal size={20} className="text-slate-300" />
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                <Line type="monotone" dataKey="secondary" stroke="#1e293b" strokeWidth={2} dot={{ r: 4, fill: '#1e293b' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TirelireOverview;