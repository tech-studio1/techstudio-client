import React from 'react';

interface RatingProps {
  rate: number;
}

const Rating: React.FC<RatingProps> = ({ rate }) => {
  // Ensure rate is a valid number between 0 and 5
  const validRate = Number.isFinite(rate) ? Math.max(0, Math.min(rate, 5)) : 0;

  const fullStars = Math.floor(validRate); // Full stars should always be a valid integer
  const hasHalfStar = validRate - fullStars > 0;

  // Ensure fullStars is a valid non-negative number
  let starArray = [];
  try {
    starArray = Array(fullStars).fill(null);
  } catch (error) {
    console.error('Error creating star array: ', error);
    starArray = [];
  }

  return (
    <div className="flex space-x-1">
      {/* Render full stars */}
      {starArray.map((_, i) => (
        <svg
          key={i}
          className="size-[14px] text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.245c.969 0 1.371 1.24.588 1.81l-3.437 2.49a1 1 0 00-.364 1.118l1.307 4.021c.3.922-.755 1.688-1.54 1.118l-3.436-2.49a1 1 0 00-1.175 0l-3.436 2.49c-.785.57-1.841-.196-1.54-1.118l1.307-4.021a1 1 0 00-.364-1.118L2.963 9.449c-.783-.57-.38-1.81.588-1.81h4.245a1 1 0 00.95-.69l1.307-4.022z" />
        </svg>
      ))}

      {/* Render half star if applicable */}
      {hasHalfStar && (
        <svg className="size-[124x] text-yellow-500" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop
                offset={`${(validRate - fullStars) * 100}%`}
                stopColor="currentColor"
              />
              <stop
                offset={`${(validRate - fullStars) * 100}%`}
                stopColor="transparent"
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.245c.969 0 1.371 1.24.588 1.81l-3.437 2.49a1 1 0 00-.364 1.118l1.307 4.021c.3.922-.755 1.688-1.54 1.118l-3.436-2.49a1 1 0 00-1.175 0l-3.436 2.49c-.785.57-1.841-.196-1.54-1.118l1.307-4.021a1 1 0 00-.364-1.118L2.963 9.449c-.783-.57-.38-1.81.588-1.81h4.245a1 1 0 00.95-.69l1.307-4.022z"
          />
        </svg>
      )}
    </div>
  );
};

export default Rating;
