"use client";

import { Spinner } from "@/components/ui/spinner";
import { IStudentSignupForm } from "@/Interfaces/forms.interface";
import authClient from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const StudentSignupForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<IStudentSignupForm>();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useRouter();

  const watchImage = watch("image");

  // Generate image preview when file changes
  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [watchImage]);

  const uploadImageToCloudinary = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("upload_preset", "tutora");
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API}`, {
      method: "POST",
      body: formData,
    });
    const data: { secure_url: string } = await response.json();
    return data.secure_url;
  };

  const onSubmit = async (data: IStudentSignupForm) => {
    setLoading(true);
    try {
      if (data.Password !== data.ConfirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      let imageURL = "";
      if (data.image && data.image.length > 0) {
        imageURL = await uploadImageToCloudinary(data.image[0]);
      }

      const signupResponse = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.Password,
        image: imageURL,
      });

      if (signupResponse.data?.token) {
        toast.success("Signup Successful!");
        reset();
        navigate.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to signup! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
      
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
        <input
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
        />
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 relative">
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <input
            {...register("Password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="space-y-1.5 relative">
          <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
          <input
            {...register("ConfirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Profile Picture Upload */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">
          Profile Picture <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative group">
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="border-2 border-dashed border-slate-200 rounded-2xl py-6 bg-slate-50/30 group-hover:bg-sky-50/50 group-hover:border-sky-200 transition-all flex flex-col items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover mb-2 shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                <svg
                  className="w-5 h-5 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            )}
            <span className="text-xs font-medium text-slate-500">
              {preview ? "Change Avatar" : "Click to upload avatar"}
            </span>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center text-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all active:scale-[0.99] mt-2"
      >
        {loading ? <Spinner className="size-6" /> : "Get Started"}
      </button>
    </form>
  );
};

export default StudentSignupForm;