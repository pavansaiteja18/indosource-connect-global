
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  ClipboardList,
  Package,
  TrendingUp
} from "lucide-react";

const mockStats = [
  {
    title: "Active Clients",
    value: "8",
    icon: Users,
    change: "+2 this month",
    color: "text-blue-600"
  },
  {
    title: "Open Requests",
    value: "12",
    icon: ClipboardList,
    change: "+5 this week",
    color: "text-green-600"
  },
  {
    title: "Active Projects",
    value: "5",
    icon: Package,
    change: "+1 this week",
    color: "text-orange-600"
  },
  {
    title: "Revenue",
    value: "₹86,400",
    icon: TrendingUp,
    change: "+14% this quarter",
    color: "text-purple-600"
  }
];

const recentRequests = [
  { 
    id: "REQ-1092", 
    buyer: "Global Retailers Inc.", 
    product: "Organic Cotton T-shirts", 
    quantity: "5,000 units", 
    location: "USA",
    posted: "2 hours ago" 
  },
  { 
    id: "REQ-1087", 
    buyer: "Home Essentials Co.", 
    product: "Handcrafted Wooden Furniture", 
    quantity: "200 sets", 
    location: "Canada",
    posted: "Yesterday" 
  },
  { 
    id: "REQ-1081", 
    buyer: "Green Living", 
    product: "Eco-friendly Home Products", 
    quantity: "Varies", 
    location: "UK",
    posted: "2 days ago" 
  }
];

const activeProjects = [
  {
    buyer: "Fashion Forward Inc.",
    product: "Designer Leather Bags",
    progress: 75,
    nextMilestone: "Quality Inspection",
    dueDate: "2025-04-28"
  },
  {
    buyer: "Organic Home",
    product: "Bamboo Kitchen Utensils",
    progress: 40,
    nextMilestone: "Production Samples",
    dueDate: "2025-05-10"
  },
  {
    buyer: "Global Trade Co.",
    product: "Handwoven Textiles",
    progress: 90,
    nextMilestone: "Shipping Arrangements",
    dueDate: "2025-04-30"
  }
];

const AgentDashboard = () => {
  return (
    <DashboardLayout title="Agent Dashboard" userType="agent">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>New Buyer Requests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div key={index} className="flex flex-col border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{request.product}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{request.buyer}</span>
                        <span className="mx-2">•</span>
                        <span>{request.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{request.quantity}</p>
                      <p className="text-xs text-gray-500">{request.posted}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Projects</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeProjects.map((project, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{project.product}</p>
                    <p className="text-sm text-gray-500">{project.buyer}</p>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Next: {project.nextMilestone}</span>
                    <span className="font-medium">Due: {project.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Verified Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start mb-6">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Verified Agent Status</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your profile has been verified by IndoSource. This verification badge is displayed to potential buyers, 
                  increasing your chance of being selected for projects.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Textiles</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Furniture</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Handicrafts</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Home Decor</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Regions Covered</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Delhi NCR</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Rajasthan</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Gujarat</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Client Rating</h3>
                <div className="flex items-center">
                  <div className="text-xl font-bold mr-2">4.8</div>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <div className="ml-2 text-sm text-gray-500">(36 reviews)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
