
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "sonner";

const mockRequests = [
  {
    id: "req-1",
    title: "Organic Cotton T-shirts",
    description: "Looking for a supplier for 5,000 organic cotton t-shirts with custom printing.",
    category: "Textiles",
    status: "Open",
    proposals: 3,
    created: "2025-03-28"
  },
  {
    id: "req-2",
    title: "Stainless Steel Kitchenware",
    description: "Need to source high-quality stainless steel kitchen utensils for retail.",
    category: "Home Goods",
    status: "Open",
    proposals: 5,
    created: "2025-03-25"
  },
  {
    id: "req-3",
    title: "LED Light Fixtures",
    description: "Seeking manufacturer for custom LED light fixtures for commercial properties.",
    category: "Electronics",
    status: "Closed",
    proposals: 4,
    created: "2025-03-20"
  }
];

const categories = [
  "Textiles",
  "Electronics",
  "Home Goods",
  "Fashion & Accessories",
  "Industrial Equipment",
  "Food & Beverages",
  "Handicrafts",
  "Furniture",
  "Automotive Parts",
  "Other"
];

const BuyerRequests = () => {
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState(mockRequests);
  
  // New request form state
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    budget: "",
    deadline: ""
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setNewRequest(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const handleCreateRequest = () => {
    // Validate inputs
    if (!newRequest.title || !newRequest.description || !newRequest.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create new request
    const newId = `req-${requests.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    const createdRequest = {
      id: newId,
      title: newRequest.title,
      description: newRequest.description,
      category: newRequest.category,
      status: "Open",
      proposals: 0,
      created: today
    };
    
    setRequests([createdRequest, ...requests]);
    
    // Reset form and close dialog
    setNewRequest({
      title: "",
      description: "",
      category: "",
      quantity: "",
      budget: "",
      deadline: ""
    });
    
    setShowNewRequestDialog(false);
    toast.success("Sourcing request created successfully");
  };
  
  const filteredRequests = requests.filter(request => 
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Sourcing Requests" userType="buyer">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            🔍
          </span>
        </div>
        
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button className="bg-marketplace-blue hover:bg-marketplace-blue-light">
              Create New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Sourcing Request</DialogTitle>
              <DialogDescription>
                Fill in the details of your sourcing request to get proposals from agents
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Request Title*
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Organic Cotton T-shirts"
                  value={newRequest.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description*
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your requirements in detail..."
                  rows={4}
                  value={newRequest.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category*
                </label>
                <Select 
                  value={newRequest.category} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g. 5000 units"
                    value={newRequest.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="budget" className="text-sm font-medium">
                    Budget
                  </label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="e.g. $5000-$8000"
                    value={newRequest.budget}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="deadline" className="text-sm font-medium">
                  Deadline
                </label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={newRequest.deadline}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowNewRequestDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-marketplace-blue hover:bg-marketplace-blue-light"
                onClick={handleCreateRequest}
              >
                Create Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{request.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Created on {request.created} • Category: {request.category}
                  </CardDescription>
                </div>
                <Badge 
                  className={
                    request.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }
                >
                  {request.status}
                </Badge>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{request.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">
                      {request.proposals} Proposal{request.proposals !== 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {request.status === "Open" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Close Request
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No requests found</p>
            <Button 
              variant="outline" 
              onClick={() => setShowNewRequestDialog(true)}
            >
              Create your first request
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BuyerRequests;
