
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Wallet } from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const { pathname } = useLocation();
  const { connect, disconnect, isConnected, walletAddress, balance } = useBlockchain();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "bg-marketplace-blue text-white transition-all duration-300 h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-marketplace-blue-light">
        {!collapsed && (
          <div className="font-bold text-xl">IndoSource</div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)} 
          className="hover:bg-marketplace-blue-light text-white"
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>
      
      <div className="py-4">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center py-2 px-4 text-sm hover:bg-marketplace-blue-light",
              pathname === item.href && "bg-marketplace-blue-light font-semibold"
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {isConnected ? (
          <div className={cn("text-sm", !collapsed && "border-t border-marketplace-blue-light pt-4")}>
            {!collapsed && (
              <>
                <div className="text-xs opacity-80 mb-1">Wallet</div>
                <div className="font-medium truncate mb-1">
                  {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
                </div>
                <div className="text-marketplace-orange font-bold mb-2">{balance.toFixed(2)} ETH</div>
              </>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={disconnect}
              className={cn(
                "bg-red-600 hover:bg-red-700",
                collapsed && "w-full"
              )}
            >
              {collapsed ? <Wallet className="h-4 w-4" /> : "Disconnect"}
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={connect}
            className={cn(
              "bg-marketplace-orange hover:bg-orange-600 text-white",
              collapsed && "w-full"
            )}
          >
            {collapsed ? <Wallet className="h-4 w-4" /> : "Connect Wallet"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
