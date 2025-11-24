import React from 'react'

function TwoFA() {
    return (
        <div className="group relative rounded-[2.5rem] bg-white p-8 md:p-10 transition-all duration-500 hover:shadow-xl border border-transparent hover:border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors bg-gray-100 text-gray-500`}>
                        <LockIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-medium text-gray-900">Two-Factor Authentication</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Add an extra layer of security to your account.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div
                        className={`w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 bg-gray-200`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 translate-x-0`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)

export default TwoFA
