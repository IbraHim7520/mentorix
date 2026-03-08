import React from 'react';
import { IBookingData } from '@/Interfaces/data.interface';

interface BookingRowProps {
    booking: IBookingData;
    onDelete: (id: string) => void;
    onCancel: (id: string) => void;
}

const BookingRow: React.FC<BookingRowProps> = ({ booking, onDelete, onCancel }) => {
    const { tutorSession, bookedAt } = booking;
    
    const formatDate = (isoString: string) => new Date(isoString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
    });

    const formatTime = (isoString: string) => new Date(isoString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Check if current date is before session date
    const sessionDate = new Date(tutorSession.date);
    const isUpcoming = sessionDate > new Date();
    const statusLabel = isUpcoming ? "Upcoming" : "Finished";

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors group">
            <td className="p-4">
                <p className="font-semibold text-gray-800">{tutorSession.title}</p>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">ID: {booking.id.slice(0, 8)}</span>
            </td>
            <td className="p-4 text-gray-600">{formatDate(tutorSession.date)}</td>
            <td className="p-4 text-gray-600 text-sm">
                <div className="bg-gray-100 px-2 py-1 rounded inline-block">
                    {formatTime(tutorSession.fromTime)} - {formatTime(tutorSession.toTime)}
                </div>
            </td>
            <td className="p-4 text-gray-500 text-xs">
                {new Date(bookedAt).toLocaleString()}
            </td>
            <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isUpcoming ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}>
                    {statusLabel}
                </span>
            </td>
            <td className="p-4 text-right">
                {isUpcoming ? (
                    <button 
                        onClick={() => onCancel(booking.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white text-sm font-medium transition-all"
                    >
                        Cancel
                    </button>
                ) : (
                    <button 
                        onClick={() => onDelete(booking.id)}
                        className="bg-gray-100 text-gray-500 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white text-sm font-medium transition-all"
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default BookingRow;