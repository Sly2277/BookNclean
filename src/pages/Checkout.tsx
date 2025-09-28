import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, Calendar, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      name: "Wash, Dry & Fold",
      price: 8,
      quantity: 2,
      unit: "kg"
    },
    {
      id: 2,
      name: "Dry Cleaning",
      price: 25,
      quantity: 1,
      unit: "item"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your order and schedule your laundry service
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+233 20 123 4567" />
                </div>
              </CardContent>
            </Card>

            {/* Pickup & Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Pickup & Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Accra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" placeholder="Greater Accra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" placeholder="00233" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea 
                    id="instructions" 
                    placeholder="Any special pickup or delivery instructions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Schedule Pickup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input id="pickupDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Preferred Time</Label>
                    <RadioGroup defaultValue="morning">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">Morning (8:00 AM - 12:00 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">Afternoon (12:00 PM - 5:00 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">Evening (5:00 PM - 8:00 PM)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile">Mobile Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} {item.unit} × ₵{item.price}
                      </p>
                    </div>
                    <span className="font-semibold">₵{item.price * item.quantity}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₵{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₵{total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>24-48 hour turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>100% satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Free pickup and delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button className="w-full" size="lg">
              Place Order - ₵{total}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our{" "}
              <Link to="/terms" className="underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;