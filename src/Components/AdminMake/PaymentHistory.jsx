// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../Context/AuthContext";

// export default function PaymentHistory() {
//   const { user } = useContext(AuthContext);

//   const { data: payments = [] } = useQuery({
//     queryKey: ["payments", user?.email],
//     queryFn: async () => {
//       const res = await axios.get(
//         `http://localhost:3000/payments/${user.email}`
//       );
//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Payment History</h2>

//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Transaction</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((p) => (
//             <tr key={p._id}>
//               <td>{new Date(p.date).toLocaleDateString()}</td>
//               <td>{p.amount} ৳</td>
//               <td className="text-xs">{p.transactionId}</td>
//               <td className="text-green-600">{p.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/payments/${user.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>{p.amount} ৳</td>
                <td className="text-xs">{p.transactionId}</td>
                <td className="text-green-600">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {payments.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-3 shadow-sm bg-white"
          >
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(p.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> {p.amount} ৳
            </p>
            <p className="break-all text-sm">
              <span className="font-semibold">Transaction:</span>{" "}
              {p.transactionId}
            </p>
            <p className="text-green-600 font-semibold">{p.status}</p>
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No payment history found
        </p>
      )}
    </div>
  );
}
