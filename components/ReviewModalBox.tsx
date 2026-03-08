"use client"
import { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';
import { Felipa } from 'next/font/google';
import { toast } from 'sonner';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    sessionTitle: string;
    onSubmit: (rating: number, comment: string) => Promise<void>;
    userId:string ,
    sessionId:string  // Changed to Promise
}

const ReviewModal = ({ isOpen, onClose, sessionTitle , userId, sessionId}: ReviewModalProps) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;


    const handleConfirmSubmit = async () => {
        if (rating === 0 || !comment.trim()) return;
        setIsSubmitting(true);
        try {
            const reviewData = {
                rating: rating,
                comment: comment,
                tutorSessionId: sessionId,
                userId: userId 
            }

            const submitRes = await fetch(`${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/ratings/review/create`,{
                credentials: 'include',
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify(reviewData)
            })

            const result = await submitRes.json();
            if(result.success){
            setRating(0);
            setComment("");
            toast.success(result.message || "Review Submitted.");
            
            }
          
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-lg font-bold text-gray-900">Leave a Review</h3>
                    <button 
                        onClick={onClose} 
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4">
                        How was your session for <span className="font-semibold text-indigo-600">"{sessionTitle}"</span>?
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="transition-transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed"
                            >
                                <Star
                                    size={32}
                                    fill={(hover || rating) >= star ? "#F59E0B" : "transparent"}
                                    color={(hover || rating) >= star ? "#F59E0B" : "#D1D5DB"}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Comment Input */}
                    <textarea
                        rows={4}
                        placeholder="Write your meaningful comment here..."
                        value={comment}
                        disabled={isSubmitting}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all disabled:bg-gray-50 disabled:text-gray-400"
                    />
                </div>

                <div className="flex items-center gap-3 p-6 bg-gray-50 border-t">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={rating === 0 || !comment.trim() || isSubmitting}
                        onClick={handleConfirmSubmit}
                        className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Review"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;