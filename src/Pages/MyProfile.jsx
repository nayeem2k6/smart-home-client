

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import useRole from "../hooks/UseRole";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

export default function MydataProfile() {
  const { user } = useContext(AuthContext || React.createContext({}));
  let { data, roleLoading } = useRole(user);
  console.log(data);

  const email = user?.email;

  const fetchProfile = async () => {
    if (!email) return null;
    const res = await axios.get(user);
    return res.data;
  };

  const { isError, error } = useQuery({
    queryKey: ["profile", email],
    queryFn: fetchProfile,
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });

  // UI helpers
  if (!email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <UserCircleIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No User Logged In</h3>
          <p className="text-gray-500">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="h-48 w-48 rounded-full bg-gray-200 mx-auto mb-6 -mt-24 ring-8 ring-white"></div>
              <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded-lg mb-2 w-1/2 mx-auto"></div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded-xl"></div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Error Loading Profile</h3>
              <p className="text-gray-600 mt-1">{error?.message || "Something went wrong"}</p>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  data = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Profile Header with Gradient */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white bg-white shadow-2xl overflow-hidden">
                  {data.image ? (
                    <img src={data.image} className="h-full w-full object-cover" alt={data.name} />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <span className="text-4xl font-bold text-blue-600">
                        {data.name ? data.name[0].toUpperCase() : (data.email || "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                {data.role === "premium" && (
                  <div className="absolute bottom-2 right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckBadgeIcon className="w-4 h-4" />
                    PRO
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Personal Info */}
              <div className="lg:w-1/3">
                <div className="sticky top-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{data.name || "Unnamed User"}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        data.role === "admin" 
                          ? "bg-red-100 text-red-800" 
                          : data.role === "premium" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {data.role?.toUpperCase() || "CUSTOMER"}
                      </span>
                      <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  {/* Contact Info Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <UserCircleIcon className="w-5 h-5" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${data.email}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {data.email}
                          </a>
                        </div>
                      </div>

                      {data.phone && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <PhoneIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">{data.phone}</p>
                          </div>
                        </div>
                      )}

                      {data.location && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                            <MapPinIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-gray-900">{data.location}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">
                            {data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }) : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
                    <PencilSquareIcon className="w-5 h-5" />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Right Column - Details & Stats */}
              <div className="lg:w-2/3">
                {/* Bio Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      {data.bio || "No bio provided yet. Add a short description about yourself — what you do, your specialty, and what clients can expect."}
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <BriefcaseIcon className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-700">{data.stats?.projects ?? 30}</span>
                      </div>
                      <p className="font-medium text-gray-900">Projects</p>
                      <p className="text-sm text-gray-600 mt-1">Completed successfully</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <StarIcon className="w-8 h-8 text-green-600" />
                        <span className="text-2xl font-bold text-green-700">{data.stats?.reviews ?? 45}</span>
                      </div>
                      <p className="font-medium text-gray-900">Reviews</p>
                      <p className="text-sm text-gray-600 mt-1">Client feedback</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg">
                          <span className="text-white font-bold">★</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-700">
                          {data.stats?.rating ? data.stats.rating.toFixed(1) : "—"}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">Rating</p>
                      <p className="text-sm text-gray-600 mt-1">Average score</p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {data.skills?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-3">
                      {data.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 text-gray-800 font-medium hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 hover:text-blue-700 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <ul className="space-y-4">
                      {(data.recent && data.recent.length > 0) ? (
                        data.recent.map((activity, i) => (
                          <li key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-700">{activity}</span>
                            <span className="ml-auto text-sm text-gray-500">2h ago</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-center py-8 text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <CalendarIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          No recent activity to show
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Send Message
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
            <BriefcaseIcon className="w-5 h-5" />
            Hire Me
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 flex items-center gap-2">
            <ShareIcon className="w-5 h-5" />
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
}