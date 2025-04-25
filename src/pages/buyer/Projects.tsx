
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockProjects = [
  {
    id: "proj-1",
    title: "Handcrafted Wooden Furniture Set",
    agentName: "Rajesh Kumar",
    startDate: "2025-03-01",
    endDate: "2025-05-30",
    status: "In Progress",
    progress: 65,
    nextMilestone: "Quality Inspection",
    nextMilestoneDate: "2025-04-28"
  },
  {
    id: "proj-2",
    title: "Eco-friendly Bamboo Kitchenware",
    agentName: "Ananya Desai",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    status: "In Progress",
    progress: 40,
    nextMilestone: "Production Sample Approval",
    nextMilestoneDate: "2025-04-30"
  },
  {
    id: "proj-3",
    title: "Handloom Cotton Scarves",
    agentName: "Maya Reddy",
    startDate: "2025-01-10",
    endDate: "2025-03-20",
    status: "Completed",
    progress: 100,
    nextMilestone: "None",
    nextMilestoneDate: "N/A"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Delayed":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BuyerProjects = () => {
  return (
    <DashboardLayout title="My Projects" userType="buyer">
      <div className="space-y-6">
        {mockProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Managed by {project.agentName} • Started {project.startDate}
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Next Milestone</p>
                  <p className="font-medium">{project.nextMilestone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{project.nextMilestoneDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Expected Completion</p>
                  <p className="font-medium">{project.endDate}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-4">
                <Button variant="outline">
                  View Details
                </Button>
                {project.status === "In Progress" && (
                  <Button className="bg-marketplace-blue hover:bg-marketplace-blue-light">
                    Review Milestone
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default BuyerProjects;
