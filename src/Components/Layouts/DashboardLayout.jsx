// import React, { useContext, useState } from "react";
// import {
//   FaHome,
//   FaUser,
//   FaCalendarAlt,
//   FaCreditCard,
//   FaBoxOpen,
//   FaUserTie,
//   FaTools,
//   FaChartLine,
//   FaChartBar,
//   FaDollarSign,
//   FaProjectDiagram,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaBell,
//   FaCog,
//   FaSearch,
//   FaFilter,
//   FaPlus,
//   FaRegClock,
//   FaRegCheckCircle,
//   FaRegCalendarCheck,
//   FaMoneyBillWave,
//   FaReceipt,
//   FaFileInvoiceDollar,
//   FaUsers,
//   FaShapes,
//   FaClipboardList,
//   FaCalendarCheck,
//   FaUserCheck,
//   FaUserTimes,
//   FaChevronDown,
//   FaBars,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Link, NavLink, Outlet, useNavigate } from "react-router";
// import useRole from '../../hooks/UseRole'
// import { AuthContext } from "../../Context/AuthContext";

// const DashboardLayout = () => {
//   const { user,  } = useContext(AuthContext);
//   let {data, roleLoading} = useRole(user);
//   console.log(data)
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Dashboard stats (would typically come from API)
//   const [stats,] = useState({
//     totalBookings: 142,
//     pendingBookings: 8,
//     totalRevenue: 125000,
//     activeDecorators: 24,
//   });
//  if( roleLoading) return <span className="loading loading-spinner text-neutral"></span>
//   data=data.data
//   return (
//     <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
//       <input
//         id="dashboard-drawer"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={() => setSidebarOpen(!sidebarOpen)}
//       />

//       {/* Main Content Area */}
//       <div className="drawer-content flex flex-col">
//         {/* Top Navigation Bar */}
//         <nav className="navbar bg-white shadow-sm px-4 lg:px-6 py-3 sticky top-0 z-10">
//           {/* Mobile Menu Button */}
//           <div className="flex-none lg:hidden">
//             <label
//               htmlFor="dashboard-drawer"
//               className="btn btn-ghost btn-square"
//             >
//               <FaBars className="text-xl" />
//             </label>
//           </div>

//           {/* Logo & Brand */}
//           <div className="flex-1">
//             <div className="flex items-center gap-3">
//               <div className="hidden lg:flex items-center gap-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <FaHome className="text-white text-xl" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-800">
//                     DecoratePro
//                   </h1>
//                   <p className="text-xs text-gray-500">
//                     Professional Decoration Services
//                   </p>
//                 </div>
//               </div>

//               {/* Search Bar */}
//               <div className="hidden md:flex flex-1 max-w-md ml-4">
//                 <div className="form-control w-full">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       placeholder="Search bookings, decorators, services..."
//                       className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <button className="btn btn-square">
//                       <FaSearch />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex-none flex items-center gap-4">
//             {/* Notifications */}
//             <div className="dropdown dropdown-end">
//               <div tabIndex={0} className="btn btn-ghost btn-circle">
//                 <div className="indicator">
//                   <FaBell className="text-xl" />
//                   <span className="badge badge-xs badge-primary indicator-item">
//                     3
//                   </span>
//                 </div>
//               </div>
//               <div
//                 tabIndex={0}
//                 className="dropdown-content z-[1] mt-3 card card-compact w-80 p-2 shadow bg-white"
//               >
//                 <div className="card-body">
//                   <span className="font-bold text-lg">Notifications</span>
//                   <div className="space-y-2 max-h-60 overflow-y-auto">
//                     <div className="alert alert-info py-3">
//                       <FaCalendarCheck className="text-sm" />
//                       <span className="text-sm">
//                         New booking request from Sarah
//                       </span>
//                     </div>
//                     <div className="alert alert-success py-3">
//                       <FaDollarSign className="text-sm" />
//                       <span className="text-sm">
//                         Payment received for #BKG-789
//                       </span>
//                     </div>
//                     <div className="alert alert-warning py-3">
//                       <FaUserTie className="text-sm" />
//                       <span className="text-sm">
//                         Decorator availability update
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* User Profile */}
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 className="btn btn-ghost flex items-center gap-2"
//               >
//                 <div className="avatar">
//                   <div className="w-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
//                   <img src={data.image} />
//                   </div>
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium">{data.name}</p>
//                   <p className="text-xs text-gray-500 capitalize">{data.role}</p>
//                 </div>
//                 <FaChevronDown className="text-sm" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
//               >
//                 <li>
//                   <NavLink to="/dashboard/profile">
//                     <FaUser className="text-sm" />
//                     My Profile
//                   </NavLink>
//                 </li>
//                 <li>
//                   <a>
//                     <FaCog className="text-sm" />
//                     Settings
//                   </a>
//                 </li>
//                 <li className="divider my-1"></li>
//                 <li>
//                   <NavLink to={'/'} className="text-red-500">
//                     <FaSignOutAlt className="text-sm" />
//                     Logout
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

