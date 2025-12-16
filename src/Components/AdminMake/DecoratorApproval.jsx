import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export function DecoratorApproval() {
     const axiosSecure = useAxiosSecure();
  const { data: decorators = [], refetch } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => (await axiosSecure.get("/admin/decorators")).data,
  });

  const toggleStatus = async (id, status) => {
    await axiosSecure.patch(`/admin/decorator/${id}`, { status });
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Approve / Disable Decorators
      </h2>
      {decorators.map((d) => (
        <div
          key={d._id}
          className="flex justify-between p-3 border rounded mb-2"
        >
          <p>{d.email}</p>
          <button
            onClick={() =>
              toggleStatus(
                d._id,
                d.status === "approved" ? "disabled" : "approved"
              )
            }
            className={`px-3 py-1 rounded ${
              d.status === "approved" ? "bg-red-500" : "bg-green-600"
            }`}
          >
            {d.status === "approved" ? "Disable" : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}
