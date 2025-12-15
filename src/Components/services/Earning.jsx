import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Earnings Summary
      </h2>

      <p className="text-lg font-medium">
        Total Earnings: {totalEarnings}
      </p>

      <p className="text-sm mt-1">
        Completed Jobs: {completedProjects.length}
      </p>
    </div>
  );
};

export default Earning;
