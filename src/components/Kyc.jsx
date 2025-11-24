import React from 'react'

const Kyc = () => {
    return (
        <div className={`rounded-[2.5rem] p-8 transition-all duration-500 relative overflow-hidden bg-white border border-red-100`}>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">Identity Verification</h3>
                    <ShieldCheckIcon className={`w-6 h-6 text-gray-400`} />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-gray-500 text-sm">To access all features and remove limits, please verify your identity.</p>
                    <button
                        className="w-full py-3 rounded-xl bg-[#111] text-white font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
                        <span>Start KYC</span>
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
const ShieldCheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

export default Kyc;