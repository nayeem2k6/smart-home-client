// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";


// export default function DecoratorApproval() {
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: decorators = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["decorators"],
//     queryFn: async () => (await axiosSecure.get("/admin/decorators")).data,
//   });

//   const updateStatus = async (id, status) => {
//     try {
//       console.log(id,status)
      
//       const {data} = await axiosSecure.patch(`/admin/decorator/${id}`, { status });
//       console.log(data)
//       if(data.acknowledged){
//        toast.success(`Decorator ${status} successfully`);
//       }
      
//       refetch();
//     } catch (err) {
//       toast.error("Action failed");
//       console.error(err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 max-w-6xl mx-auto">
//       <h2 className="text-xl md:text-2xl font-semibold mb-6">
//         Approve / Disable Decorators
//       </h2>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto rounded-lg shadow">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Email</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {decorators.map((d) => (
//               <tr key={d._id} className="border-t">
//                 <td className="p-3 font-medium">{d.email}</td>
//                 <td className="p-3 capitalize">{d.status || "pending"}</td>
//                 <td className="p-3">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       disabled={d.status === "approved"}
//                       onClick={() => updateStatus(d._id, "approved")}
//                       className={`px-3 py-1 rounded text-white text-sm
//                         ${
//                           d.status === "approved"
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-green-600 hover:bg-green-700"
//                         }`}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       disabled={d.status === "disabled"}
//                       onClick={() => updateStatus(d._id, "disabled")}
//                       className={`px-3 py-1 rounded text-white text-sm
//                         ${
//                           d.status === "disabled"
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-red-600 hover:bg-red-700"
//                         }`}
//                     >
//                       Disable
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-3">
//         {decorators.map((d) => (
//           <div key={d._id} className="bg-white rounded-lg shadow p-4">
//             <p className="font-medium break-all">{d.email}</p>
//             <p className="text-sm mt-1">
//               Status:{" "}
//               <span className="font-semibold capitalize">
//                 {d.status || "pending"}
//               </span>
//             </p>

//             <div className="flex gap-2 mt-3">
//               <button
//                 disabled={d.status === "approved"}
//                 onClick={() => updateStatus(d._id, "approved")}
//                 className={`flex-1 py-2 rounded text-white text-sm
//                   ${
//                     d.status === "approved"
//                       ? "bg-gray-400"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//               >
//                 Approve
//               </button>
//               <button
//                 disabled={d.status === "disabled"}
//                 onClick={() => updateStatus(d._id, "disabled")}
//                 className={`flex-1 py-2 rounded text-white text-sm
//                   ${
//                     d.status === "disabled"
//                       ? "bg-gray-400"
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//               >
//                 Disable
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
 

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// import LoadingSpiner from "../LoadingSpiner";
// import { toast } from "react-toastify";


// export default function DecoratorApproval() {
//   const axiosSecure = useAxiosSecure();

//   const [updatingId, setUpdatingId] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(null);

//   const {
//     data: decorators = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["decorators"],
//     queryFn: async () => (await axiosSecure.get("/admin/decorators")).data,
//   });

//   const updateStatus = async (id, status) => {
//     setUpdatingId(id);
//     setUpdatingStatus(status);

//     try {
//       const { data } = await axiosSecure.patch(
//         `/admin/decorator/${id}`,
//         { status }
//       );

//       if (data.acknowledged || data.modifiedCount > 0) {
//         toast.success(`Decorator ${status} successfully`);
//         refetch();
//       }
//     } catch (err) {
//       toast.error("Action failed");
//       console.error(err);
//     } finally {
//       setUpdatingId(null);
//       setUpdatingStatus(null);
//     }
//   };

//   if (isLoading) {
//     return (
//      <LoadingSpiner></LoadingSpiner>
//     );
//   }

//   const isUpdating = (id, status) =>
//     updatingId === id && updatingStatus === status;

//   return (
//     <div className="p-4 md:p-6 max-w-6xl mx-auto">
//       <h2 className="text-xl md:text-2xl font-semibold mb-6">
//         Approve / Disable Decorators
//       </h2>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto rounded-lg shadow">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Email</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {decorators.map((d) => (
//               <tr key={d._id} className="border-t">
//                 <td className="p-3 font-medium">{d.email}</td>
//                 <td className="p-3 capitalize">{d.status || "pending"}</td>
//                 <td className="p-3">
//                   <div className="flex justify-end gap-2">
//                     {/* Approve */}
//                     <button
//                       disabled={
//                         d.status === "approved" ||
//                         isUpdating(d._id, "approved")
//                       }
//                       onClick={() => updateStatus(d._id, "approved")}
//                       className={`px-3 py-1 rounded text-white text-sm flex items-center gap-2
//                         ${
//                           d.status === "approved"
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-green-600 hover:bg-green-700"
//                         }`}
//                     >
//                       {isUpdating(d._id, "approved") && (
//                         <span className="loading loading-spinner loading-xs"></span>
//                       )}
//                       Approve
//                     </button>

