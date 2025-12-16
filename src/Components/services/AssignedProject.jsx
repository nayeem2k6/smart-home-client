import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../LoadingSpiner";

const AssignedProject = () => {
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["decorator-projects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/projects");
      return res.data;
    },
  });

   if (isLoading) {
    return <LoadingSpiner></LoadingSpiner>
  }


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Assigned Projects
      </h2>

      {projects.length === 0 ? (
        <p>No projects assigned yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-lg p-4 shadow"
            >
              <h3 className="text-lg font-semibold">
                {project.title}
              </h3>

              <p>
                <span className="font-medium">Project:</span>{" "}
                {project.serviceName}
              </p>

              <p>
                <span className="font-medium">Client Email:</span>{" "}
                {project.decoratorEmail}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                {project.date}
              </p>

              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="text-blue-600">
                  {project.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedProject;
