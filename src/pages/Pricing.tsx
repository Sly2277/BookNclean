import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Pay Per Use",
    description: "Perfect for occasional users",
    price: "Custom Pricing",
    features: [
      "₵8/kg for wash, dry & fold",
      "₵25/item for dry cleaning",
      "₵15/pair for shoe cleaning",
      "₵5/item for ironing",
      "Delivery fee at a surcharge",
      "24-48 hour turnaround"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Standard Plan",
    description: "Great for regular customers",
    price: "₵99/month",
    features: [
      "8% discount on all services",
      "Priority scheduling",
      "Free express service twice a month",
      "Monthly pickup reminders",
      "Free stain treatment",
      "24/7 customer support"
    ],
    buttonText: "Choose Plan",
    popular: true
  },
  {
    name: "Premium Plan",
    description: "For families and busy professionals",
    price: "₵199/month",
    features: [
      "15% discount on all services",
      "Unlimited express service",
      "White glove pickup & delivery",
      "Garment protection insurance",
      "Premium packaging",
      "Dedicated account manager"
    ],
    buttonText: "Go Premium",
    popular: false
  }
];

const services = [
  { name: "Wash, Dry & Fold", price: "₵8/kg", unit: "per kg" },
  { name: "Dry Cleaning", price: "₵25", unit: "per item" },
  { name: "Shoe Cleaning", price: "₵15", unit: "per pair" },
  { name: "Ironing Service", price: "₵5", unit: "per item" },
  { name: "Comforter Cleaning", price: "₵40", unit: "per item" },
  { name: "Express Service", price: "+50%", unit: "surcharge" },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link to="/services">{plan.buttonText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Pricing Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Service Pricing</CardTitle>
            <p className="text-center text-muted-foreground">
              Individual service pricing for pay-per-use customers
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const link = service.name === "Wash, Dry & Fold"
                  ? "/pricing/wash-dry-fold"
                  : service.name === "Dry Cleaning"
                  ? "/pricing/dry-cleaning"
                  : service.name === "Carpet Cleaning"
                  ? "/pricing/carpet-cleaning"
                  : "/services";
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.unit}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-lg font-semibold">
                        {service.price}
                      </Badge>
                      <Button asChild size="sm" variant="outline">
                        <Link to={link}>View Pricing</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section moved to Home page */}

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Saving Time?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust us with their laundry.
          </p>
          <Button asChild size="lg">
            <Link to="/services">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;