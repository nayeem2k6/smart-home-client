
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../LoadingSpiner";

const Earning = () => {
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["decorator-earnings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/projects");
      return res.data;
    },
  });

  // শুধু completed job
  const completedProjects = projects.filter(
    (item) => item.status === "completed"
  );

  // মোট earning হিসাব
  const totalEarnings = completedProjects.reduce(
    (sum, item) => sum + Number(item.cost || 0),
    0
  );

  if (isLoading) return <LoadingSpiner></LoadingSpiner>

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
        Earnings Summary
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <p className="text-gray-600 text-sm mb-1">Completed Jobs</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            {completedProjects.length}
          </p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Project Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedProjects.length > 0 ? (
                completedProjects.map((project, index) => (
                  <tr 
                    key={project._id || index} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {project.title || project.name || `Project ${index + 1}`}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {project.serviceName || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">
                        ${Number(project.cost || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    No completed projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  
    </div>
  );
};

export default Earning;