
import { User, Mail, Calendar, BookOpen, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";

const StudentProfile = ({ student }: { student: any }) => {
  if (!student) return <p className="text-center py-10">No profile data found.</p>;

  // Data extraction
  const totalBookings = student.bookings?.length || 0;
  const totalReviews = student.reviews?.length || 0;
  const joinDate = new Date(student.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-indigo-50 overflow-hidden">
          {student.image ? (
            <Image src={student.image} alt={student.name} className="h-full w-full object-cover" />
          ) : (
            <User size={40} />
          )}
        </div>
        
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Mail size={14} /> {student.email}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Joined {joinDate}
            </span>
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">
              <ShieldCheck size={12} /> {student.role}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Stats Boxes (The two boxes you requested) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bookings Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalBookings}</h3>
          </div>
        </div>

        {/* Reviews Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
            <Star size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Reviews Written</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalReviews}</h3>
          </div>
        </div>
      </div>

      {/* 3. Placeholder for Activity */}
      <div className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
        <p className="text-gray-400">Booking history and review details will appear here.</p>
      </div>
    </div>
  );
};

export default StudentProfile;