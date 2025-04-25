
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { setUserType } = useAuth();
  
  const handleRoleSelect = (role: "buyer" | "seller" | "agent") => {
    setUserType(role);
    navigate("/register");
  };

  return (
    <div className="bg-gradient-to-br from-marketplace-blue to-marketplace-blue-light text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connect with <span className="text-marketplace-orange">Verified</span> Indian Sourcing Experts
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8">
              The premier platform connecting international buyers with verified Indian sourcing agents to streamline procurement, manufacturing coordination, and supplier discovery.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                size="lg"
                className="bg-marketplace-orange hover:bg-orange-500 text-white text-lg"
                onClick={() => handleRoleSelect("buyer")}
              >
                I'm a Buyer
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white text-white text-lg"
                onClick={() => handleRoleSelect("seller")}
              >
                I'm a Seller
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white text-white text-lg"
                onClick={() => handleRoleSelect("agent")}
              >
                I'm an Agent
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-marketplace-orange rounded-full w-64 h-64 opacity-20 animate-pulse-slow"></div>
              <div className="relative z-10 animate-float">
                <img 
                  src="/placeholder.svg" 
                  alt="Global Sourcing" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
