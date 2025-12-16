import { BarChart, Bar } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export function ServiceDemandChart() {
     const axiosSecure = useAxiosSecure();
  const { data: demand = [] } = useQuery({
    queryKey: ["service-demand"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/service-demand")).data,
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Service Demand</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={demand}>
          <XAxis dataKey="service" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
