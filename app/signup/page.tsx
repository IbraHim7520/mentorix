"use client"

import StudentSignupForm from "@/Forms/StudentSignupForm";
import TeacherSignupForm from "@/Forms/TeacherSignupForm";
import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
  const [isStudent, setIsStudent] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-sky-50/50 px-4 py-10 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm mb-6 border border-sky-100">
            <div className="w-8 h-8 bg-sky-500 rounded-lg rotate-12" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Create an account
          </h1>

          <p className="text-slate-500 mt-2 mb-6 text-sm sm:text-base">
            Join thousands of users today.
          </p>

          {/* Toggle */}
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-slate-200/60 rounded-full border">
            
            <button
              onClick={() => setIsStudent(true)}
              className={`rounded-full py-2 px-6 text-sm font-medium transition
              ${isStudent ? "bg-white text-sky-600 shadow" : "text-slate-600"}`}
            >
              Register as Student
            </button>

            <button
              onClick={() => setIsStudent(false)}
              className={`rounded-full py-2 px-6 text-sm font-medium transition
              ${!isStudent ? "bg-white text-sky-600 shadow" : "text-slate-600"}`}
            >
              Register as Teacher
            </button>

          </div>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl border shadow-2xl shadow-sky-900/10 rounded-[2rem] p-5 sm:p-8 md:p-10">
          
          {/* Form area */}
          <div className="space-y-6">
            <div className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-4 sm:p-6 bg-slate-50/50">
              {isStudent ? (
                <StudentSignupForm></StudentSignupForm>
              ) : (
                <TeacherSignupForm />
              )}
            </div>
          </div>

          {/* Login link */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-slate-500">
              Already have an account?
              <Link
                href="/login"
                className="ml-1 text-sky-600 hover:text-sky-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase text-slate-400">
          <a href="#" className="hover:text-sky-600">Privacy</a>
          <a href="#" className="hover:text-sky-600">Terms</a>
          <a href="#" className="hover:text-sky-600">Help</a>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;