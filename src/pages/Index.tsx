import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, Truck, Quote, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { isAuthenticated, submitQuestion } from "@/services/authApi";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(undefined);
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent to-accent/50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Professional{" "}
                  <span className="relative text-primary">
                    Laundry Service
                    <div className="absolute -bottom-2 left-0 h-2 w-full bg-primary/30 rounded"></div>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Premium cleaning services with convenient pickup and delivery. 
                  Your clothes deserve the best care.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
                  <Link to="/services">Book Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional laundry service"
                className="block w-full max-w-full rounded-2xl shadow-2xl transform perspective-1000 hover:rotate-y-0 transition-transform duration-500"
                style={{ transform: "perspective(1000px) rotateY(-10deg)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday laundry to specialty cleaning, we've got you covered with 
              professional service and transparent pricing.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="/images/services/wash-fold.png"
                alt="Wash, Dry & Fold"
                className="h-48 w-full object-cover md:object-contain md:bg-white"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Wash, Dry & Fold</h3>
                <p className="text-muted-foreground mb-4">
                  Professional washing and folding service for your everyday garments.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-lg font-semibold">
                    from ₵13/KG
                  </Badge>
                  <Button asChild>
                    <Link to="/services">Get Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="/images/services/dry-cleaning.png"
                alt="Dry Cleaning"
                className="h-48 w-full object-cover md:h-56 lg:h-64 md:object-cover md:object-center md:bg-white"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dry Cleaning</h3>
                <p className="text-muted-foreground mb-4">
                  Expert drying cleaning services for all types of garments.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-lg font-semibold">
                    Per Item
                  </Badge>
                  <Button asChild>
                    <Link to="/services">Get Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-accent/30 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose FreshLaundry Pro?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best laundry service experience 
              with attention to detail and customer satisfaction.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Star className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Professional cleaning with eco-friendly products and expert care.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Service</h3>
                <p className="text-sm text-muted-foreground">
                  Quick turnaround times with same-day and next-day options available.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  We stand behind our work with 100% satisfaction guarantee.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Truck className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Pickup & Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Convenient pickup and delivery service right to your door.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials - after Features */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Real experiences from people who trust FreshLaundry Pro.</p>
          </div>

          <Carousel setApi={setCarouselApi} className="relative" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm">
                  <Quote className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <p className="text-lg md:text-xl text-foreground">“Incredible service! My clothes came back spotless and neatly folded. The pickup and delivery were right on time.”</p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-primary">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">— Ama K.</div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm">
                  <Quote className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <p className="text-lg md:text-xl text-foreground">“Fast and reliable. I love how easy it is to book and the clothes smell amazing!”</p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-primary">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">— Kwesi A.</div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-sm">
                  <Quote className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <p className="text-lg md:text-xl text-foreground">“Professional and affordable. The free pickup and delivery is a game-changer for my schedule.”</p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-primary">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">— Efia S.</div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Share Your Review</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">Quick answers to common questions.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardContent className="p-4">
                <Accordion type="single" collapsible className="w-full space-y-3">
              <AccordionItem value="item-1">
                  <AccordionTrigger className="text-purple-600 hover:text-purple-700">Can I cancel my subscription anytime?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can cancel your monthly or premium subscription at any time. Your
                      subscription will remain active until the end of your current billing period.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-purple-600 hover:text-purple-700">What's included in the pickup and delivery?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      All plans include free pickup and delivery within our service area. We'll come to
                      your location at your scheduled time and return your clean items.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-purple-600 hover:text-purple-700">How does the express service work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Express service guarantees same-day turnaround for items picked up before 10 AM.
                      Monthly plan customers get this service free twice per month.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-purple-600 hover:text-purple-700">What if I'm not satisfied with the service?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We offer a 100% satisfaction guarantee. If you're not happy with our service, we'll
                      re-clean your items for free or provide a full refund.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Right-side CTA card */}
            <Card className="md:col-span-1">
              <CardContent className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Any Question?</h3>
                  <p className="text-sm text-muted-foreground">You can ask anything you want to know about our services.</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Let me know.</label>
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <Button
                    disabled={submitting || question.trim().length === 0}
                    onClick={async () => {
                      const text = question.trim();
                      if (!text) return;
                      if (!isAuthenticated()) {
                        navigate('/login', { state: { from: '/', reason: 'login-to-submit-question' } });
                        return;
                      }
                      try {
                        setSubmitting(true);
                        await submitQuestion(text);
                        setQuestion("");
                        alert('Question sent successfully');
                      } catch (e) {
                        alert('Failed to send question');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="bg-primary hover:bg-primary/90 shadow-[0_8px_24px_rgba(124,58,237,0.35)]"
                  >
                    {submitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book your first order today and experience the convenience of 
            professional laundry service.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
            <Link to="/contact">Schedule Pickup</Link>
          </Button>
        </div>
      </section>

      {/* Footer moved to Layout */}
    </div>
  );
};

export default Index;
