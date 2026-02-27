"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicBookingsPage = () => {
  const params = useParams();
  const sessionId = params.id;
  const [bookingdata, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookingsData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/${sessionId}`);
        const bookings = await res.json();

        if (bookings.success) {
          setAllBookings(bookings.data);
        } else {
          setAllBookings([]);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (sessionId) fetchBookingsData();
  }, [sessionId]);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Session Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Managing attendees for Session ID: <span className="font-mono text-blue-600">{sessionId}</span>
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Session Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Booked By</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              // Skeleton/Loading State
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                    <p>Loading attendees...</p>
                  </div>
                </td>
              </tr>
            ) : bookingdata.length > 0 ? (
              bookingdata.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking.session?.title || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                      {booking.session?.category?.name || "General"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700">
                        {booking.user?.name || "Anonymous Student"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {booking.user?.email || "No email provided"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      onClick={() => alert(`Cancel booking for ${booking.id}?`)}
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Empty State
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <p className="text-gray-400 font-medium">No bookings found for this session yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicBookingsPage;