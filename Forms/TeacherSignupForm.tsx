"use client"

import { Spinner } from "@/components/ui/spinner";
import { ISignupTutorForm } from "@/Interfaces/forms.interface";
import authClient from "@/lib/auth-client";
// import authClient from "@/lib/auth-client"; // Unused in this snippet
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TeacherSignupForm = () => {
    const { register, handleSubmit, reset } = useForm<ISignupTutorForm>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const uploadImageToCloudinary = async (imageFIle: File) => {
        const formData = new FormData();
        formData.append("image", imageFIle);
        formData.append('upload_preset', "tutora")
        const URLResponse = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API}`, {
            method: 'POST',
            body: formData,
        })
        const imageURL = await URLResponse.json();
        return imageURL.secure_url || '';
    }

    const onSubmit = async (data: ISignupTutorForm) => {
        setLoading(true);

        // 1. Password Validation
        if (data.password !== data.ConfirmPassword) {
            setLoading(false); // MUST set false before returning
            return toast.error("Passwords don't match!");
        }
        let imageURL: string = '';
        const fileList = data.image as unknown as FileList;
            
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                imageURL = await uploadImageToCloudinary(file);
        }
        const tutorSignupData = {
            name: data.name,
            email: data.email,
            password: data.password,
            image: imageURL,
            role: "TEACHER"
        }
        const signupResponse = await authClient.signUp.email(tutorSignupData);
        if (signupResponse.error || !signupResponse.data) {
            setLoading(false);
            reset();
            return toast.error("Failed to signup! Please try again.");
        }

        const tutorProfileData = {
            userId: signupResponse.data.user.id,
            designation: data.designation,
            degree: data.degree,
            experience: data.experience,
            contact: data.contact,
            address: data.address
        }

        const tutorProfileCreateResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutors/tutor/create-tutor`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(tutorProfileData)
        })

        const reponse = await tutorProfileCreateResponse.json();

        if (!reponse.success) {
            await authClient.deleteUser({
                token: signupResponse.data.token as string
            })
        }
        if (reponse.success && signupResponse.data) {
            setLoading(false);
            reset()
            router.push("/");
            toast.success("Signup successfull.")
        }



    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Username */}
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
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="••••••••"
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                    <input
                        type="password"
                        {...register("ConfirmPassword", { required: true })}
                        placeholder="••••••••"
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Designation */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Designation</label>
                    <select {...register("designation")} className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm appearance-none cursor-pointer">
                        <option value="">Select Designation</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>

                {/* Last Degree */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Last Degree</label>
                    <input
                        type="text"
                        {...register("degree")}
                        placeholder="e.g. Masters in CS"
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>

                {/* Experience */}
                <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Experience</label>
                    <select {...register("experience")} className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm appearance-none cursor-pointer">
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
                        {...register("contact")}
                        type="tel"
                        placeholder="+1 234 567 890"
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                <textarea
                    {...register("address")}
                    placeholder="Enter your full address"
                    className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm resize-none"
                ></textarea>
            </div>

            {/* Image Upload */}
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
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-slate-500">Upload photo</span>
                    </div>
                </div>
            </div>

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