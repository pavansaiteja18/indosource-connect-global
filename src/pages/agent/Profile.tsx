
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlockchain } from "@/contexts/BlockchainContext";

const AgentProfile = () => {
  const { user } = useAuth();
  const { isConnected, walletAddress } = useBlockchain();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    location: "Delhi, NCR, India",
    about: "Experienced sourcing agent with over 8 years in the industry, specializing in textiles, handicrafts, and home goods. Strong network of verified suppliers across Northern India.",
    website: "www.indiansourcingpro.com",
    languages: "English, Hindi, Punjabi",
    expertise: "Textiles, Furniture, Handicrafts, Home Decor"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = () => {
    // Validate inputs
    if (!profileData.name || !profileData.email) {
      toast.error("Name and email are required");
      return;
    }
    
    // In a real app, would save to backend
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <DashboardLayout title="My Profile" userType="agent">
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Personal Information</TabsTrigger>
          <TabsTrigger value="expertise">Expertise & Services</TabsTrigger>
          <TabsTrigger value="verification">Verification Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-marketplace-blue hover:bg-marketplace-blue-light" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <Input 
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input 
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  {isEditing ? (
                    <Input 
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location</label>
                  {isEditing ? (
                    <Input 
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.location}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Languages</label>
                  {isEditing ? (
                    <Input 
                      name="languages"
                      value={profileData.languages}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.languages}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Website</label>
                  {isEditing ? (
                    <Input 
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.website}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">About Me</label>
                  {isEditing ? (
                    <Textarea 
                      name="about"
                      value={profileData.about}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={4}
                    />
                  ) : (
                    <p className="mt-1">{profileData.about}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium text-lg mb-4">Connected Wallet</h3>
                
                {isConnected ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">Connected</span>
                    </div>
                    
                    <p className="mb-2">
                      <span className="text-sm font-medium text-gray-500 mr-2">Address:</span>
                      {walletAddress}
                    </p>
                    
                    <p className="text-sm text-gray-600 mt-4">
                      This wallet is used to receive payments from clients and for blockchain transaction verification.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-md">
                    <p className="text-gray-500 mb-4">Connect your blockchain wallet to receive payments</p>
                    <p className="text-sm text-gray-400 mb-6">Use the wallet button in the sidebar to connect</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expertise">
          <Card>
            <CardHeader>
              <CardTitle>Expertise & Services</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-4">Areas of Expertise</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-medium">Primary Expertise</label>
                    {isEditing ? (
                      <Input 
                        name="expertise"
                        value={profileData.expertise}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1">{profileData.expertise}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Years of Experience</label>
                    <p className="mt-1">8+ years</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="manufacturing" className="mr-2" checked disabled />
                    <label htmlFor="manufacturing">Manufacturing Coordination</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="quality" className="mr-2" checked disabled />
                    <label htmlFor="quality">Quality Inspection & Control</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="supplier" className="mr-2" checked disabled />
                    <label htmlFor="supplier">Supplier Identification & Management</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="negotiation" className="mr-2" checked disabled />
                    <label htmlFor="negotiation">Price Negotiation</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="logistics" className="mr-2" checked disabled />
                    <label htmlFor="logistics">Logistics & Shipping Coordination</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="compliance" className="mr-2" checked disabled />
                    <label htmlFor="compliance">Compliance & Certification Guidance</label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium text-lg mb-4">Regions Covered</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <div className="font-medium">Delhi NCR</div>
                    <div className="text-sm text-gray-500">Primary</div>
                  </div>
                  
                  <div className="border rounded-md p-3 text-center">
                    <div className="font-medium">Rajasthan</div>
                    <div className="text-sm text-gray-500">Regular</div>
                  </div>
                  
                  <div className="border rounded-md p-3 text-center">
                    <div className="font-medium">Gujarat</div>
                    <div className="text-sm text-gray-500">Regular</div>
                  </div>
                  
                  <div className="border rounded-md p-3 text-center">
                    <div className="font-medium">Uttar Pradesh</div>
                    <div className="text-sm text-gray-500">Occasional</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start mb-8">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Verified Agent</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Your profile has been verified by the IndoSource team. This verification badge appears on your profile
                    and increases trust with potential clients.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">Verification Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Identity Verification</span>
                      <span className="text-green-600 font-medium">Completed</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Business Registration</span>
                      <span className="text-green-600 font-medium">Verified</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Address Verification</span>
                      <span className="text-green-600 font-medium">Completed</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Professional References</span>
                      <span className="text-green-600 font-medium">3 Verified</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Background Check</span>
                      <span className="text-green-600 font-medium">Passed</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Client Feedback</h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold mr-2">4.8</div>
                    <div className="flex text-yellow-400">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className="ml-2 text-sm text-gray-500">(36 reviews)</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">John D. from Global Retailers</span>
                        <div className="flex text-yellow-400 text-sm">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        "Excellent service! Found us quality suppliers for our textile needs and handled
                        all quality control expertly. Communication was clear throughout."
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Sarah M. from EcoLife Products</span>
                        <div className="flex text-yellow-400 text-sm">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        "Helped us source sustainable materials when other agents couldn't.
                        Very knowledgeable about eco-friendly options in the Indian market."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AgentProfile;
