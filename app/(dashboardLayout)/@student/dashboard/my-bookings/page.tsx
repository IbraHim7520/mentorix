"use client"
import BookingRow from '@/components/BookingRow'
import { IBookingData } from '@/Interfaces/data.interface'
import { UserSession } from '@/Utils/clientSideSession'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const MyBookingsPage = () => {
    const { user } = UserSession()
    const [bookings, setBookings] = useState<IBookingData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!user?.id) {
            setIsLoading(false)
            return
        }

        const fetchMySessionInfo = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/booking/my/${user.id}`,
                    {
                        credentials: 'include',
                        method: 'GET',
                        cache: 'no-store'
                    }
                )

                const text = await res.text()
                let data: any = {}

                try {
                    data = JSON.parse(text)
                } catch {
                    data = {}
                }

                if (res.ok && data?.success && Array.isArray(data?.data)) {
                    setBookings(data.data)
                } else {
                    setBookings([])
                }
            } catch {
                setBookings([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchMySessionInfo()
    }, [user?.id])

    const handleCancel = async (bookingId: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, cancel it!"
        })

        if (!result.isConfirmed) return

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/booking-update/${bookingId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'CANCELED' }),
                    credentials: 'include'
                }
            )

            const text = await res.text()
            let data: any = {}

            try {
                data = JSON.parse(text)
            } catch {
                data = {}
            }

            if (res.ok && data?.success) {
                setBookings(prev =>
                    prev.map(b =>
                        b.id === bookingId ? { ...b, status: 'canceled' } : b
                    )
                )

                await Swal.fire("Canceled!", "Your booking has been canceled.", "success")
            } else {
                await Swal.fire("Error", data?.message || "Failed to update", "error")
            }
        } catch {
            await Swal.fire("Error", "Server connection failed", "error")
        }
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Delete Booking?",
            text: "This action cannot be undone!",
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Delete Permanently"
        })

        if (!result.isConfirmed) return

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/booking-delete/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            )

            const text = await res.text()
            let data: any = {}

            try {
                data = JSON.parse(text)
            } catch {
                data = {}
            }

            if (res.ok && data?.success) {
                setBookings(prev => prev.filter(booking => booking.id !== id))
                await Swal.fire("Deleted!", "Booking record removed.", "success")
            } else {
                await Swal.fire("Error", data?.message || "Delete failed", "error")
            }
        } catch {
            await Swal.fire("Error", "Server error", "error")
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">My Bookings</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow min-h-50">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Session</th>
                            <th className="p-4 font-semibold text-gray-700">Date</th>
                            <th className="p-4 font-semibold text-gray-700">Time Slot</th>
                            <th className="p-4 font-semibold text-gray-700">Booked At</th>
                            <th className="p-4 font-semibold text-gray-700">Status</th>
                            <th className="p-4 font-semibold text-gray-700 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="p-10 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-500 text-sm">Loading your sessions...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : bookings.length > 0 ? (
                            bookings.map(item => (
                                <BookingRow
                                    key={item.id}
                                    booking={item}
                                    onCancel={() => handleCancel(item.id)}
                                    onDelete={() => handleDelete(item.id)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-10 text-center text-gray-500 italic">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default MyBookingsPage