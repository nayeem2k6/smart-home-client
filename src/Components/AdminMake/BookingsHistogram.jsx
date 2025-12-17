

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { CalendarDays, TrendingUp, Loader2 } from "lucide-react";

export function BookingsHistogram() {
  const axiosSecure = useAxiosSecure();

  const { data: histogram = [], isLoading, isError } = useQuery({
    queryKey: ["bookings-histogram"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings-histogram");
      return res.data;
    },
  });

  // Calculate stats for the header
  const totalBookings = histogram.reduce((sum, item) => sum + (item.count || 0), 0);
  const maxBookings = histogram.length > 0 ? Math.max(...histogram.map(item => item.count || 0)) : 0;

  // Gradient color function for bars
  const getBarColor = (value, maxValue) => {
    const intensity = (value / maxValue) * 100;
    return `hsl(220, 70%, ${60 - (intensity * 0.3)}%)`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-red-500 text-center p-8">
          <p className="text-lg font-semibold mb-2">Failed to load data</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Bookings Overview</h2>
          </div>
          <p className="text-gray-600">Daily booking distribution and trends</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <p className="text-sm text-gray-600 font-medium">Peak Day</p>
            <p className="text-2xl font-bold text-gray-800">{maxBookings}</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="h-72 w-full">
          {histogram.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={histogram}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#f0f0f0" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    padding: '12px',
                  }}
                  formatter={(value) => [`${value} Bookings`, 'Count']}
                  labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]}
                  barSize={32}
                >
                  {histogram.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={getBarColor(entry.count, maxBookings)}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <TrendingUp className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No booking data available</p>
              <p className="text-sm">Start accepting bookings to see analytics</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Booking Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <span className="text-sm text-gray-600">Lower Volume</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="h-4 w-4" />
          <span>
            {histogram.length > 0 
              ? `Data shows ${totalBookings} total bookings across ${histogram.length} days`
              : 'No data available for analysis'
            }
          </span>
        </div>
      </div>
    </div>
  );
}