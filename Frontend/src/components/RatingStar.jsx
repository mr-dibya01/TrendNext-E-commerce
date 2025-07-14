import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// rate=3.6  count=146
function RatingStars({ rate, count }) {
  const fullStars = Math.floor(rate);//3
  const hasHalfStar = rate - fullStars >= 0.5;// (3.6 - 3) = .6 >= 0.5  (true)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 5 - 3 - ( 1 )=1
  
  return (
    <div className="flex items-center gap-1 text-orange-600 text-sm bg mt-2">
      {/* Full stars */}{rate}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      
      {/* Half star */}
      {hasHalfStar && <FaStarHalfAlt />}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
      
      {/* Count */}
      <span className="text-gray-600 ml-2">({count} reviews)</span>
    </div>
  );
}

export default RatingStars;