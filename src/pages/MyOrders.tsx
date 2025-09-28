import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const mockOrders = [
  {
    id: "ORD-001",
    status: "in-progress",
    statusText: "In Progress",
    pickupDate: "2025-01-15",
    deliveryDate: "2025-01-17",
    total: 41,
    items: [
      { name: "Wash, Dry & Fold", quantity: 2, unit: "kg", price: 16 },
      { name: "Dry Cleaning", quantity: 1, unit: "item", price: 25 }
    ],
    address: "123 Main Street, Accra, Ghana"
  },
  {
    id: "ORD-002",
    status: "completed",
    statusText: "Completed",
    pickupDate: "2025-01-10",
    deliveryDate: "2025-01-12",
    total: 30,
    items: [
      { name: "Shoe Cleaning", quantity: 2, unit: "pair", price: 30 }
    ],
    address: "456 Oak Avenue, Accra, Ghana"
  }
];

const MyOrders = () => {
  const activeOrders = mockOrders.filter(order => order.status !== "completed");
  const completedOrders = mockOrders.filter(order => order.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <Truck className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{order.id}</CardTitle>
          <Badge className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1">{order.statusText}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pickup Date</p>
            <p>{new Date(order.pickupDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Delivery Date</p>
            <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                {item.name} - {item.quantity} {item.unit} (₵{item.price})
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{order.address}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-lg font-semibold">Total: ₵{order.total}</p>
          </div>
          <div className="flex gap-2">
            {order.status === "in-progress" && (
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Contact Support
              </Button>
            )}
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track your current orders and view your order history
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="history">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          {/* Active Orders */}
          <TabsContent value="active">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active orders</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any active orders at the moment.
                  </p>
                  <Button asChild>
                    <Link to="/services">Place New Order</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Order History */}
          <TabsContent value="history">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <CheckCircle className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No completed orders</h3>
                  <p className="text-muted-foreground mb-6">
                    Your completed orders will appear here.
                  </p>
                  <Button asChild>
                    <Link to="/services">Place Your First Order</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/services">
                  <Package className="h-4 w-4 mr-2" />
                  Place New Order
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/pricing">
                  <Truck className="h-4 w-4 mr-2" />
                  Track Delivery
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyOrders;