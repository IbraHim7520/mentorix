"use client"
import { useEffect, useState } from 'react';
import SessionCard from '@/components/SessionCard';
import { ISessionFetchedData, IBookingData } from '@/Interfaces/data.interface';
import { UserSession } from '@/Utils/clientSideSession';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TopSession = () => {

  const { user } = UserSession();

  const [topSessions, setTopSessions] = useState<ISessionFetchedData[]>([]);
  const [userBookings, setUserBookings] = useState<IBookingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);

        const sessionRes = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/sessions/all`);
        const sessionResult = await sessionRes.json();

        setTopSessions((sessionResult.data || []).slice(0, 8));

        if (user?.id) {

          const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/bookings/booking/my/${user.id}`,{
            credentials:'include'
          });

          const bookingResult = await bookingRes.json();

          if(bookingResult.success){
            setUserBookings(bookingResult.data || []);
          }
        }

      } catch (error) {

        console.error("Error fetching data:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [user?.id]);

  return (
    <>
      {/* YOUR UI EXACTLY SAME */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">
                <Sparkles size={18} />
                <span>Top Rated Sessions</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Learn from the best tutors
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                  tailored to your needs
                </span>
              </h2>

            </div>

            <Link
              href="/sessions"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
            >
              View all sessions
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

          {loading ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
              ))}
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {topSessions.map((session) => {

                const isBooked = userBookings.some(
                  (booking) => booking.tutorSessionId === session.id
                );

                return (
                  <SessionCard
                    key={session.id}
                    data={session}
                    isBooked={isBooked}
                  />
                );

              })}

            </div>

          )}

        </div>
      </section>
    </>
  );
};

export default TopSession;