//         {/* Quick Stats Bar */}
//         <div className="px-4 lg:px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="stat bg-white rounded-lg shadow-sm p-4">
//               <div className="stat-figure text-purple-500">
//                 <FaCalendarAlt className="text-2xl" />
//               </div>
//               <div className="stat-title text-gray-600">Total Bookings</div>
//               <div className="stat-value text-2xl">{stats.totalBookings}</div>
//               <div className="stat-desc text-green-600">
//                 ↑ 12% from last month
//               </div>
//             </div>

//             <div className="stat bg-white rounded-lg shadow-sm p-4">
//               <div className="stat-figure text-orange-500">
//                 <FaRegClock className="text-2xl" />
//               </div>
//               <div className="stat-title text-gray-600">Pending</div>
//               <div className="stat-value text-2xl">{stats.pendingBookings}</div>
//               <div className="stat-desc">Awaiting approval</div>
//             </div>

//             <div className="stat bg-white rounded-lg shadow-sm p-4">
//               <div className="stat-figure text-green-500">
//                 <FaDollarSign className="text-2xl" />
//               </div>
//               <div className="stat-title text-gray-600">Revenue</div>
//               <div className="stat-value text-2xl">
//                 ${(stats.totalRevenue / 1000).toFixed(0)}K
//               </div>
//               <div className="stat-desc text-green-600">↑ 8.5% growth</div>
//             </div>

//             <div className="stat bg-white rounded-lg shadow-sm p-4">
//               <div className="stat-figure text-blue-500">
//                 <FaUserTie className="text-2xl" />
//               </div>
//               <div className="stat-title text-gray-600">Active Decorators</div>
//               <div className="stat-value text-2xl">
//                 {stats.activeDecorators}
//               </div>
//               <div className="stat-desc">24/32 available</div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 p-4 lg:p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* Sidebar */}
//       <div className="drawer-side">
//         <label
//           htmlFor="dashboard-drawer"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>

//         <div className="flex flex-col min-h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white w-80">
//           {/* Sidebar Header */}
//           <div className="p-6 border-b border-gray-700">
//             <div className="flex items-center gap-3 mb-6">
//               <button onClick={() => navigate(-1)} className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                 <FaHome className="text-white text-2xl" />

