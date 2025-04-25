
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
}

export const StatsCards = ({ stats }: { stats: StatCardProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-full bg-opacity-10 ${stat.color.replace("text-", "bg-")}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <Badge variant="outline" className={stat.color}>{stat.change}</Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