//                     {/* Disable */}
//                     <button
//                       disabled={
//                         d.status === "disabled" ||
//                         isUpdating(d._id, "disabled")
//                       }
//                       onClick={() => updateStatus(d._id, "disabled")}
//                       className={`px-3 py-1 rounded text-white text-sm flex items-center gap-2
//                         ${
//                           d.status === "disabled"
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-red-600 hover:bg-red-700"
//                         }`}
//                     >
//                       {isUpdating(d._id, "disabled") && (
//                         <span className="loading loading-spinner loading-xs"></span>
//                       )}
//                       Disable
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-3">
//         {decorators.map((d) => (
//           <div key={d._id} className="bg-white rounded-lg shadow p-4">
//             <p className="font-medium break-all">{d.email}</p>
//             <p className="text-sm mt-1">
//               Status:{" "}
//               <span className="font-semibold capitalize">
//                 {d.status || "pending"}
//               </span>
//             </p>

//             <div className="flex gap-2 mt-3">
//               <button
//                 disabled={
//                   d.status === "approved" ||
//                   isUpdating(d._id, "approved")
//                 }
//                 onClick={() => updateStatus(d._id, "approved")}
//                 className={`flex-1 py-2 rounded text-white text-sm flex justify-center gap-2
//                   ${
//                     d.status === "approved"
//                       ? "bg-gray-400"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//               >
//                 {isUpdating(d._id, "approved") && (
//                   <span className="loading loading-spinner loading-xs"></span>
//                 )}
//                 Approve
//               </button>

//               <button
//                 disabled={
//                   d.status === "disabled" ||
//                   isUpdating(d._id, "disabled")
//                 }
//                 onClick={() => updateStatus(d._id, "disabled")}
//                 className={`flex-1 py-2 rounded text-white text-sm flex justify-center gap-2
//                   ${
//                     d.status === "disabled"
//                       ? "bg-gray-400"
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//               >
//                 {isUpdating(d._id, "disabled") && (
//                   <span className="loading loading-spinner loading-xs"></span>
//                 )}
//                 Disable
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../LoadingSpiner";
import { toast } from "react-toastify";

export default function DecoratorApproval() {
  const axiosSecure = useAxiosSecure();

  const [activeTab, setActiveTab] = useState("approved");
  const [updatingId, setUpdatingId] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // 🔥 status-wise fetch
  const {
    data: decorators = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["decorators", activeTab],
    queryFn: async () =>
      (await axiosSecure.get(`/admin/decorators?status=${activeTab}`)).data,
  });

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    setUpdatingStatus(status);

    try {
      const { data } = await axiosSecure.patch(
        `/admin/decorator/${id}`,
        { status }
      );

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success(`Decorator ${status} successfully`);
        refetch(); // 🔥 tab change হবে না
      }
    } catch (err) {
      toast.error("Action failed");
      console.error(err);
    } finally {
      setUpdatingId(null);
      setUpdatingStatus(null);
    }
  };

  const isUpdating = (id, status) =>
    updatingId === id && updatingStatus === status;

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Approve / Disable Decorators
      </h2>

      {/* 🔹 Tabs */}
      <div className="flex gap-2 mb-6">
        {["approved", "disabled", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize text-sm font-medium
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorators.map((d) => (
              <tr key={d._id} className="border-t">
                <td className="p-3 font-medium">{d.email}</td>
                <td className="p-3 capitalize">{d.status || "pending"}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button
                      disabled={
                        d.status === "approved" ||
                        isUpdating(d._id, "approved")
                      }
                      onClick={() => updateStatus(d._id, "approved")}
                      className={`px-3 py-1 rounded text-white text-sm
                        ${
                          d.status === "approved"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {isUpdating(d._id, "approved")
                        ? "Loading..."
                        : "Approve"}
                    </button>

                    <button
                      disabled={
                        d.status === "disabled" ||
                        isUpdating(d._id, "disabled")
                      }
                      onClick={() => updateStatus(d._id, "disabled")}
                      className={`px-3 py-1 rounded text-white text-sm
                        ${
                          d.status === "disabled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      {isUpdating(d._id, "disabled")
                        ? "Loading..."
                        : "Disable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {decorators.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No decorators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {decorators.map((d) => (
          <div key={d._id} className="bg-white rounded-lg shadow p-4">
            <p className="font-medium break-all">{d.email}</p>
            <p className="text-sm mt-1">
              Status:{" "}
              <span className="font-semibold capitalize">{d.status}</span>
            </p>

            <div className="flex gap-2 mt-3">
              <button
                disabled={d.status === "approved"}
                onClick={() => updateStatus(d._id, "approved")}
                className={`flex-1 py-2 rounded text-white text-sm
                  ${
                    d.status === "approved"
                      ? "bg-gray-400"
                      : "bg-green-600"
                  }`}
              >
                Approve
              </button>

              <button
                disabled={d.status === "disabled"}
                onClick={() => updateStatus(d._id, "disabled")}
                className={`flex-1 py-2 rounded text-white text-sm
                  ${
                    d.status === "disabled"
                      ? "bg-gray-400"
                      : "bg-red-600"
                  }`}
              >
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