//               </button>
//               <div>
//                 <h2 className="font-bold text-xl">DecoratePro</h2>
//                 <p className="text-xs text-gray-400">Professional Dashboard</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
//               <div className="avatar">
//                 <div className="w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
//                   <img src={data.image} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium">{data.name}</p>
//                 <p className="text-xs text-gray-400 capitalize">
//                   {data.role} Account
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Menu */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <ul className="menu space-y-1">
//               {/* Common Links */}
//               <li className="menu-title text-gray-400 text-xs uppercase mb-2">
//                 Dashboard
//               </li>
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   className={({ isActive }) =>
//                     `rounded-lg mb-1 ${
//                       isActive
//                         ? "bg-purple-600 text-white"
//                         : "hover:bg-gray-700"
//                     }`
//                   }
//                 >
//                   <FaHome />
//                   Overview
//                 </NavLink>
//               </li>

//               {/* User Dashboard Links */}
//               {data.role === "User" && (
//                 <>
//                   <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
//                     My Account
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/profile"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaUser />
//                       My Profile
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/bookings"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaCalendarAlt />
//                       My Bookings
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/bookings/cancellation"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaTimesCircle />
//                       Cancel Booking
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/payment-history"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaCreditCard />
//                       Payment History
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/receipts"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaReceipt />
//                       Payment Receipts
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Admin Dashboard Links */}
//               {data.role === "admin" && (
//                 <>
//                   <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
//                     Management
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/decorate"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaUserTie />
//                       Manage Decorate
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/decorators/approval"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaUserCheck />
//                       Approve/Disable Accounts
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/services"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaBoxOpen />
//                       Services & Packages
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/bookings/manage"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaClipboardList />
//                       Manage Bookings
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/bookings/assign"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaUserTie />
//                       Assign Decorators
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/payments"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaMoneyBillWave />
//                       Payment Verification
//                     </NavLink>
//                   </li>

//                   <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
//                     Analytics & Reports
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/revenue"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaChartLine />
//                       Revenue Monitoring
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/analytics/service-demand"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaChartBar />
//                       Service Demand Chart
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/analytics/bookings-histogram"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaCalendarCheck />
//                       Bookings Histogram
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/users"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaUsers />
//                       User Management
//                     </NavLink>
//                   </li>

//                 </>

//               )}

//               {/* Decorator Dashboard Links */}
//               {data.role === "decorator" && (
//                 <>
//                   <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
//                     My Work
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/projects"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaProjectDiagram />
//                       Assigned Projects
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/schedule"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaCalendarAlt />
//                       Today's Schedule
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/projects/update"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaTools />
//                       Update Project Status
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/earnings"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaDollarSign />
//                       Earnings Summary
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/dashboard/payment-history"
//                       className={({ isActive }) =>
//                         `rounded-lg mb-1 ${
//                           isActive
//                             ? "bg-purple-600 text-white"
//                             : "hover:bg-gray-700"
//                         }`
//                       }
//                     >
//                       <FaFileInvoiceDollar />
//                       Payment History
//                     </NavLink>
//                   </li>
//                 </>
//               )}

//               {/* Common Bottom Links */}
//               <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
//                 Settings
//               </li>
//               <li>
//                 <NavLink
//                   to="/dashboard/settings"
//                   className={({ isActive }) =>
//                     `rounded-lg mb-1 ${
//                       isActive
//                         ? "bg-purple-600 text-white"
//                         : "hover:bg-gray-700"
//                     }`
//                   }
//                 >
//                   <FaCog />
//                   Settings
//                 </NavLink>
//               </li>
//               <li>
//                 <Link to="/" className="rounded-lg mb-1 hover:bg-gray-700">
//                   <FaHome />
//                   Back to Home
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Sidebar Footer */}
//           <div className="p-4 border-t border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 bg-green-500 rounded-full">
//                   <div className="w-2 h-2 rounded-full bg-white"></div>
//                 </div>
//                 <span className="text-sm">System Online</span>
//               </div>
//               <div className="text-xs text-gray-400">v2.1.0</div>
//             </div>
//             <div className="mt-2">
//               <button
//                 onClick={() => navigate("/dashboard/bookings/create")}
//                 className="btn btn-sm w-full bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:opacity-90"
//               >
//                 <FaPlus className="mr-2" />
//                 New Booking
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





