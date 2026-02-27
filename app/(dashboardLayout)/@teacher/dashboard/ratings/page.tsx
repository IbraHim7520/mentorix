import React from 'react';

const RatingsPage = () => {
  // Mock data structure based on your requirements
  // In a real scenario, you'd fetch this from your backend
  const reviews = [
    {
      id: "rev-1",
      sessionTitle: "Advanced React Patterns",
      createdDate: "2024-03-15",
      reviewerName: "Sarah Connor",
      reviewerEmail: "sarah.c@example.com",
      rating: 5,
      comment: "Excellent session! The explanation of Higher-Order Components was very clear."
    },
    {
      id: "rev-2",
      sessionTitle: "Intro to Prisma",
      createdDate: "2024-03-10",
      reviewerName: "John Doe",
      reviewerEmail: "j.doe@example.com",
      rating: 4,
      comment: "Good pace, but I wish we spent more time on migrations."
    }
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Reviews</h1>
          <p className="text-gray-500 mt-1">Manage and monitor feedback from your tutoring sessions.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <span className="text-blue-700 font-semibold text-sm">Average Rating: 4.8 / 5.0</span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Session & Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Reviewer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Feedback</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Session Info */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{rev.sessionTitle}</div>
                    <div className="text-xs text-gray-400 mt-1">Created: {rev.createdDate}</div>
                  </td>

                  {/* Reviewer Info */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-700">{rev.reviewerName}</div>
                    <div className="text-xs text-gray-400">{rev.reviewerEmail}</div>
                  </td>

                  {/* Rating Stars */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg ${i < rev.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm font-bold text-gray-600">{rev.rating}.0</span>
                    </div>
                  </td>

                  {/* Comment */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs italic">
                      "{rev.comment}"
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all text-sm font-medium"
                      onClick={() => console.log('Delete review', rev.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;