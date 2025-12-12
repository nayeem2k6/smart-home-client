// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Context/AuthContext";

// export default function ServiceDetails() {
//   const { id } = useParams();
//   const { user,} = useContext(AuthContext);
//   const [open, setOpen] = useState(false);
//   const { data: service , isLoading, isError } = useQuery({
//     queryKey: ["service", id],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/services/${id}`);
//     return (res.data.result)
    
//     },
//   });
//  if(isLoading) return <div>loading...</div>

//  if(isError) return <div>error...</div>
//   return (
//     <div className="p-5 max-w-5xl mx-auto">
//       <img src={service.image} className="rounded-xl mb-5" />
//       <h1 className="text-3xl font-bold">{service.title}</h1>
//       <p>{service.description}</p>
//       <p className="text-xl font-semibold">Price: ৳ {service.price}</p>

//       <button
//         className="btn btn-primary mt-5"
//         disabled={!user}
//         onClick={() => setOpen(true)}
//       >
//         {user ? "Book Now" : "Login to Book"}
//       </button>

//       {open && <BookingModal service={service} setOpen={setOpen} user={user} />}
//     </div>
//   );
// }


// function BookingModal({ service, setOpen, user }) {
//   const [date, setDate] = useState("");
//   const [location, setLocation] = useState("");

//   const handleBooking = async () => {
//     await axios.post("http://localhost:3000/bookings", {
//       userEmail: user.email,
//       userName: user.displayName,
//       serviceId: service._id,
//       serviceName: service.name,
//       date,
//       location,
//       price: service.price
//     });
//     alert("Booking Successful!");
//     setOpen(false);
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//         <h2 className="text-xl font-bold mb-2">Book: {service.name}</h2>
//         <p>User: {user.displayName}</p>
//         <p>Email: {user.email}</p>
//         <input type="date" className="input input-bordered w-full mt-2" onChange={e=>setDate(e.target.value)} />
//         <input type="text" className="input input-bordered w-full mt-2" placeholder="Location" onChange={e=>setLocation(e.target.value)} />
//         <button className="btn btn-primary mt-4 w-full" onClick={handleBooking}>Confirm Booking</button>
//         <button className="btn btn-error mt-2 w-full" onClick={()=>setOpen(false)}>Cancel</button>
//       </div>
//     </div>
//   )
// }





import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaStar, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaCheckCircle, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const { data: service, isLoading, isError } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/services/${id}`);
      return res.data.result;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading service details...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
        <div className="text-red-500 text-5xl mb-4">
          <FaExclamationTriangle className="mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">Unable to load service details. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><span className="mx-2">›</span></li>
            <li><a href="/services" className="hover:text-blue-600 transition">Services</a></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-gray-900 font-medium truncate">{service.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            {/* Service Image */}
            <div className="lg:w-1/2 relative">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-64 lg:h-full object-cover"
              />
              {service.isPopular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Popular
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {service.category || "Service"}
                  </span>
                  <div className="flex items-center text-amber-500">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-gray-300" />
                    <span className="ml-2 text-gray-600 text-sm">(4.8)</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FaCheckCircle className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">2-4 Hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-semibold">Daily</p>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Starting from</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">৳ {service.price}</span>
                      <span className="text-gray-500 ml-2">/ service</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 line-through">৳ {service.price * 1.2}</p>
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                      SAVE 20%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${user 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!user}
                onClick={() => setOpen(true)}
              >
                {user ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FaCalendarAlt />
                    <span>Book Now</span>
                  </div>
                ) : (
                  "Login to Book Service"
                )}
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Verified Provider</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Free Cancellation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
            <ul className="space-y-4">
              {['Professional Service', 'Quality Materials', 'On-time Completion', 'Clean-up Service', 'Warranty Included'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaStar className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Professionals</h4>
                  <p className="text-gray-600 text-sm">Certified and experienced service providers</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-xl">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaTag className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Best Price Guarantee</h4>
                  <p className="text-gray-600 text-sm">Found a lower price? We'll match it!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <BookingModal service={service} setOpen={setOpen} user={user} />}
    </div>
  );
}

function BookingModal({ service, setOpen, user }) {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async () => {
    if (!date || !location) {
      toast.success("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3000/bookings", {
        userEmail: user.email,
        userName: user.displayName,
        serviceId: service._id,
        serviceName: service.title,
        date,
        location,
        price: service.price
      });
       toast.success(`Booking Successful for ${service.title}!`)
     
      setOpen(false);
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full mx-auto overflow-hidden shadow-2xl animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book {service.title}</h2>
              <p className="text-blue-100">Complete your booking details</p>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 transition text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{user.displayName}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {/* Date Input */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Select Date
              </label>
              <input 
                type="date" 
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Service Location
              </label>
              <input 
                type="text" 
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                placeholder="Enter your address"
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Service Price</span>
                <span className="font-bold text-gray-900">৳ {service.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">৳ {service.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex space-x-4">
            <button 
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center"
              onClick={handleBooking}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
          
          {/* Security Note */}
          <p className="text-center text-gray-500 text-sm mt-4">
            🔒 Your booking is secure and protected
          </p>
        </div>
      </div>
    </div>
  );
}

// Add these styles to your global CSS or create a separate CSS file
  `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;