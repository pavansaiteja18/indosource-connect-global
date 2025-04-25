
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

interface Task {
  task: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

export const UpcomingTasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
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
  );
};
