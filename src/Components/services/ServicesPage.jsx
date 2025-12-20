// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import {
//   FaSearch,
//   FaFilter,
//   FaDollarSign,
//   FaArrowRight,
//   FaStar,
// } from "react-icons/fa";
// import LoadingSpiner from "../LoadingSpiner";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// export default function ServicesPage() {
//   const axiosSecure = useAxiosSecure();

//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("");
//   const [min, setMin] = useState("");
//   const [max, setMax] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const {
//     data: services = [],
//     isLoading,
//     isFetching,
//     refetch,
//   } = useQuery({
//     queryKey: ["services", searchQuery, type, min, max],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/services", {
//         params: {
//           search: searchQuery,
//           type,
//           min,
//           max,
//         },
//       });
//       return res.data;
//     },
//     keepPreviousData: true,
//     enabled: false,
//   });

//   const resetFilters = () => {
//     setSearch("");
//     setType("");
//     setMin("");
//     setMax("");
//     setSearchQuery("");
//     refetch();
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchQuery(search);
//     refetch();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(e);
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpiner />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-14">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Find Your Perfect Decoration Service
//           </h1>
//           <p className="text-lg opacity-90">
//             Discover professional decoration services for any event
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Filter Services</h2>
//             <button
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="md:hidden btn btn-outline"
//             >
//               <FaFilter className="mr-2" /> Filters
//             </button>
//           </div>

//           <div className="hidden md:grid grid-cols-12 gap-4">
//             <div className="col-span-3 relative">
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 className="input input-bordered w-full pl-10"
//                 placeholder="Search services..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={handleKeyPress}
//               />
//             </div>

//             <div className="col-span-2">
//               <select
//                 className="select select-bordered w-full"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">All Types</option>
//                 <option value="wedding">Wedding</option>
//                 <option value="birthday">Birthday</option>
//                 <option value="corporate">Corporate</option>
//               </select>
//             </div>

//             <div className="col-span-2 relative">
//               <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="number"
//                 className="input input-bordered w-full pl-10"
//                 placeholder="Min"
//                 value={min}
//                 onChange={(e) => setMin(e.target.value)}
//               />
//             </div>

//             <div className="col-span-2 relative">
//               <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="number"
//                 className="input input-bordered w-full pl-10"
//                 placeholder="Max"
//                 value={max}
//                 onChange={(e) => setMax(e.target.value)}
//               />
//             </div>

//             <div className="col-span-3 flex gap-2">
//               <button
//                 onClick={handleSearch}
//                 className="btn btn-primary flex-1"
//               >
//                 Search
//               </button>
//               <button
//                 type="button"
//                 onClick={resetFilters}
//                 className="btn btn-outline flex-1"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>

//           {isFilterOpen && (
//             <div className="md:hidden space-y-4 mt-4">
//               <input
//                 className="input input-bordered w-full"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={handleKeyPress}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="btn btn-primary w-full"
//               >
//                 Search
//               </button>
//               <select
//                 className="select select-bordered w-full"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">All Types</option>
//                 <option value="wedding">Wedding</option>
//                 <option value="birthday">Birthday</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {isFetching && (
//           <div className="flex justify-center py-6">
//             <LoadingSpiner />
//           </div>
//         )}

//         {services.length === 0 ? (
//           <div className="text-center py-20">
//             <h3 className="text-2xl font-semibold mb-3">No Services Found</h3>
//             <button onClick={resetFilters} className="btn btn-primary">
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service) => (
//               <div
//                 key={service._id}
//                 className="card bg-white shadow-md hover:shadow-xl transition"
//               >
//                 <figure className="h-48">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </figure>

//                 <div className="card-body">
//                   <h2 className="font-bold text-lg">{service.title}</h2>
//                   <p className="text-sm text-gray-600 line-clamp-2">
//                     {service.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-3">
//                     <span className="font-bold text-green-600">
//                       ${service.cost}
//                     </span>
//                     {service.rating && (
//                       <span className="flex items-center text-yellow-500">
//                         <FaStar className="mr-1" /> {service.rating}
//                       </span>
//                     )}
//                   </div>

//                   <Link to={`/services/${service._id}`}>
//                     <button className="btn btn-primary w-full mt-4">
//                       View Details <FaArrowRight className="ml-2" />
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaDollarSign,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import LoadingSpiner from "../LoadingSpiner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ServicesPage() {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔹 normalize search (lowercase + trim)
  const normalizedSearch = search.trim().toLowerCase();

  const {
    data: services = [],
  
    isFetching,
  } = useQuery({
    queryKey: ["services", normalizedSearch, type, min, max],
    queryFn: async () => {
      const res = await axiosSecure.get("/services", {
        params: {
          search: normalizedSearch,
          type,
          min,
          max,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const resetFilters = () => {
    setSearch("");
    setType("");
    setMin("");
    setMax("");
  };

  // 🔹 Client-side safety filter (extra reliable)
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const titleMatch = service.title
        ?.toLowerCase()
        .includes(normalizedSearch);

      const typeMatch = type ? service.type === type : true;
      const minMatch = min ? service.cost >= Number(min) : true;
      const maxMatch = max ? service.cost <= Number(max) : true;

      return titleMatch && typeMatch && minMatch && maxMatch;
    });
  }, [services, normalizedSearch, type, min, max]);

  // if (isLoading) {
  //   return <LoadingSpiner />;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Decoration Service
          </h1>
          <p className="text-lg opacity-90">
            Discover professional decoration services for any event
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Filter Services</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn btn-outline"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>

          <div className="hidden md:grid grid-cols-12 gap-4">
            <div className="col-span-3 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="input input-bordered w-full pl-10"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <select
                className="select select-bordered w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            <div className="col-span-2 relative">
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                className="input input-bordered w-full pl-10"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </div>

            <div className="col-span-2 relative">
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                className="input input-bordered w-full pl-10"
                placeholder="Max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>

            <div className="col-span-3 flex gap-2">
              <button onClick={resetFilters} className="btn btn-outline flex-1">
                Reset
              </button>
            </div>
          </div>
        </div>

        {isFetching && (
          <div className="flex justify-center py-6">
            <LoadingSpiner />
          </div>
        )}

        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-3">
              No Services Found
            </h3>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="card bg-white shadow-md hover:shadow-xl transition"
              >
                <figure className="h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="font-bold text-lg">{service.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-green-600">
                      ${service.cost}
                    </span>
                    {service.rating && (
                      <span className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" /> {service.rating}
                      </span>
                    )}
                  </div>

                  <Link to={`/services/${service._id}`}>
                    <button className="btn btn-primary w-full mt-4">
                      View Details <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
