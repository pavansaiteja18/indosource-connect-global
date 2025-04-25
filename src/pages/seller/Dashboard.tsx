
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp
} from "lucide-react";

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
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full bg-opacity-10 ${stat.color.replace("text-", "bg-")}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-gray-500">Order ID</th>
                      <th className="pb-3 text-sm font-medium text-gray-500">Buyer</th>
                      <th className="pb-3 text-sm font-medium text-gray-500">Items</th>
                      <th className="pb-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-100">
                        <td className="py-3 text-sm">{order.id}</td>
                        <td className="py-3 text-sm">{order.buyer}</td>
                        <td className="py-3 text-sm">{order.items}</td>
                        <td className="py-3 text-sm font-medium">{order.amount}</td>
                        <td className="py-3 text-sm">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Button variant="ghost" size="sm">Mark all read</Button>
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerDashboard;
