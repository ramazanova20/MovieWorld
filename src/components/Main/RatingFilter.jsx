import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RatingFilter = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRating = (value) => {
    setRating(value);
    navigate(`/rated?rating=${value}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Reytinq seçin:</h3>
      <div className="flex">
        {[...Array(10)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              onClick={() => handleRating(starValue)}
              className="text-2xl mx-1 transition-colors duration-300"
              style={{ color: rating >= starValue ? "gold" : "gray" }}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
