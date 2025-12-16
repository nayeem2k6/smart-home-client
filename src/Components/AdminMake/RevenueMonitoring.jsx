import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export function RevenueMonitoring() {
     const axiosSecure = useAxiosSecure();
  const { data: revenue = [] } = useQuery({
    queryKey: ["revenue"],
    queryFn: async () => (await axiosSecure.get("/admin/revenue")).data,
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Revenue Monitoring</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenue}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="total" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
