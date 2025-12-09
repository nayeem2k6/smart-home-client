
import { FaStar, FaCheckCircle, FaCalendarCheck, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DecoratorCard = ({ decorator }) => {
  const specialties = decorator.specialties || ['Home', 'Wedding', 'Office'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-lg border border-base-300"
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-2">
              <img
                src={decorator.photoURL || '/default-avatar.png'}
                alt={decorator.name}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="card-title text-lg font-bold">{decorator.name}</h3>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm text-gray-600">Verified Decorator</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="stats stats-vertical shadow">
            <div className="stat p-3">
              <div className="stat-title">Rating</div>
              <div className="stat-value flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                {decorator.rating || 4.8}
              </div>
            </div>
          </div>
          <div className="stats stats-vertical shadow">
            <div className="stat p-3">
              <div className="stat-title">Projects</div>
              <div className="stat-value">{decorator.completedProjects || 120}+</div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span
                key={index}
                className="badge badge-outline badge-primary"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Experience</span>
            <span className="font-bold">{decorator.experience || '5+'} years</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Hourly Rate</span>
            <span className="font-bold text-primary">৳{decorator.hourlyRate || 1500}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Availability</span>
            <span className={`badge ${decorator.isAvailable ? 'badge-success' : 'badge-error'}`}>
              {decorator.isAvailable ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>
        
        <div className="card-actions">
          <button className="btn btn-outline btn-primary btn-sm">
            View Portfolio
          </button>
          <button className="btn btn-primary btn-sm">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DecoratorCard;