import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../LoadingSpiner";
import { AuthContext } from "../../Context/AuthContext";


const DecoratorPayment = () => {
  const axiosSecure = useAxiosSecure();
const { user } = useContext(AuthContext);
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["decorator-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator/payments/${user.email}`);
      console.log(res.data); 
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>{p.serviceId}</td>
              <td>৳{p.cost}</td>
              <td>{p.serviceName}</td>
              <td>
                <span className="badge badge-success">Paid</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DecoratorPayment;
