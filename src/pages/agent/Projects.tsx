
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const mockProjects = [
  {
    id: "PROJ-3045",
    title: "Designer Leather Bags",
    buyer: "Fashion Forward Inc.",
    location: "USA",
    startDate: "2025-03-15",
    endDate: "2025-05-30",
    status: "In Progress",
    progress: 75,
    milestones: [
      { name: "Sample Approval", status: "Completed", date: "2025-03-25" },
      { name: "Production Start", status: "Completed", date: "2025-04-05" },
      { name: "Quality Inspection", status: "In Progress", date: "2025-04-28" },
      { name: "Packaging & Shipping", status: "Pending", date: "2025-05-15" }
    ]
  },
  {
    id: "PROJ-3039",
    title: "Bamboo Kitchen Utensils",
    buyer: "Organic Home",
    location: "Canada",
    startDate: "2025-03-20",
    endDate: "2025-06-15",
    status: "In Progress",
    progress: 40,
    milestones: [
      { name: "Design Approval", status: "Completed", date: "2025-03-30" },
      { name: "Production Samples", status: "In Progress", date: "2025-05-10" },
      { name: "Bulk Production", status: "Pending", date: "2025-05-25" },
      { name: "Quality Check & Shipping", status: "Pending", date: "2025-06-10" }
    ]
  },
  {
    id: "PROJ-3032",
    title: "Handwoven Textiles",
    buyer: "Global Trade Co.",
    location: "UK",
    startDate: "2025-02-10",
    endDate: "2025-05-05",
    status: "In Progress",
    progress: 90,
    milestones: [
      { name: "Design Approval", status: "Completed", date: "2025-02-20" },
      { name: "Production Start", status: "Completed", date: "2025-03-01" },
      { name: "Quality Check", status: "Completed", date: "2025-04-15" },
      { name: "Shipping Arrangements", status: "In Progress", date: "2025-04-30" }
    ]
  },
  {
    id: "PROJ-3024",
    title: "Ceramic Dinner Sets",
    buyer: "Home Luxury Inc.",
    location: "Australia",
    startDate: "2025-01-15",
    endDate: "2025-04-10",
    status: "Completed",
    progress: 100,
    milestones: [
      { name: "Design Approval", status: "Completed", date: "2025-01-25" },
      { name: "Production Start", status: "Completed", date: "2025-02-05" },
      { name: "Quality Check", status: "Completed", date: "2025-03-20" },
      { name: "Shipping & Delivery", status: "Completed", date: "2025-04-08" }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AgentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [milestoneUpdate, setMilestoneUpdate] = useState({
    index: -1,
    status: "",
    notes: ""
  });
  
  const viewProjectDetails = (project: any) => {
    setSelectedProject(project);
    setShowUpdateDialog(true);
  };
  
  const openMilestoneUpdate = (projectId: string, milestoneIndex: number, currentStatus: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) return;
    
    setSelectedProject(project);
    setMilestoneUpdate({
      index: milestoneIndex,
      status: currentStatus,
      notes: ""
    });
    
    setShowMilestoneDialog(true);
  };
  
  const handleMilestoneStatusChange = (status: string) => {
    setMilestoneUpdate(prev => ({
      ...prev,
      status
    }));
  };
  
  const handleMilestoneNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMilestoneUpdate(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };
  
  const updateMilestone = () => {
    // Would update in a real app
    toast.success(`Milestone status updated to ${milestoneUpdate.status}`);
    setShowMilestoneDialog(false);
  };

  return (
    <DashboardLayout title="Active Projects" userType="agent">
      <div className="space-y-6">
        {mockProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {project.buyer} • {project.location} • Started {project.startDate}
                </p>
              </div>
              
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-3">Milestones</h3>
                <div className="space-y-3">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{milestone.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({milestone.date})</span>
                      </div>
                      <div className="flex items-center">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                        {(milestone.status === "In Progress" || milestone.status === "Pending") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => openMilestoneUpdate(project.id, index, milestone.status)}
                          >
                            Update
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Target Completion</p>
                  <p className="font-medium">{project.endDate}</p>
                </div>
                
                <Button
                  onClick={() => viewProjectDetails(project)}
                  className="bg-marketplace-blue hover:bg-marketplace-blue-light"
                >
                  Project Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Project details dialog */}
      {selectedProject && (
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                Project details and communications
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Buyer</p>
                  <p>{selectedProject.buyer}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p>{selectedProject.location}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p>{selectedProject.startDate}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Expected Completion</p>
                  <p>{selectedProject.endDate}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-3">Recent Communications</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto border rounded-md p-3">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">You</p>
                      <p className="text-xs text-gray-500">Today, 10:23 AM</p>
                    </div>
                    <p className="text-sm mt-1">Production is on track. We're expecting to meet the quality inspection milestone by the end of the week.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{selectedProject.buyer}</p>
                      <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                    </div>
                    <p className="text-sm mt-1">Great to hear! Please send photos of the finished samples when they're ready.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">You</p>
                      <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                    </div>
                    <p className="text-sm mt-1">I've visited the production facility today. The first batch is looking good and matches the approved samples.</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Textarea placeholder="Type your message..." />
                  <div className="flex justify-end">
                    <Button>Send Message</Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-3">Documents & Files</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>product_specifications.pdf</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>quality_standards.docx</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <span>approved_samples.zip</span>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Milestone update dialog */}
      {selectedProject && milestoneUpdate.index !== -1 && (
        <Dialog open={showMilestoneDialog} onOpenChange={setShowMilestoneDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Milestone Status</DialogTitle>
              <DialogDescription>
                {selectedProject.milestones[milestoneUpdate.index].name} for {selectedProject.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Current Status</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pending"
                      name="status"
                      value="Pending"
                      checked={milestoneUpdate.status === "Pending"}
                      onChange={() => handleMilestoneStatusChange("Pending")}
                      className="mr-2"
                    />
                    <label htmlFor="pending">Pending</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="in-progress"
                      name="status"
                      value="In Progress"
                      checked={milestoneUpdate.status === "In Progress"}
                      onChange={() => handleMilestoneStatusChange("In Progress")}
                      className="mr-2"
                    />
                    <label htmlFor="in-progress">In Progress</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="completed"
                      name="status"
                      value="Completed"
                      checked={milestoneUpdate.status === "Completed"}
                      onChange={() => handleMilestoneStatusChange("Completed")}
                      className="mr-2"
                    />
                    <label htmlFor="completed">Completed</label>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Update Notes
                </label>
                <Textarea
                  id="notes"
                  value={milestoneUpdate.notes}
                  onChange={handleMilestoneNotesChange}
                  placeholder="Add any details about this milestone update..."
                />
              </div>
              
              <div className="mt-2">
                <Input 
                  type="file" 
                  className="cursor-pointer" 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload photos or documents related to this milestone (optional)
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowMilestoneDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-marketplace-blue hover:bg-marketplace-blue-light"
                onClick={updateMilestone}
              >
                Update Milestone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default AgentProjects;
