
// import { FaStar, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const ServiceCard = ({ service }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -5 }}
//       className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
//     >
//       <figure className="h-48 overflow-hidden">
//         <img
//           src={service.images || '/default-service.jpg'}
//           alt={service.service_name}
//           className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute top-4 right-4">
//           <span className="badge badge-accent badge-lg font-bold">
//             ৳{service.cost.toLocaleString()}
//           </span>
//         </div>
//       </figure>
      
//       <div className="card-body p-6">
//         <div className="flex justify-between items-start mb-3">
//           <div>
//             <h3 className="card-title text-xl font-bold line-clamp-1">
//               {service.service_name}
//             </h3>
//             <div className="badge badge-primary badge-outline mt-1">
//               {service.category}
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             <FaStar className="text-yellow-500" />
//             <span className="font-bold">{service.rating || 4.5}</span>
//           </div>
//         </div>
        
//         <p className="text-gray-600 line-clamp-2 mb-4">
//           {service.description}
//         </p>
        
//         <div className="space-y-2 mb-6">
//           <div className="flex items-center gap-2 text-sm">
//             <FaCalendarAlt className="text-primary" />
//             <span>Duration: {service.duration}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <FaMapMarkerAlt className="text-primary" />
//             <span>Unit: {service.unit}</span>
//           </div>
//           {service.features && (
//             <div className="flex items-center gap-2 text-sm">
//               <FaUsers className="text-primary" />
//               <span>{service.features.length} features included</span>
//             </div>
//           )}
//         </div>
        
//         <div className="card-actions">
//           <Link
//             to={`/services/${service._id}`}
//             className="btn btn-primary btn-block"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ServiceCard;

const ServiceCard = ({ service }) => {
  const { title, price, duration, description, image } = service;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} className="w-full h-60 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p className="font-semibold">Price: ${price}</p>
        <p className="font-medium">Duration: {duration}</p>
      </div>
        
      
    </div>
  );
};

export default ServiceCard;