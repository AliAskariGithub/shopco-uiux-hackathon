import React from "react";
import { Star, CheckCircle } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date?: string;
}

const ReviewCard = ({ name, rating, review, date }: ReviewCardProps) => {
  return (
    <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center gap-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              rating >= star
                ? "fill-amber-400 text-amber-400"
                : "text-zinc-200 fill-zinc-100"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-base text-black">{name}</h4>
        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
      </div>
      <p className="text-sm text-zinc-600 leading-relaxed">&ldquo;{review}&rdquo;</p>
      {date && <p className="mt-2 text-xs text-zinc-400 font-medium">Posted on {date}</p>}
    </div>
  );
};

export default ReviewCard;
