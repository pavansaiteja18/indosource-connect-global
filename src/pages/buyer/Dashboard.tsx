
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const BuyerDashboard = () => {
  const { isConnected, balance, transactions } = useBlockchain();

  const stats = [
    {
      title: "Active Projects",
      value: "3",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Pending Proposals",
      value: "7",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Completed Projects",
      value: "12",
      icon: CheckCircle,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Issues to Resolve",
      value: "1",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700"
    }
  ];

  const recentActivities = [
    { text: "Agent J. Patel submitted a proposal for your textile sourcing request", time: "2 hours ago" },
    { text: "Quality inspection completed for eco-friendly bamboo utensils order", time: "Yesterday" },
    { text: "Payment milestone released for cotton bag manufacturing project", time: "2 days ago" },
    { text: "New message from agent regarding packaging options", time: "3 days ago" }
  ];

  return (
    <DashboardLayout title="Buyer Dashboard" userType="buyer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
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

        <div>
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
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;
