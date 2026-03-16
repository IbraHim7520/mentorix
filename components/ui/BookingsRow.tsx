"use client";

export interface IBooking {
  id: string;
  status: 'BOOKED' | 'CANCELLED' | 'COMPLETED';
  bookedAt: string;
  user: {
    name: string;
    email: string;
  };
  tutorSession: {
    title: string;
    sessionFee: number;
    date: string;
  };
  category: {
    title: string;
  };
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'BOOKED':
      return 'bg-blue-100 text-blue-700';
    case 'COMPLETED':
      return 'bg-green-100 text-green-700';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const BookingRow = ({ booking }: { booking: IBooking }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {/* User */}
      <td className="p-4">
        <div className="font-medium">{booking.user.name}</div>
        <div className="text-xs text-gray-500">{booking.user.email}</div>
      </td>

      {/* Session */}
      <td className="p-4">
        <div className="font-medium text-indigo-600">
          {booking.tutorSession.title}
        </div>
        <div className="text-xs text-gray-400">
          {booking.category.title}
        </div>
      </td>

      {/* Date */}
      <td className="p-4 text-gray-700">
        {new Date(booking.tutorSession.date).toLocaleDateString()}
      </td>

      {/* Fee */}
      <td className="p-4 font-semibold">
        ${booking.tutorSession.sessionFee}
      </td>

      {/* Status */}
      <td className="p-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
            booking.status
          )}`}
        >
          {booking.status}
        </span>
      </td>

      {/* Booked At */}
      <td className="p-4 text-xs text-gray-500">
        {new Date(booking.bookedAt).toLocaleString()}
      </td>
    </tr>
  );
};

export default BookingRow;