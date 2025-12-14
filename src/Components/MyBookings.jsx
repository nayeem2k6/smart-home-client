import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Fetch bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/bookings?email=${user.email}`
      );
      return res.data;
    },
  });

  // Cancel booking
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.patch(`http://localhost:3000/bookings/cancel/${id}`);
      queryClient.invalidateQueries(["bookings", user?.email]);
      toast.success("Booking Cancelled Successfully!");
    }
  };

  const handlePay = async (booking) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/create-payment-session",
        {
          bookingId: booking._id,
          serviceName: booking.serviceName,
          cost: booking.cost,
        }
      );

      // Redirect to Stripe checkout
      console.log(res.data)
      // window.location.assign(res.data.success_url)
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed");
    }
  };

  // Open update modal
  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setDate(booking.date);
    setLocation(booking.location);
    setOpenUpdate(true);
  };

  // Update booking
  const handleUpdate = async () => {
    if (!date || !location) {
      toast.error("Please fill all fields");
      return;
    }

    await axios.patch(
      `http://localhost:3000/bookings/update/${selectedBooking._id}`,
      { date, location }
    );
    queryClient.invalidateQueries(["bookings", user?.email]);
    setOpenUpdate(false);
    toast.success("Booking Updated Successfully!");
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: ClockIcon,
      },
      Confirmed: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: CheckBadgeIcon,
      },
      Paid: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckBadgeIcon,
      },
      Cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: ExclamationTriangleIcon,
      },
    };

    const config = statusConfig[status] || statusConfig["Pending"];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {status}
      </span>
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Manage and track all your service bookings in one place
          </p>
          {bookings.length > 0 && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>
                  Active:{" "}
                  {bookings.filter((b) => b.status !== "Cancelled").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>
                  Completed:{" "}
                  {bookings.filter((b) => b.status === "Paid").length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bookings Grid */}
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                <CalendarIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Bookings Yet
              </h3>
              <p className="text-gray-500 mb-8">
                You haven't made any bookings yet. Start exploring services!
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Browse Services
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                {/* Booking Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 truncate">
                      {booking.serviceName}
                    </h3>
                    <StatusBadge status={booking.status || "Pending"} />
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <CurrencyDollarIcon className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <p className="font-medium">${booking.cost}</p>
                        <p className="text-sm text-gray-500">Total Cost</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="w-5 h-5 mr-3 text-blue-500" />
                      <div>
                        <p className="font-medium">
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-500">Booking Date</p>
                      </div>
                    </div>

                    <div className="flex items-start text-gray-600">
                      <MapPinIcon className="w-5 h-5 mr-3 text-red-500 mt-1" />
                      <div>
                        <p className="font-medium">{booking.location}</p>
                        <p className="text-sm text-gray-500">
                          Service Location
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {/* PAY Button */}
                    {booking.status !== "Paid" &&
                      booking.status !== "Cancelled" && (
                        <button
                          onClick={() => handlePay(booking)}
                          className="flex-1 min-w-[120px] px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium flex items-center justify-center"
                        >
                          <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                          Pay Now
                        </button>
                      )}

                    {/* UPDATE Button */}
                    {booking.status !== "Cancelled" &&
                      booking.status !== "Paid" && (
                        <button
                          onClick={() => openUpdateModal(booking)}
                          className="px-4 py-2.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center"
                        >
                          <PencilIcon className="w-5 h-5 mr-2" />
                          Update
                        </button>
                      )}

                    {/* CANCEL Button */}
                    {booking.status !== "Cancelled" &&
                      booking.status !== "Paid" && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="px-4 py-2.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center"
                        >
                          <TrashIcon className="w-5 h-5 mr-2" />
                          Cancel
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Update Booking
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedBooking?.serviceName}
                </p>
              </div>
              <button
                onClick={() => setOpenUpdate(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-1" />
                  Select New Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPinIcon className="w-4 h-4 inline mr-1" />
                  Service Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter service address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setOpenUpdate(false)}
                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
