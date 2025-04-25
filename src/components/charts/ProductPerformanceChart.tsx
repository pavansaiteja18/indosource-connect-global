
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Cotton T-shirts", value: 400 },
  { name: "Bamboo Utensils", value: 300 },
  { name: "Handwoven Baskets", value: 200 },
  { name: "Jute Bags", value: 150 },
  { name: "Silk Scarves", value: 100 }
];

const COLORS = ["#1A365D", "#2A4365", "#ED8936", "#DD6B20", "#38B2AC"];

export const ProductPerformanceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} units`, 'Sales']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformanceChart;
