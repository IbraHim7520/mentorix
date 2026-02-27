import Link from "next/link";

const SessionRow = ({ session }: { session: any }) => {
    console.log(session)
  // Simple duration calculation (Minutes)
  const start = new Date(session.fromTime);
  const end = new Date(session.toTime);
  const durationMs = end.getTime() - start.getTime();
  const durationMinutes = Math.floor(durationMs / 60000);

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-900">{session.title}</p>
        <p className="text-xs text-gray-500 truncate max-w-50">{session.description}</p>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(session.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          {new Date(session.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {" - "}
          {new Date(session.toTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {durationMinutes} mins
      </td>
      <td className="px-6 py-4">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {session.category?.name || "Uncategorized"}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
           <Link href={`/dashboard/my-sessions/bookings/${session.id}`} title="View Bookings" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <span className="text-xs font-bold uppercase tracking-wider">Bookings</span>
          </Link>
          <button title="Update" className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          </button>
          <button title="Delete" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SessionRow;