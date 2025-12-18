
// import { useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useSearchParams } from "react-router";

// export default function PaymentSuccess() {
//   const [params] = useSearchParams();
//   const bookingId = params.get("bookingId");
//   const navigate = useNavigate(-1);

//   useEffect(() => {
//     if (!bookingId) return;

//     axios
//       .patch(`http://localhost:3000/bookings/mark-paid/${bookingId}`)
//       .then(() => {
//         toast.success("Payment successful!");
//       })
//       .catch(() => {
//         toast.error("Payment completed but status update failed");
//       });
//   }, [bookingId, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <h2 className="text-2xl font-bold text-green-600">
//         Processing your payment...
//       </h2>
//     </div>
//   );
// }

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const transactionId = params.get("tx");
 const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (!bookingId || !transactionId) return;

    axiosSecure
      .patch(`/bookings/mark-paid/${bookingId}`, {
        transactionId,
      })
      .then(() => {
        toast.success("Payment successful!");
      })
      .catch(() => {
        toast.error("Payment completed but status update failed");
      });
  }, [bookingId, transactionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600">
          Transaction ID:
          <span className="font-semibold block mt-1">
            {transactionId}
          </span>
        </p>
      </div>
    </div>
  );
}
