import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export function BookingsHistogram() {
     const axiosSecure = useAxiosSecure();
  const { data: histogram = [] } = useQuery({
    queryKey: ["bookings-histogram"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/bookings-histogram")).data,
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bookings Histogram</h2>
      <div width="100%" height={300}>
        <BarChart data={histogram}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
    </div>
  );
}
