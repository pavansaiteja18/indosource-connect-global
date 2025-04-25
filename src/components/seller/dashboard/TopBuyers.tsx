
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight } from "lucide-react";

interface Order {
  id: string;
  buyer: string;
  items: string;
  amount: string;
  status: "Processing" | "Shipped" | "Completed";
}

export const TopBuyers = ({ orders }: { orders: Order[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          Top Buyers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium">{order.buyer}</p>
                <div className="flex items-center">
                  <span className="text-xs text-marketplace-blue font-medium">{order.id}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{order.items}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">{order.amount}</p>
                <span 
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"}
                  `}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Buyers
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
