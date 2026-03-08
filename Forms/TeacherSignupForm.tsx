"use client";

import { Spinner } from "@/components/ui/spinner";
import { ISignupTutorForm } from "@/Interfaces/forms.interface";
import authClient from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const TeacherSignupForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<ISignupTutorForm>();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const watchImage = watch("image");

  // Live preview for uploaded profile image
  useEffect(() => {
    if (watchImage && (watchImage as unknown as FileList).length > 0) {
      const file = (watchImage as unknown as FileList)[0];
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
    const URLResponse = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API}`, {
      method: "POST",
      body: formData,
    });
    const data = await URLResponse.json();
    return data.secure_url || "";
  };

  const onSubmit = async (data: ISignupTutorForm) => {
    setLoading(true);
    try {
      if (data.password !== data.ConfirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }

      let imageURL = "";
      const fileList = data.image as unknown as FileList;
      if (fileList && fileList.length > 0) {
        imageURL = await uploadImageToCloudinary(fileList[0]);
      }

      const tutorSignupData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageURL,
        role: "TEACHER",
      };

      const signupResponse = await authClient.signUp.email(tutorSignupData);
      if (signupResponse.error || !signupResponse.data) {
        toast.error("Failed to signup! Please try again.");
        return;
      }

      const tutorProfileData = {
        userId: signupResponse.data.user.id,
        designation: data.designation,
        degree: data.degree,
        experience: data.experience,
        contact: data.contact,
        address: data.address,
      };

      const tutorProfileCreateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutors/tutor/create-tutor`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(tutorProfileData),
        }
      );

      const response = await tutorProfileCreateResponse.json();

      if (!response.success) {
        await authClient.deleteUser({ token: signupResponse.data.token as string });
        toast.error("Failed to create tutor profile. Signup rolled back.");
        return;
      }

      toast.success("Signup successful!");
      reset();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Name */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="johndoe"
            className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="name@example.com"
            className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1.5 relative">
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="••••••••"
            className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col space-y-1.5 relative">
          <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("ConfirmPassword", { required: true })}
            placeholder="••••••••"
            className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Designation, Degree, Experience ... same as before */}
        {/* ... */}
      </div>

      {/* Address & Contact omitted for brevity */}
      {/* Profile Image Upload with Preview */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">Profile Image <span className="text-slate-400 font-normal">(Optional)</span></label>
        <div className="relative group">
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="border-2 border-dashed border-slate-200 rounded-xl py-4 px-4 bg-slate-50/30 group-hover:bg-slate-50 group-hover:border-sky-200 transition-all flex items-center justify-center space-x-2">
            {preview ? (
              <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover shadow-sm" />
            ) : (
              <span className="text-sm text-slate-500">Upload photo</span>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-sky-600 flex justify-center items-center hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-600/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? <Spinner className="size-6" /> : "Create Account"}
      </button>
    </form>
  );
};

export default TeacherSignupForm;