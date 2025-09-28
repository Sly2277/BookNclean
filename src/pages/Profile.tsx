import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, CreditCard, Package, Bell, Shield } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                    <Badge className="mt-2">Premium Member</Badge>
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+233 20 123 4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address" 
                      defaultValue="123 Main Street, Accra, Ghana"
                      rows={3}
                    />
                  </div>
                  
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Your order history will appear here once you place your first order.
                  </p>
                  <Button>Browse Services</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Premium Plan</h3>
                      <p className="text-muted-foreground">₵199/month</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next billing date:</span>
                      <span>January 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renewal:</span>
                      <span>Automatic</span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">**** **** **** 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about pickup, delivery, and order status
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotional emails</p>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers and discounts
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get text updates about your orders
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>

                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;