"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Loader2 } from "lucide-react";
import { UserSession } from "@/Utils/clientSideSession";

const ReviewPage = () => {
  const { user } = UserSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/ratings/my/${user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            cache: "no-store"
          }
        );

        const text = await res.text();
        let data: any = {};
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }

        if (res.ok && data?.success && Array.isArray(data?.data)) {
          setReviews(data.data);
        } else {
          setReviews([]);
        }
      } catch {
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [user?.id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">My Reviews</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Session</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Rating</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Comment</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-sm text-gray-500">Loading reviews...</p>
                  </div>
                </td>
              </tr>
            ) : reviews.length > 0 ? (
              reviews.map((review: any) => (
                <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">
                    {review.tutorSession?.title || "Untitled Session"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg w-fit">
                      <Star size={14} fill="currentColor" />
                      <span className="font-bold text-sm">{review.rating}</span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-600 italic text-sm">
                    "{review.comment}"
                  </td>

                  <td className="p-4 text-right text-xs text-gray-400">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare size={32} className="text-gray-200" />
                    <p>No reviews submitted yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;