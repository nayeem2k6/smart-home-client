// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";

// export default function MyBookings() {
//   const { user } = useContext(AuthContext);

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["bookings", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `http://localhost:3000/bookings?email=${user.email}`
//       );
//       console.log("Bookings:", res.data);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

//       <div className="grid grid-cols-1 gap-6">
//         {bookings.map((b) => (
//           <div key={b._id} className="p-5 border rounded-lg shadow">
//             <h3 className="text-xl font-semibold">{b.serviceName}</h3>
//             <p>Price: ${b.price}</p>
//             <p>Status: {b.status}</p>

//             {b.status !== "Cancelled" && (
//               <button
//                 onClick={() => handleCancel(b._id, refetch)}
//                 className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
//               >
//                 Cancel Booking
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// async function handleCancel(id, refetch) {
//   await axios.patch(`http://localhost:3000/bookings/cancel/${id}`);
//   refetch();
// }





// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";

// export default function MyBookings() {
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // Fetch bookings
//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["bookings", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `http://localhost:3000/bookings?email=${user.email}`
//       );
//       console.log("Bookings:", res.data);
//       return res.data;
//     },
//   });

//   // Cancel booking function
//   const handleCancel = async (id) => {
//     try {
//       await axios.patch(`http://localhost:3000/bookings/cancel/${id}`);
//       // refetch bookings
//       queryClient.invalidateQueries(["bookings", user?.email]);
//       alert("Booking Cancelled Successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to cancel booking.");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {bookings.map((b) => (
//             <div
//               key={b._id || b.serviceId}
//               className="p-5 border rounded-lg shadow"
//             >
//               <h3 className="text-xl font-semibold">{b.serviceName}</h3>
//               <p>Price: ${b.price}</p>
//               <p>Date: {b.date}</p>
//               <p>Location: {b.location}</p>
//               <p>Status: {b.status || "Pending"}</p>

//               {b.status !== "Cancelled" && (
//                 <button
//                   onClick={() => handleCancel(b._id)}
//                   className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
//                 >
//                   Cancel Booking
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

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
    await axios.patch(`http://localhost:3000/bookings/cancel/${id}`);
    queryClient.invalidateQueries(["bookings", user?.email]);
    toast.success("Booking Cancelled!");
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
    await axios.patch(
      `http://localhost:3000/bookings/update/${selectedBooking._id}`,
      { date, location }
    );
    queryClient.invalidateQueries(["bookings", user?.email]);
    setOpenUpdate(false);
    toast.success("Booking Updated!");
  };

  // Pay button
  const handlePay = (booking) => {
    toString.success(`Proceed to payment for ${booking.serviceName}`);
    // future: Stripe / SSLCommerz redirect
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-5 border rounded-lg shadow"
            >
              <h3 className="text-xl font-semibold">{b.serviceName}</h3>
              <p>Price: ${b.price}</p>
              <p>Date: {b.date}</p>
              <p>Location: {b.location}</p>
              <p>Status: {b.status || "Pending"}</p>

              <div className="flex gap-2 mt-4 flex-wrap">
                {/* PAY */}
                {b.status !== "Paid" && (
                  <button
                    onClick={() => handlePay(b)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Pay
                  </button>
                )}

                {/* UPDATE */}
                {b.status !== "Cancelled" && (
                  <button
                    onClick={() => openUpdateModal(b)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Update
                  </button>
                )}

                {/* CANCEL */}
                {b.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {openUpdate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Update Booking</h3>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 mb-3"
            />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenUpdate(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
