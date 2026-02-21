"use client"
import React from 'react';

const StudentSignupForm = () => {
    return (
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                />
            </div>

            {/* Password Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Image Upload Option */}
            <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Profile Picture <span className="text-slate-400 font-normal">(Optional)</span></label>
                <div className="relative group">
                    <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl py-6 bg-slate-50/30 group-hover:bg-sky-50/50 group-hover:border-sky-200 transition-all flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Click to upload avatar</span>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all active:scale-[0.99] mt-2"
            >
                Get Started
            </button>
        </form>
    );
};

export default StudentSignupForm;