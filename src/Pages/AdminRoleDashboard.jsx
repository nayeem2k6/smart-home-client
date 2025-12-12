
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export default function AdminRoleDashboard() {
  const { user } = useContext(AuthContext);
 console.log(user)
  const {
    data: users = [],
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/users");
      return res.data;
    },
  });

  const updateRole = async (email, newRole) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/users/role/${email}`,
        { role: newRole }
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Role updated successfully!");
        refetch();
      } else {
        toast.warning("No change made.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  if (roleLoading)
    return <span className="loading loading-spinner text-neutral"></span>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        User Role Management
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white shadow-md p-5 rounded-2xl border hover:shadow-xl duration-200"
          >
            <div className="flex flex-col items-center space-y-3">

              {/* Avatar */}
              <img
                src={u.image || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-20 h-20 rounded-full border object-cover"
              />

              {/* Name */}
              <h2 className="text-lg sm:text-xl font-semibold break-words text-center">
                {u.name}
              </h2>

              {/* Email */}
              <p className="text-gray-500 text-sm break-words text-center">
                {u.email}
              </p>

              {/* Role */}
              <p className="font-medium">
                Current Role:
                <span className="text-blue-600 font-semibold"> {u.role}</span>
              </p>

              {/* Dropdown */}
              <select
                value={u.role}
                onChange={(e) => updateRole(u.email, e.target.value)}
                className="w-full border p-2 rounded-xl focus:ring focus:ring-indigo-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="decorator">Decorator</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
