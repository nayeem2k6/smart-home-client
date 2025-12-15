

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const today = new Date().toISOString().split("T")[0];

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/projects");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const todayProjects = projects.filter(
    (item) =>
      item.date === today &&
      item.decoratorEmail === user.email
  );

  if (isLoading) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Today’s Schedule
      </h2>

      {todayProjects.length === 0 ? (
        <p>No events scheduled for today 🎉</p>
      ) : (
        todayProjects.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-xl mb-3"
          >
            <p className="font-medium text-lg">
              {item.serviceName}
            </p>
            <p className="text-sm">
              Client: {item.userName}
            </p>
            <p className="text-sm">
              Location: {item.location}
            </p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-semibold">
                {item.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TodaySchedule;
