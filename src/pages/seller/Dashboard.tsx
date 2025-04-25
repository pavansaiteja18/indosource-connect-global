import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockStats = [
  {
    title: "Total Products",
    value: "32",
    icon: Package,
    change: "+4 this month",
    color: "text-blue-600"
  },
  {
    title: "Active Orders",
    value: "12",
    icon: ShoppingCart,
    change: "+3 this week",
    color: "text-green-600"
  },
  {
    title: "Revenue",
    value: "$18,426",
    icon: DollarSign,
    change: "+12% this quarter",
    color: "text-orange-600"
  },
  {
    title: "Inquiries",
    value: "8",
    icon: TrendingUp,
    change: "+2 today",
    color: "text-purple-600"
  }
];

const upcomingTasks = [
  { task: "Quality inspection for order #ORD-7829", date: "Today, 2:00 PM", priority: "High" },
  { task: "Review new supplier application", date: "Tomorrow, 10:00 AM", priority: "Medium" },
  { task: "Update product catalog", date: "Apr 27, 2025", priority: "Low" }
];

const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 16500 }
];

const recentOrders = [
  { 
    id: "ORD-7829", 
    buyer: "Global Retailers Inc.", 
    items: "Cotton t-shirts (1,200 units)", 
    amount: "$5,880", 
    status: "Processing" 
  },
  { 
    id: "ORD-7814", 
    buyer: "EcoLife Products", 
    items: "Bamboo kitchen utensils (800 units)", 
    amount: "$3,200", 
    status: "Shipped" 
  },
  { 
    id: "ORD-7802", 
    buyer: "Urban Home Co.", 
    items: "Handwoven baskets (300 units)", 
    amount: "$2,100", 
    status: "Completed" 
  }
];

const notifications = [
  { message: "New order request from Better Living LLC", time: "10 minutes ago" },
  { message: "Quality inspection scheduled for order #ORD-7829", time: "2 hours ago" },
  { message: "Price inquiry for bamboo cutting boards", time: "Yesterday" },
  { message: "Payment received for order #ORD-7802", time: "2 days ago" }
];

const SellerDashboard = () => {
  return (
    <DashboardLayout title="Seller Dashboard" userType="seller">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {mockStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full bg-opacity-10 ${stat.color.replace("text-", "bg-")}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge variant="outline" className={stat.color}>{stat.change}</Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium mb-1">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.date}</p>
                  </div>
                  <Badge 
                    className={
                      task.priority === "High" ? "bg-red-100 text-red-800" :
                      task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Tasks
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {salesData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{data.month}</span>
                    <span className="text-sm font-medium">${data.sales.toLocaleString()}</span>
                  </div>
                  <Progress value={(data.sales / 20000) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-gray-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex flex-col border-b border-gray-100 pb-3 last:border-0">
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              Top Buyers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.buyer}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{order.items}</p>
                    <p className="text-sm text-gray-500">{order.amount}</p>
                  </div>
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"}
                    `}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;
