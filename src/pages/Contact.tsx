import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team. We're here to help with all your laundry and cleaning needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Your phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="booking">Booking Question</SelectItem>
                    <SelectItem value="pricing">Pricing Information</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Tell us how we can help you..." 
                />
              </div>
              
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">+233 20 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">hello@freshlaundrypro.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      123 Clean Street<br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-muted-foreground">
                      Mon-Sat: 7:00 AM - 8:00 PM<br />
                      Sunday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How do I schedule a pickup?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can schedule a pickup through our website, call us, or use our mobile app. 
                    We offer same-day and next-day pickup options.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What are your delivery times?</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard delivery is 24-48 hours. Express service is available for same-day 
                    delivery with additional charges.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Do you offer eco-friendly cleaning?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We use environmentally friendly detergents and cleaning solutions 
                    that are safe for you and the environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Visit Our Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Coming Soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;