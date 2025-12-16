
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";


// const UpdateStatus = () => {
//   const axiosSecure = useAxiosSecure();

//   // 🔹 Load assigned projects
//   const {
//     data: projects = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["assigned-projects"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/decorator/projects");
//       return res.data;
//     },
//   });

//   // 🔹 Update project status
//   const updateStatus = async (id, status) => {
//     try {
//       await axiosSecure.patch(`/decorator/status/${id}`, { status });
//       refetch();
//     } catch (error) {
//       console.error("Status update failed", error);
//     }
//   };

//   if (isLoading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-3">
//         My Assigned Projects
//       </h2>

//       {projects.length === 0 ? (
//         <p>No assigned projects found.</p>
//       ) : (
//         projects.map((item) => (
//           <div
//             key={item._id}
//             className="border p-4 rounded-xl mb-3 shadow-sm"
//           >
//             <p className="font-medium text-lg">
//               {item.serviceName}
//             </p>

//             <p className="text-sm">
//               <span className="font-medium">Date:</span>{" "}
//               {item.eventDate}
//             </p>

//             <p className="text-sm mb-2">
//               <span className="font-medium">Status:</span>{" "}
//               <span className="text-blue-600">
//                 {item.status}
//               </span>
//             </p>

//             <div className="flex gap-2">
//               <button
//                 size="sm"
//                 disabled={item.status === "in-progress"}
//                 onClick={() =>
//                   updateStatus(item._id, "in-progress")
//                 }
//               >
//                 Start
//               </button>

//               <button
//                 size="sm"
//                 variant="secondary"
//                 disabled={item.status === "completed"}
//                 onClick={() =>
//                   updateStatus(item._id, "completed")
//                 }
//               >
//                 Complete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default UpdateStatus;



import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  AlertCircle,
  Loader2,
  ArrowUpCircle
} from "lucide-react";
import LoadingSpiner from "../LoadingSpiner";

const UpdateStatus = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-projects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/projects");
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/decorator/status/${id}`, { status });
      refetch();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "in-progress":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <PlayCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ArrowUpCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Project Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Manage and update the status of your assigned projects
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === "in-progress").length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <PlayCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === "completed").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No projects assigned
              </h3>
              <p className="text-gray-600">
                You don't have any projects assigned yet. Check back later!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {projects.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Project Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}">
                        {getStatusIcon(item.status)}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                      #{item._id.slice(-6)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.serviceName}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {/* Client Info (if available) */}
                {item.clientName && (
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm text-gray-600 mb-1">Client</p>
                    <p className="font-medium text-gray-900">{item.clientName}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => updateStatus(item._id, "in-progress")}
                      disabled={item.status === "in-progress" || item.status === "completed"}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow disabled:shadow-none"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {item.status === "in-progress" ? "In Progress" : "Start Project"}
                    </button>
                    
                    <button
                      onClick={() => updateStatus(item._id, "completed")}
                      disabled={item.status === "completed"}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow disabled:shadow-none"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Complete
                    </button>
                  </div>
                  
                  {/* Progress Indicator */}
                  {(item.status === "in-progress" || item.status === "completed") && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">
                          {item.status === "completed" ? "100%" : "50%"}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === "completed" 
                              ? "bg-green-500 w-full" 
                              : "bg-indigo-500 w-1/2"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

    
      </div>
    </div>
  );
};

export default UpdateStatus;