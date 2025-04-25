
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Package,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Active Projects",
    value: "3",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-700",
    change: "+1 this week"
  },
  {
    title: "Pending Proposals",
    value: "7",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-700",
    change: "+3 new"
  },
  {
    title: "Completed Projects",
    value: "12",
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
    change: "+2 this month"
  },
  {
    title: "Issues to Resolve",
    value: "1",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700",
    change: "-2 from last week"
  }
];

const upcomingMilestones = [
  { 
    project: "Eco-friendly Bamboo Utensils",
    milestone: "Quality Inspection",
    date: "Apr 28, 2025",
    progress: 65 
  },
  { 
    project: "Organic Cotton T-shirts",
    milestone: "Production Sample Review",
    date: "May 2, 2025",
    progress: 40 
  },
  { 
    project: "Handwoven Baskets",
    milestone: "Shipping Documentation",
    date: "May 5, 2025",
    progress: 25 
  }
];

const recentActivities = [
  { text: "Agent J. Patel submitted a proposal for your textile sourcing request", time: "2 hours ago" },
  { text: "Quality inspection completed for eco-friendly bamboo utensils order", time: "Yesterday" },
  { text: "Payment milestone released for cotton bag manufacturing project", time: "2 days ago" },
  { text: "New message from agent regarding packaging options", time: "3 days ago" }
];

const recentMessages = [
  {
    id: 1,
    sender: "Rahul Sharma",
    avatar: "/placeholder.svg",
    message: "Hi there! I've sourced the materials you requested for the bamboo utensils project.",
    time: "Just now",
    unread: true
  },
  {
    id: 2,
    sender: "Priya Patel",
    avatar: "/placeholder.svg",
    message: "The cotton samples are ready for your review. When would you like to schedule a call?",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    sender: "Amit Verma",
    avatar: "/placeholder.svg",
    message: "I've updated the shipping documentation for your order. Please check and approve.",
    time: "Yesterday",
    unread: false
  }
];

const BuyerDashboard = () => {
  const { isConnected, balance, transactions } = useBlockchain();

  return (
    <DashboardLayout title="Buyer Dashboard" userType="buyer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full ${stat.color.replace("text-", "bg-")}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`} />
                </div>
                <Badge variant="outline" className={stat.color.replace("bg-", "text-")}>
                  {stat.change}
                </Badge>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{milestone.project}</p>
                      <p className="text-sm text-gray-500">{milestone.milestone} • {milestone.date}</p>
                    </div>
                    <Badge variant="outline">
                      {milestone.progress}%
                    </Badge>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Milestones
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg ${msg.unread ? "bg-blue-50" : "bg-gray-50"} hover:bg-gray-100 transition-colors cursor-pointer`}>
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <img src={msg.avatar} alt={msg.sender} className="rounded-full" />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{msg.sender}</p>
                        <p className="text-xs text-gray-500">{msg.time}</p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{msg.message}</p>
                    </div>
                    {msg.unread && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Messages
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-500" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-3xl font-bold">{balance.toFixed(2)} ETH</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Recent Transactions</p>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((tx, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="truncate max-w-[150px]">{tx.description}</span>
                        <span className={tx.from === tx.to ? "text-gray-600" : tx.from === tx.to ? "text-green-600" : "text-red-600"}>
                          {tx.from === tx.to ? "" : tx.from === tx.to ? "+" : "-"}{tx.amount.toFixed(2)} ETH
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Connect your wallet to view balance and transactions</p>
                <p className="text-sm text-gray-400">Use the wallet button in the sidebar to connect</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;
