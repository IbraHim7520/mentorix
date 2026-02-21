"use client"


const TeacherSignupForm = () => {
    return (
        <form className="space-y-5">
            {/* Grid for compact layout on desktop */}
            <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Username */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                    <input 
                        type="text" 
                        placeholder="johndoe" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="name@example.com" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Designation - Selection */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Designation</label>
                    <select className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm appearance-none cursor-pointer">
                        <option value="">Select Designation</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="professor">Professor</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                {/* Last Degree */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Last Degree</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Masters in CS" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Experience - Selection */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Experience</label>
                    <select className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm appearance-none cursor-pointer">
                        {[...Array(11).keys()].map(i => (
                            <option key={i} value={i}>{i} {i === 1 ? 'Year' : 'Years'}</option>
                        ))}
                        <option value="10+">10+ Years</option>
                    </select>
                </div>

                {/* Contact */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Contact <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                        type="tel" 
                        placeholder="+1 234 567 890" 
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Address - Full Width */}
            <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                <textarea 
                    
                    placeholder="Enter your full address" 
                    className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm resize-none"
                ></textarea>
            </div>

            {/* Image Upload - Minimal Box */}
            <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Profile Image <span className="text-slate-400 font-normal">(Optional)</span></label>
                <div className="relative group">
                    <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-200 rounded-xl py-4 px-4 bg-slate-50/30 group-hover:bg-slate-50 group-hover:border-sky-200 transition-all flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-slate-500">Upload photo</span>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all active:scale-[0.98] mt-4"
            >
                Create Account
            </button>
        </form>
    );
};

export default TeacherSignupForm;