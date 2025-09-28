import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Truck, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PlanKey = "weekly" | "monthly";

interface PlanDef {
  key: PlanKey;
  name: string;
  priceLabel: string; // e.g., "+₵199 / cycle"
  cycle: string; // e.g., "Weekly"
  perks: string[];
}

const plans: PlanDef[] = [
  {
    key: "weekly",
    name: "Weekly Plan",
    priceLabel: "₵199 / cycle",
    cycle: "Weekly",
    perks: ["Free delivery", "Weekly pickup & drop-off", "Priority support"],
  },
  {
    key: "monthly",
    name: "Monthly Plan",
    priceLabel: "₵599 / cycle",
    cycle: "Monthly",
    perks: ["Free delivery", "Monthly pickup & drop-off", "Priority support"],
  },
];

export default function SubscriptionPlans() {
  const { toast } = useToast();

  const addToCart = (plan: PlanDef) => {
    const cartRaw = localStorage.getItem("cart");
    const cart: any[] = cartRaw ? JSON.parse(cartRaw) : [];
    const item = {
      serviceType: "Subscription Plan",
      planKey: plan.key,
      planName: plan.name,
      priceLabel: plan.priceLabel,
      cycle: plan.cycle,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    try { window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: cart.length } })); } catch {}
    toast({ title: "Added to cart", description: `${plan.name} – ${plan.priceLabel}` });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Laundry Subscription Plans</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a plan that fits your routine. Delivery is always free.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.key} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-1 text-base font-medium text-foreground">{plan.priceLabel}</CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">{plan.cycle}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-4 w-4" /> Free delivery
                <CalendarDays className="h-4 w-4 ml-3" /> {plan.cycle} pickup & drop-off
              </div>
              <Button className="mt-6 w-full h-9" size="sm" onClick={() => addToCart(plan)}>
                Subscribe / Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


