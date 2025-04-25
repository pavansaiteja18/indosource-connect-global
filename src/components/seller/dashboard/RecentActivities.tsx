
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronRight } from "lucide-react";

interface Notification {
  message: string;
  time: string;
}

export const RecentActivities = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-gray-500" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex flex-col border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded-md transition-colors">
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Notifications
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
