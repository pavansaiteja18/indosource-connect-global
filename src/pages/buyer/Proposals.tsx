
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockProposals = [
  {
    id: "prop-1",
    agentName: "Aarav Patel",
    agentLocation: "Mumbai, Maharashtra",
    requestTitle: "Organic Cotton T-shirts",
    price: "$4.80 per unit",
    timeline: "4 weeks",
    rating: 4.8,
    status: "New"
  },
  {
    id: "prop-2",
    agentName: "Priya Sharma",
    agentLocation: "Delhi, NCR",
    requestTitle: "Organic Cotton T-shirts",
    price: "$5.10 per unit",
    timeline: "3 weeks",
    rating: 4.5,
    status: "New"
  },
  {
    id: "prop-3",
    agentName: "Vikram Singh",
    agentLocation: "Tirupur, Tamil Nadu",
    requestTitle: "Stainless Steel Kitchenware",
    price: "$8,500 total",
    timeline: "6 weeks",
    rating: 4.2,
    status: "Reviewing"
  }
];

const BuyerProposals = () => {
  return (
    <DashboardLayout title="Agent Proposals" userType="buyer">
      <div className="space-y-6">
        {mockProposals.map((proposal) => (
          <Card key={proposal.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Proposal for {proposal.requestTitle}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">From {proposal.agentName} • {proposal.agentLocation}</p>
              </div>
              
              <Badge 
                className={
                  proposal.status === "New" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {proposal.status}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Quoted Price</p>
                  <p className="text-lg font-semibold">{proposal.price}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="text-lg font-semibold">{proposal.timeline}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Agent Rating</p>
                  <p className="text-lg font-semibold">⭐ {proposal.rating}/5</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <Button variant="outline">View Details</Button>
                <Button className="bg-marketplace-teal hover:bg-teal-600">
                  Accept Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default BuyerProposals;
