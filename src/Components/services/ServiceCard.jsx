// import { Link } from "react-router";
// import { useState } from "react";

// const ServiceCard = ({ service, index }) => {

//   const { _id, title, cost, description, image, createdByEmail } = service;
//   const [isHovered, setIsHovered] = useState(false);



//   return (
//     <div
//       className="card bg-base-100 shadow-xl group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
//       style={{
//         animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
//         transform: isHovered ? "translateY(-8px)" : "translateY(0)",
//         transition: "all 0.3s ease-in-out",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Shine effect on hover */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10" />

//       {/* Image container with overlay */}
//       <figure className="relative overflow-hidden h-48 sm:h-56 md:h-60 lg:h-64">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         {/* Overlay on image */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//         {/* Price badge with animation */}
//         <div className="absolute top-4 right-4">
//           <span className="badge badge-primary font-bold text-white px-3 py-2 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
//             ${cost}
//           </span>
//         </div>
//       </figure>

//       <div className="card-body p-4 sm:p-5 md:p-6">
//         {/* Title with hover effect */}
//         <h2 className="card-title text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">
//           {title}
//         </h2>

//         {/* Description with gradient fade */}
//         <div className="relative mb-4">
//           <p className="text-sm sm:text-base text-gray-600 line-clamp-2 transition-all duration-300 group-hover:line-clamp-3">
//             {description}
//           </p>
//           <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-base-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         {/* Creator email with icon */}
//         <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//           <svg
//             className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//             />
//           </svg>
//           <span className="truncate">{createdByEmail}</span>
//         </div>

//         {/* Service Details Button with animation */}
//         <div className="card-actions mt-2">
//           <Link to={`/services/${_id}`} className="w-full">
//             <button className="btn btn-primary w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group-hover:shadow-lg">
//               <span className="flex items-center justify-center gap-2">
//                 <span>Service Details</span>
//                 <svg
//                   className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Add CSS animations to your global styles or Tailwind config */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .card {
//           animation-fill-mode: both;
//         }

//         @media (max-width: 640px) {
//           .card {
//             animation-duration: 0.4s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ServiceCard;



import { Link } from "react-router";
import { useState } from "react";

const ServiceCard = ({ service, index }) => {
  const { _id, title, cost, description, image, createdByEmail } = service;

  const [isHovered, setIsHovered] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div
      className="card bg-base-100 shadow-xl group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10" />

      {/* Image Section */}
      <figure className="relative overflow-hidden h-48 sm:h-56 md:h-60 lg:h-64">
        {/* Image Loader */}
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        <img
          src={image}
          alt={title}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imgLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 z-30">
          <span className="badge badge-primary font-bold text-white px-3 py-2 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            ${cost}
          </span>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-4 sm:p-5 md:p-6">
        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h2>

        <div className="relative mb-4">
          <p className="text-sm sm:text-base text-gray-600 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
            {description}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-base-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <svg
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="truncate">{createdByEmail}</span>
        </div>

        {/* Action Button */}
        <div className="card-actions mt-2">
          <Link to={`/services/${_id}`} className="w-full">
            <button className="btn btn-primary w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group-hover:shadow-lg">
              <span className="flex items-center justify-center gap-2">
                <span>Service Details</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card {
          animation-fill-mode: both;
        }

        @media (max-width: 640px) {
          .card {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;
