// import { useQuery } from "@tanstack/react-query";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpiner from "../LoadingSpiner";

// export function RevenueMonitoring() {
//      const axiosSecure = useAxiosSecure();
//   const { data: revenue = [] ,isLoading} = useQuery({
//     queryKey: ["revenue"],
//     queryFn: async () => (await axiosSecure.get("/admin/revenue")).data,
//   });
// if(isLoading) return <LoadingSpiner></LoadingSpiner>
//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Revenue Monitoring</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={revenue}>
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line dataKey="total" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }




import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../LoadingSpiner";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

export function RevenueMonitoring() {
  const axiosSecure = useAxiosSecure();
  
  const { data: revenue = [], isLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: async () => (await axiosSecure.get("/admin/revenue")).data,
  });

  // Calculate total revenue for display
  const totalRevenue = revenue.reduce((sum, item) => sum + (item.total || 0), 0);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 font-medium">{label}</p>
          <p className="text-green-600 font-bold text-lg">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Revenue Monitoring
          </h2>
          <p className="text-gray-500 mt-1">Track your daily revenue performance</p>
        </div>
        
        {/* Stats */}
        <div className="mt-4 md:mt-0 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-gray-600">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {formatCurrency(totalRevenue)}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{revenue.length} days period</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              stroke="#666" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              stroke="#666" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${value}`}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={10}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Revenue"
              stroke="url(#colorRevenue)"
              strokeWidth={3}
              dot={{ 
                stroke: '#10b981', 
                strokeWidth: 2, 
                r: 4,
                fill: '#fff'
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#10b981', 
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
            
            {/* Gradient for line */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      {revenue.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">Highest Day</p>
            <p className="text-xl font-bold text-gray-800">
              {formatCurrency(Math.max(...revenue.map(r => r.total || 0)))}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {revenue.find(r => r.total === Math.max(...revenue.map(r => r.total || 0)))?.date}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">Average Daily</p>
            <p className="text-xl font-bold text-gray-800">
              {formatCurrency(totalRevenue / revenue.length)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-500 text-sm">Growth Trend</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-600 font-semibold">
                {revenue.length > 1 ? 
                  `${(((revenue[revenue.length-1].total - revenue[0].total) / revenue[0].total) * 100).toFixed(1)}%` 
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {revenue.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No revenue data</h3>
          <p className="text-gray-500">Revenue data will appear here once available</p>
        </div>
      )}
    </div>
  );
}
