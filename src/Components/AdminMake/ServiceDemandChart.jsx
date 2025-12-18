

import { BarChart, Bar, XAxis, Tooltip, YAxis, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export function ServiceDemandChart() {
  const axiosSecure = useAxiosSecure();

  const { data: demand = [], isLoading } = useQuery({
    queryKey: ["service-demand"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/service-demand");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Service Demand</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={demand}>
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
