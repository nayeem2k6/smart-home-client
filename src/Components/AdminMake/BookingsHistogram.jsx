import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export function BookingsHistogram() {
  const axiosSecure = useAxiosSecure();

  const { data: histogram = [] } = useQuery({
    queryKey: ["bookings-histogram"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings-histogram");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bookings Histogram</h2>
      <div style={{ width: "100%", height: 300 }}>
        <BarChart width={600} height={300} data={histogram}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
