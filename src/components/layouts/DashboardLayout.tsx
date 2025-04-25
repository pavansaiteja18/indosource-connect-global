
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogOut, Settings, User } from "lucide-react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userType: "buyer" | "seller" | "agent";
}

const DashboardLayout = ({ children, title, userType }: DashboardLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const buyerNavItems = [
    { label: "Dashboard", icon: Home, href: "/buyer" },
    { label: "Requests", icon: User, href: "/buyer/requests" },
    { label: "Proposals", icon: User, href: "/buyer/proposals" },
    { label: "Projects", icon: User, href: "/buyer/projects" },
    { label: "Profile", icon: Settings, href: "/buyer/profile" },
  ];

  const sellerNavItems = [
    { label: "Dashboard", icon: Home, href: "/seller" },
    { label: "Products", icon: User, href: "/seller/products" },
    { label: "Orders", icon: User, href: "/seller/orders" },
    { label: "Profile", icon: Settings, href: "/seller/profile" },
  ];

  const agentNavItems = [
    { label: "Dashboard", icon: Home, href: "/agent" },
    { label: "Requests", icon: User, href: "/agent/requests" },
    { label: "Projects", icon: User, href: "/agent/projects" },
    { label: "Suppliers", icon: User, href: "/agent/suppliers" },
    { label: "Profile", icon: Settings, href: "/agent/profile" },
  ];

  const navItemsMap = {
    buyer: buyerNavItems,
    seller: sellerNavItems,
    agent: agentNavItems,
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar items={navItemsMap[userType]} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
