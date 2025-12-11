// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AdminRoleDashboard() {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   console.log(user)
//   // Load all users
//   const loadUsers = async () => {
//     const res = await axios.get("/user");
//     console.log("API DATA =", res.data);

//     if (Array.isArray(res.data)) {
//       setUsers(res.data);
//       return;
//     }

//     if (res.data && Array.isArray(res.data.users)) {
//       setUsers(res.data.users);
//       return;
//     }

//     setUsers([]); // avoid map error
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   // Update Role
//   const updateRole = async (email, currentRole) => {
//     const newRole = currentRole === "admin" ? "user" : "admin";

//     const res = await axios.patch(`/users/role/${email}`, {
//       role: newRole,
//     });

//     if (res.data.modifiedCount > 0) {
//       toast.success("Role updated!");
//       loadUsers();
//     }
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {users.length === 0 && (
//         <p className="text-center text-gray-400 col-span-3">No Users Found</p>
//       )}

//       {users.map((u) => (
//         <div
//           key={u._id}
//           className="bg-white shadow-md p-5 rounded-2xl border hover:shadow-xl duration-200"
//         >
//           <div className="flex flex-col items-center space-y-3">
//             <img
//               src={u.image}
//               alt="profile"
//               className="w-16 h-16 rounded-full border object-cover"
//             />
//             <h2 className="text-xl font-semibold">{u.name}</h2>
//             <p className="text-gray-500">{u.email}</p>

//             <p className="font-medium">
//               Current Role:{" "}
//               <span className="text-blue-600 font-semibold">{u.role}</span>
//             </p>

//             <button
//               onClick={() => updateRole(u.email, u.role)}
//               className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
//             >
//               Make {u.role === "admin" ? "User" : "Admin"}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useContext,} from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";


export default function AdminRoleDashboard() {
  const { user } = useContext(AuthContext);
  ; // লোডিং স্টেট যোগ করলাম

  console.log("Current user from context:", user);
   const { data: users= [], roleLoading} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/users");
      return res.data;
   
    },
  });

  // Load all users




  // Update Role
  const updateRole = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const res = await axios.patch(`/users/role/${email}`, {
        role: newRole,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Role updated!");
        
      } else {
        toast.warning("No changes made");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

   if(roleLoading) return <span className="loading loading-spinner text-neutral"></span>

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white shadow-md p-5 rounded-2xl border hover:shadow-xl duration-200"
        >
          <div className="flex flex-col items-center space-y-3">
            <img
              src={u.image}
              alt="profile"
              className="w-16 h-16 rounded-full border object-cover"
            />
            <h2 className="text-xl font-semibold">{u.name}</h2>
            <p className="text-gray-500">{u.email}</p>

            <p className="font-medium">
              Current Role:{" "}
              <span className="text-blue-600 font-semibold">{u.role}</span>
            </p>

            <button
              onClick={() => updateRole(u.email, u.role)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Make {u.role === "admin" ? "User" : "Admin"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
