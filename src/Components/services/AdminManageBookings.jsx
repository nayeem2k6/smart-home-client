import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selected, setSelected] = useState({}); 
 const axiosSecure= useAxiosSecure()
//   useEffect(() => {
//     loadData();
//   }, []);

  const loadData = async () => {
    const bookingRes = await axiosSecure.get("/admin/bookings");
    const decoratorRes = await axiosSecure.get(
      "/admin/decorators"
    );

    setBookings(bookingRes.data);
    setDecorators(decoratorRes.data);
  };
 

    useEffect(() => {
    loadData();
  }, []);
  const assignDecorator = async (bookingId) => {
    const decoratorEmail = selected[bookingId];

    if (!decoratorEmail) {
      return toast.error("Please select a decorator");
    }

    await axiosSecure.patch(
      `/admin/assign-decorator/${bookingId}`,
      { decoratorEmail }
    );

    toast.success("Decorator Assigned");
    loadData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Service</th>
            <th>User</th>
            <th>Status</th>
            <th>Decorator</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.serviceName}</td>
              <td>{b.userEmail}</td>

              <td>
                <span className="font-semibold">{b.status}</span>
              </td>

              <td>
                {b.status === "Assigned" ? (
                  <span>{b.decoratorName}</span>
                ) : (
                  <select
                    className="select select-bordered"
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        [b._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select decorator</option>
                    {decorators.map((d) => (
                      <option key={d.email} value={d.email}>
                        {d.name || d.email}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              <td>
                {b.status === "Paid" && (
                  <button
                    onClick={() => assignDecorator(b._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Assign
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
