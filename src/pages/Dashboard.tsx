import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package, Plus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-primary">John</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your laundry orders and subscriptions with ease.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild size="lg">
            <Link to="/services">
              <Plus className="mr-2 h-5 w-5" />
              New Order
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Calendar className="mr-2 h-5 w-5" />
            Manage Subscription
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-1">0</h3>
              <p className="text-muted-foreground">Completed Orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-1">0</h3>
              <p className="text-muted-foreground">Pending Orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Package className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-1">₵0</h3>
              <p className="text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Orders Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Orders Table Header */}
            <div className="grid grid-cols-5 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground">
              <div>ORDER ID</div>
              <div>STATUS</div>
              <div>PICKUP DATE</div>
              <div>DELIVERY DATE</div>
              <div>TOTAL</div>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                No orders yet. Place your first order to see it here.
              </p>
              <Button asChild>
                <Link to="/services">Place Your First Order</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Manage Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-6">
                You don't have an active subscription
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Browse Plans
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No recent activity. Start using our services to see your activity here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;