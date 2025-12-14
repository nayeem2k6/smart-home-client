
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const navigate = useNavigate(-1);

  useEffect(() => {
    if (!bookingId) return;

    axios
      .patch(`http://localhost:3000/bookings/mark-paid/${bookingId}`)
      .then(() => {
        toast.success("Payment successful!");
        // navigate("/my-bookings");
      })
      .catch(() => {
        toast.error("Payment completed but status update failed");
        // navigate("/my-bookings");
      });
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-green-600">
        Processing your payment...
      </h2>
    </div>
  );
}

