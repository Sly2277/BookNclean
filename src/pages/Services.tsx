import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shirt, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
// Removed embedded configurator; dedicated pricing page is used instead

const services = [
  {
    id: 1,
    name: "Subscription Plans",
    description: "Save more with weekly or monthly laundry subscriptions tailored to your usage.",
    price: "From ₵199/month",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    features: ["Weekly pickups", "Priority scheduling", "Discounted rates", "Flexible pause/resume"]
  },
  {
    id: 2,
    name: "Wash, Dry & Fold",
    description: "Professional washing and folding service for your everyday garments.",
    price: "From ₵8/kg",
    image: "/images/services/wash-fold.png",
    features: ["Premium detergents", "Careful folding", "Same-day service", "Eco-friendly"]
  },
  {
    id: 3,
    name: "Dry Cleaning",
    description: "Expert dry cleaning for delicate fabrics and formal wear.",
    price: "₵25/item",
    image: "/images/services/dry-cleaning.png",
    features: ["Delicate fabric care", "Stain removal", "Professional pressing", "Garment protection"]
  },
  {
    id: 4,
    name: "Carpet Cleaning",
    description: "Deep cleaning for rugs and carpets using safe, powerful equipment.",
    price: "From ₵12/m²",
    image: "/images/services/carpet-cleaning.png",
    features: ["Stain treatment", "Odor removal", "Fast-dry methods", "Allergen reduction"]
  },
  {
    id: 5,
    name: "House / Office Cleaning",
    description: "Trusted residential and commercial cleaning by vetted professionals.",
    price: "From ₵150/session",
    image: "/images/services/office-cleaning.png",
    features: ["Custom checklists", "Supplies included", "Background-checked staff", "Satisfaction guarantee"]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional laundry and cleaning services tailored to your needs. 
            Quality care for every garment, every time.
          </p>
        </div>

        {/* Services Grid */
        }
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={service.image}
                alt={service.name}
                className="h-48 w-full object-cover md:h-56 lg:h-64 md:object-cover md:object-center md:bg-white"
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {service.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {service.name === "Wash, Dry & Fold" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pricing/wash-dry-fold">View Pricing</Link>
                    </Button>
                  )}
                  {service.name === "Dry Cleaning" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pricing/dry-cleaning">View Pricing</Link>
                    </Button>
                  )}
                  {service.name === "Carpet Cleaning" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pricing/carpet-cleaning">View Pricing</Link>
                    </Button>
                  )}
                  {service.name === "Subscription Plans" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pricing/subscription-plans">View Pricing</Link>
                    </Button>
                  )}
                  {service.name === "House / Office Cleaning" && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pricing/house-office-cleaning">View Pricing</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Process Section */}
        <div className="bg-accent/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">1</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule Pickup</h3>
              <p className="text-muted-foreground">
                Book online or call us to schedule a convenient pickup time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Cleaning</h3>
              <p className="text-muted-foreground">
                Our experts clean your items with care using premium products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your clean clothes delivered back to your door.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Experience the convenience of professional laundry service today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Cart
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;