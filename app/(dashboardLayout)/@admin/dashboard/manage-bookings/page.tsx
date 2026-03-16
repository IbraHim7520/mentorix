"use client";

import { useEffect, useState } from "react";
import BookingRow, { IBooking } from "@/components/ui/BookingsRow";

const BookingManagePage = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/all-bookings`,
          {
            method: "GET",
            credentials: "include", // 🔥 important for cookies
          }
        );

        const { data } = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Bookings</h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Session</th>
              <th className="p-4">Date</th>
              <th className="p-4">Fee</th>
              <th className="p-4">Status</th>
              <th className="p-4">Booked At</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagePage;