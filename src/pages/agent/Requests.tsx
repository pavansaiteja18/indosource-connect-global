
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const mockRequests = [
  {
    id: "REQ-1092",
    title: "Organic Cotton T-shirts",
    buyer: "Global Retailers Inc.",
    location: "USA",
    description: "Looking for a supplier for 5,000 organic cotton t-shirts with custom printing. Need samples first before bulk order.",
    quantity: "5,000 units",
    budget: "$4-5 per unit",
    posted: "2025-04-22",
    category: "Textiles",
    status: "Open"
  },
  {
    id: "REQ-1087",
    title: "Handcrafted Wooden Furniture",
    buyer: "Home Essentials Co.",
    location: "Canada",
    description: "Seeking sustainable wooden furniture sets including coffee tables, end tables and bookshelves. Looking for traditional Indian craftsmanship.",
    quantity: "200 sets",
    budget: "$150-200 per set",
    posted: "2025-04-21",
    category: "Furniture",
    status: "Open"
  },
  {
    id: "REQ-1081",
    title: "Eco-friendly Home Products",
    buyer: "Green Living",
    location: "UK",
    description: "Searching for a variety of eco-friendly home products such as jute rugs, cotton cushion covers, and bamboo organizers.",
    quantity: "Varies by item",
    budget: "$10,000 total",
    posted: "2025-04-20",
    category: "Home Goods",
    status: "Open"
  },
  {
    id: "REQ-1075",
    title: "Handloom Silk Scarves",
    buyer: "Luxury Boutique Inc.",
    location: "France",
    description: "Looking for authentic Indian handloom silk scarves with traditional patterns. High-end quality required.",
    quantity: "300 pieces",
    budget: "$18-25 per piece",
    posted: "2025-04-18",
    category: "Fashion & Accessories",
    status: "Open"
  }
];

const AgentRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showProposalDialog, setShowProposalDialog] = useState(false);
  const { isConnected } = useBlockchain();
  
  const [proposal, setProposal] = useState({
    price: "",
    timeline: "",
    description: "",
    samples: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposal(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProposal(prev => ({
      ...prev,
      samples: e.target.checked
    }));
  };
  
  const viewRequest = (request: any) => {
    setSelectedRequest(request);
  };
  
  const openProposalForm = (request: any) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first to submit proposals");
      return;
    }
    
    setSelectedRequest(request);
    setShowProposalDialog(true);
  };
  
  const handleSubmitProposal = () => {
    // Validate inputs
    if (!proposal.price || !proposal.timeline || !proposal.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Would submit to blockchain in a real app
    toast.success("Proposal submitted successfully");
    setShowProposalDialog(false);
    
    // Reset form
    setProposal({
      price: "",
      timeline: "",
      description: "",
      samples: false
    });
  };

  const filteredRequests = mockRequests.filter(request => 
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Buyer Requests" userType="agent">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-80"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            🔍
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <CardDescription>
                      {request.buyer} • {request.location} • Posted on {request.posted}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 self-start">
                    {request.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{request.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{request.quantity}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">{request.budget}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{request.status}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => viewRequest(request)}
                >
                  View Details
                </Button>
                <Button
                  className="bg-marketplace-blue hover:bg-marketplace-blue-light"
                  onClick={() => openProposalForm(request)}
                >
                  Submit Proposal
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No requests found matching your search</p>
          </div>
        )}
      </div>
      
      {/* Proposal dialog */}
      {selectedRequest && (
        <Dialog open={showProposalDialog} onOpenChange={setShowProposalDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Proposal</DialogTitle>
              <DialogDescription>
                For {selectedRequest.title} request by {selectedRequest.buyer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price Quote*
                </label>
                <Input
                  id="price"
                  name="price"
                  placeholder="e.g. $4.50 per unit or $22,500 total"
                  value={proposal.price}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="timeline" className="text-sm font-medium">
                  Delivery Timeline*
                </label>
                <Input
                  id="timeline"
                  name="timeline"
                  placeholder="e.g. 4 weeks after order confirmation"
                  value={proposal.timeline}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Proposal Description*
                </label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe your approach, suppliers you'll work with, quality standards, etc."
                  value={proposal.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="samples"
                  name="samples"
                  checked={proposal.samples}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="samples">
                  I can provide samples before bulk production
                </label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowProposalDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-marketplace-blue hover:bg-marketplace-blue-light"
                onClick={handleSubmitProposal}
              >
                Submit Proposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default AgentRequests;
