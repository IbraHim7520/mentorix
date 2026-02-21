import LoginForm from '@/Forms/LoginForm';
import Link from 'next/link';
import React from 'react';

// Import your LoginForm component here
// import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-sky-50/50 p-4 relative overflow-hidden">
      
      {/* Background soft blurs for consistency */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-sky-200/20 blur-3xl" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="w-full max-w-100">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-sky-100 mb-6">
             {/* Simple Logo Icon */}
            <div className="w-6 h-6 bg-sky-500 rounded-md" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl shadow-sky-900/5 rounded-[2rem] p-8 md:p-10">
          
          {/* YOUR LOGIN FORM COMPONENT GOES HERE */}
          <div className="space-y-6">
            <LoginForm/>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account? 
              <Link href="/signup" className="ml-1 text-sky-600 font-semibold hover:text-sky-700 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="mt-8 text-center">
           <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
             Forgot password?
           </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;