
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TodayShedul = () => {
  const axiosSecure = useAxiosSecure();

  // আজকের date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["today-schedule", today],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/projects");
      return res.data;
    },
  });

  // আজকের project filter
  const todayProjects = projects.filter(
    (item) => item.eventDate === today
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
              Client: {item.clientName}
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

export default TodayShedul;