import { useState, useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useRole from '../../hooks/UseRole';
import { AuthContext } from "../../Context/AuthContext";
import {
  FaBars,
  FaHome,
  FaSearch,
  FaBell,
  FaCalendarCheck,
  FaDollarSign,
  FaUserTie,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaRegClock,
  FaUserCheck,
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartLine,
  FaChartBar,
  FaUsers,
  FaProjectDiagram,
  FaTools,
  FaFileInvoiceDollar,
  FaPlus,
  FaTimesCircle,
  FaCreditCard,
  FaReceipt
} from 'react-icons/fa';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { data, roleLoading } = useRole(user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Dashboard stats (would typically come from API)
  const [stats] = useState({
    totalBookings: 142,
    pendingBookings: 8,
    totalRevenue: 125000,
    activeDecorators: 24,
  });

  if (roleLoading) return <span className="loading loading-spinner text-neutral"></span>;
  
  // Check if data exists and has the expected structure
  if (!data || !data.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner text-primary mb-4"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  const userData = data.data;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSidebarClose = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navigation Bar */}
        <nav className="navbar bg-white shadow-sm px-4 lg:px-6 py-3 sticky top-0 z-10">
          {/* Mobile Menu Button */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square"
            >
              <FaBars className="text-xl" />
            </label>
          </div>

          {/* Logo & Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    DecoratePro
                  </h1>
                  <p className="text-xs text-gray-500">
                    Professional Decoration Services
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md ml-4">
                <div className="form-control w-full">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search bookings, decorators, services..."
                      className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="btn btn-square">
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex-none flex items-center gap-4">
            {/* Notifications */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FaBell className="text-xl" />
                  <span className="badge badge-xs badge-primary indicator-item">
                    3
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-[1] mt-3 card card-compact w-80 p-2 shadow bg-white"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">Notifications</span>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <div className="alert alert-info py-3">
                      <FaCalendarCheck className="text-sm" />
                      <span className="text-sm">
                        New booking request from Sarah
                      </span>
                    </div>
                    <div className="alert alert-success py-3">
                      <FaDollarSign className="text-sm" />
                      <span className="text-sm">
                        Payment received for #BKG-789
                      </span>
                    </div>
                    <div className="alert alert-warning py-3">
                      <FaUserTie className="text-sm" />
                      <span className="text-sm">
                        Decorator availability update
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-2"
              >
                <div className="avatar">
                  <div className="w-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    {userData.image ? (
                      <img src={userData.image} alt={userData.name || 'User'} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        {userData.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{userData.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{userData.role || 'User'}</p>
                </div>
                <FaChevronDown className="text-sm" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUser className="text-sm" />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/settings">
                    <FaCog className="text-sm" />
                    Settings
                  </NavLink>
                </li>
                <li className="divider my-1"></li>
                <li>
                  <NavLink to={'/login'} onClick={handleLogout} className="text-red-500">
                    <FaSignOutAlt className="text-sm" />
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Quick Stats Bar */}
        <div className="px-4 lg:px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat bg-white rounded-lg shadow-sm p-4">
              <div className="stat-figure text-purple-500">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <div className="stat-title text-gray-600">Total Bookings</div>
              <div className="stat-value text-2xl">{stats.totalBookings}</div>
              <div className="stat-desc text-green-600">
                ↑ 12% from last month
              </div>
            </div>

            <div className="stat bg-white rounded-lg shadow-sm p-4">
              <div className="stat-figure text-orange-500">
                <FaRegClock className="text-2xl" />
              </div>
              <div className="stat-title text-gray-600">Pending</div>
              <div className="stat-value text-2xl">{stats.pendingBookings}</div>
              <div className="stat-desc">Awaiting approval</div>
            </div>

            <div className="stat bg-white rounded-lg shadow-sm p-4">
              <div className="stat-figure text-green-500">
                <FaDollarSign className="text-2xl" />
              </div>
              <div className="stat-title text-gray-600">Revenue</div>
              <div className="stat-value text-2xl">
                ${(stats.totalRevenue / 1000).toFixed(0)}K
              </div>
              <div className="stat-desc text-green-600">↑ 8.5% growth</div>
            </div>

            <div className="stat bg-white rounded-lg shadow-sm p-4">
              <div className="stat-figure text-blue-500">
                <FaUserTie className="text-2xl" />
              </div>
              <div className="stat-title text-gray-600">Active Decorators</div>
              <div className="stat-value text-2xl">
                {stats.activeDecorators}
              </div>
              <div className="stat-desc">24/32 available</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex flex-col min-h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white w-80">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => navigate('/')} 
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <FaHome className="text-white text-2xl" />
              </button>
              <div>
                <h2 className="font-bold text-xl">DecoratePro</h2>
                <p className="text-xs text-gray-400">Professional Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="avatar">
                <div className="w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                  {userData.image ? (
                    <img src={userData.image} alt={userData.name || 'User'} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {userData.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium">{userData.name || 'User'}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {userData.role || 'User'} Account
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="menu space-y-1">
              {/* Common Links */}
              <li className="menu-title text-gray-400 text-xs uppercase mb-2">
                Dashboard
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `rounded-lg mb-1 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={handleSidebarClose}
                >
                  <FaHome />
                  Overview
                </NavLink>
              </li>

              {/* User Dashboard Links */}
              {userData.role === "User" && (
                <>
                  <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
                    My Account
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaUser />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bookings"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaCalendarAlt />
                      My Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bookings/cancellation"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaTimesCircle />
                      Cancel Booking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaCreditCard />
                      Payment History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/receipts"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaReceipt />
                      Payment Receipts
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Dashboard Links */}
              {userData.role === "admin" && (
                <>
                  <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
                    Management
                  </li>
                  <li>
                    <NavLink
                      to=""
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaUserTie />
                      Manage Decorators
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/decorators/approval"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaUserCheck />
                      Approve/Disable Accounts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/services"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaBoxOpen />
                      Services & Packages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bookings/manage"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaClipboardList />
                      Manage Bookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bookings/assign"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaUserTie />
                      Assign Decorators
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/payments"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaMoneyBillWave />
                      Payment Verification
                    </NavLink>
                  </li>

                  <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
                    Analytics & Reports
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/revenueMonitoring"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaChartLine />
                      Revenue Monitoring
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/analytics/service-demand"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaChartBar />
                      Service Demand Chart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/analytics/bookings-histogram"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaCalendarCheck />
                      Bookings Histogram
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaUsers />
                      User Management
                    </NavLink>
                  </li>
                </>
              )}

              {/* Decorator Dashboard Links */}
              {userData.role === "decorator" && (
                <>
                  <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
                    My Work
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/projects"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaProjectDiagram />
                      Assigned Projects
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/schedule"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaCalendarAlt />
                      Today's Schedule
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/projects/update"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaTools />
                      Update Project Status
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/earnings"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaDollarSign />
                      Earnings Summary
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({ isActive }) =>
                        `rounded-lg mb-1 ${
                          isActive
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-700"
                        }`
                      }
                      onClick={handleSidebarClose}
                    >
                      <FaFileInvoiceDollar />
                      Payment History
                    </NavLink>
                  </li>
                </>
              )}

              {/* Common Bottom Links */}
              <li className="menu-title text-gray-400 text-xs uppercase mt-6 mb-2">
                Settings
              </li>
              <li>
                <NavLink
                  to="/dashboard/settings"
                  className={({ isActive }) =>
                    `rounded-lg mb-1 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={handleSidebarClose}
                >
                  <FaCog />
                  Settings
                </NavLink>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="rounded-lg mb-1 hover:bg-gray-700"
                  onClick={handleSidebarClose}
                >
                  <FaHome />
                  Back to Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-500 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="text-sm">System Online</span>
              </div>
              <div className="text-xs text-gray-400">v2.1.0</div>
            </div>
            <div className="mt-2">
              <button
                onClick={() => {
                  navigate("/dashboard/bookings/create");
                  handleSidebarClose();
                }}
                className="btn btn-sm w-full bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white hover:opacity-90"
              >
                <FaPlus className="mr-2" />
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;