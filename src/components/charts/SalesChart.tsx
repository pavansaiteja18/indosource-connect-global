
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer, ChartTooltip, ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, LineChart, Line  
} from "recharts";

const monthlyData = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 2000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 }
];

const weeklyData = [
  { name: "Mon", sales: 1000, revenue: 700 },
  { name: "Tue", sales: 1200, revenue: 800 },
  { name: "Wed", sales: 1300, revenue: 900 },
  { name: "Thu", sales: 900, revenue: 600 },
  { name: "Fri", sales: 1500, revenue: 1000 },
  { name: "Sat", sales: 1700, revenue: 1200 },
  { name: "Sun", sales: 1200, revenue: 800 }
];

export const SalesChart = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");
  
  const data = period === "weekly" ? weeklyData : monthlyData;
  
  const renderChart = () => {
    switch(chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A365D" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1A365D" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ED8936" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ED8936" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sales" stroke="#1A365D" fillOpacity={1} fill="url(#colorSales)" />
            <Area type="monotone" dataKey="revenue" stroke="#ED8936" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sales" fill="#1A365D" />
            <Bar dataKey="revenue" fill="#ED8936" />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="sales" stroke="#1A365D" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#ED8936" strokeWidth={2} />
          </LineChart>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Sales Overview</CardTitle>
        <div className="flex space-x-2">
          <Tabs 
            value={period} 
            onValueChange={(val) => setPeriod(val as "weekly" | "monthly")}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs 
            value={chartType} 
            onValueChange={(val) => setChartType(val as "area" | "bar" | "line")}
            className="w-[150px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-lg">
        <p className="text-sm font-bold">{payload[0].payload.name}</p>
        <p className="text-sm text-gray-700">
          <span className="inline-block w-3 h-3 bg-marketplace-blue mr-2 rounded-sm"></span>
          Sales: {payload[0].value}
        </p>
        <p className="text-sm text-gray-700">
          <span className="inline-block w-3 h-3 bg-marketplace-orange mr-2 rounded-sm"></span>
          Revenue: {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

export default SalesChart;
