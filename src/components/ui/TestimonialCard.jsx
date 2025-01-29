import React from "react";

const Star = ({ filled }) => (
  <span
    style={{
      color: filled ? "#F9943B" : "#ccc",
      fontSize: "20px",
      marginRight: "4px",
    }}
  >
    ★
  </span>
);

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return <Star key={`star-5-${index}`} filled={true} />;
        } else if (index === filledStars && hasHalfStar) {
          return (
            <Star
              key={`star-6-${index}`}
              filled={false}
              style={{ color: "#F9943B" }}
            />
          );
        } else {
          return <Star key={`star-7-${index}`} filled={false} />;
        }
      })}
    </div>
  );
};

export default function TestimonialCard({
  clientImage,
  clientName,
  clientRole,
  content,
  rating,
  date,
}) {
  return (
    <div className="bg-white w-full rounded-xl shadow-courses h-auto p-3">
      <div className="p-3 border-[2px] rounded-xl border-primary-orange">
        <div className="pt-0 flex items-center justify-start gap-2">
          <img
            src={clientImage}
            alt="profile"
            className="rounded-full h-12 w-12 border-[2px] border-primary-orange"
          />
          <div className="text-xs">
            <div className="font-semibold">{clientName}</div>
            <div className="text-xs ">{clientRole}</div>
          </div>
        </div>
        <div className="text-left">
          <StarRating rating={rating} />
        </div>
        <div className="text-xs feedback">{content}</div>
        <div className="text-xs text-gray-500 pt-4">{date}</div>
      </div>
    </div>
  );
}
