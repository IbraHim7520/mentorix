import SessionRow from "@/components/SessionRow";
import { cookies } from "next/headers";
import Link from "next/link";

const MySessionPage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const sessionsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/tutoring-sessions/tutor-sessions`,
    {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }
  );

  const { data } = await sessionsResponse.json();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Tutoring Sessions</h1>
          <p className="text-gray-500">Manage your scheduled sessions and view upcoming bookings.</p>
        </div>
        <Link href={"/dashboard/create-sessions"} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + New Session
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Session Info</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Schedule</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Duration</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.length > 0 ? (
              data.map((session: any) => (
                <SessionRow key={session.id} session={session} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                  No sessions found. Create your first session to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySessionPage;