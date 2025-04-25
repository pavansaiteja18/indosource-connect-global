
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

const BuyerProfile = () => {
  const { user } = useAuth();
  const { isConnected, walletAddress, transactions } = useBlockchain();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "Global Importers Inc.",
    phone: "+1 555-123-4567",
    country: "United States",
    about: "We are a medium-sized retail business looking to expand our product line with high-quality items from Indian manufacturers.",
    website: "www.globalimporters.com"
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
    <DashboardLayout title="My Profile" userType="buyer">
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Transactions</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                  <label className="text-sm font-medium">Company</label>
                  {isEditing ? (
                    <Input 
                      name="company"
                      value={profileData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.company}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Phone</label>
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
                  <label className="text-sm font-medium">Country</label>
                  {isEditing ? (
                    <Input 
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1">{profileData.country}</p>
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
                  <label className="text-sm font-medium">About</label>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Wallet</CardTitle>
            </CardHeader>
            
            <CardContent>
              {isConnected ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Connected Wallet</h3>
                    <p className="mb-1">
                      <span className="text-sm font-medium text-gray-500 mr-2">Address:</span>
                      {walletAddress}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Transaction History</h3>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium text-left">Description</th>
                            <th className="px-4 py-3 text-sm font-medium text-left">Amount</th>
                            <th className="px-4 py-3 text-sm font-medium text-left">Date</th>
                            <th className="px-4 py-3 text-sm font-medium text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-3 text-sm">{tx.description}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={tx.from === walletAddress ? "text-red-600" : "text-green-600"}>
                                  {tx.from === walletAddress ? "-" : "+"}{tx.amount.toFixed(2)} ETH
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {tx.timestamp.toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <Badge 
                                  className={
                                    tx.status === "completed" ? "bg-green-100 text-green-800" : 
                                    tx.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                                    "bg-red-100 text-red-800"
                                  }
                                >
                                  {tx.status === "completed" ? "Completed" : 
                                   tx.status === "pending" ? "Pending" : "Failed"}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                          
                          {transactions.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                No transactions found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Connect your wallet to view transactions</p>
                  <p className="text-sm text-gray-400 mb-6">Use the wallet button in the sidebar to connect</p>
                  
                  <Button className="bg-marketplace-blue hover:bg-marketplace-blue-light">
                    Connect Wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-proposals" className="mr-2" defaultChecked />
                      <label htmlFor="notify-proposals">Notify me when I receive new proposals</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-messages" className="mr-2" defaultChecked />
                      <label htmlFor="notify-messages">Notify me when I receive new messages</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-milestones" className="mr-2" defaultChecked />
                      <label htmlFor="notify-milestones">Notify me about project milestone updates</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-marketing" className="mr-2" />
                      <label htmlFor="notify-marketing">Receive marketing communications</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Email Frequency</h3>
                  <select className="border rounded-md p-2 w-full md:w-auto">
                    <option>Real-time</option>
                    <option>Daily digest</option>
                    <option>Weekly digest</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-marketplace-blue hover:bg-marketplace-blue-light">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default BuyerProfile;
