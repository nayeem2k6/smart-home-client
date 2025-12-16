

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaDollarSign, FaCalendarAlt, FaArrowRight, FaStar, FaClock } from "react-icons/fa";
import LoadingSpiner from "../LoadingSpiner";

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Auto-refetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, type, min, max]);

  // Fetch Services
  const { data: services = [], refetch, isLoading } = useQuery({
    queryKey: ["services", search, type, min, max],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/services", {
        params: { search, type, min, max },
      });
      return res.data;
    },
  });

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setType("");
    setMin("");
    setMax("");
  };
if(isLoading) return <LoadingSpiner></LoadingSpiner>
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Decoration Service</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Discover professional decoration services for weddings, birthdays, corporate events and more
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Filter Services</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn btn-outline btn-primary"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search services..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <select
                className="select select-bordered w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="festival">Festival</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min Budget"
                  className="input input-bordered w-full pl-10"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max Budget"
                  className="input input-bordered w-full pl-10"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-3 flex gap-2">
              <button className="btn btn-primary flex-1" onClick={refetch}>
                Apply Filters
              </button>
              <button className="btn btn-outline" onClick={resetFilters}>
                Reset
              </button>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search services..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Min Budget"
                    className="input input-bordered w-full pl-10"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Max Budget"
                    className="input input-bordered w-full pl-10"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary flex-1" onClick={refetch}>
                  Apply
                </button>
                <button className="btn btn-outline" onClick={resetFilters}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">
            {isLoading ? "Loading..." : `${services.length} Services Found`}
          </h3>
          <div className="text-sm text-gray-500">
            Showing all results
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <div className="card-body">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4 text-6xl">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Services Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button className="btn btn-primary" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          // Services Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const { _id, title, cost,createdByEmail, description, image, type: serviceType, rating } = service;

              return (
                <div
                  key={_id}
                  className="group card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl border border-gray-100"
                >
                  <figure className="relative overflow-hidden h-48">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-primary capitalize">
                        {serviceType}
                      </span>
                    </div>
                    {rating && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="font-semibold">{rating}</span>
                      </div>
                    )}
                  </figure>

                  <div className="card-body p-6">
                    <h2 className="card-title text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <FaDollarSign className="mr-2 text-green-500" />
                        <span className="font-bold text-lg">${cost}</span>
                        <span className="text-gray-500 text-sm ml-2">starting price</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-blue-500" />
                        <span className="font-medium">{createdByEmail}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link to={`/services/${_id}`}>
                        <button className="btn btn-primary w-full group/btn">
                          View Details
                          <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
        <p className="text-center text-gray-600">
          Need a custom decoration service?{" "}
          <Link to="/contact" className="text-primary font-semibold hover:underline">
            Contact us for special requests
          </Link>
        </p>
      </div>
    </div>
  );
}