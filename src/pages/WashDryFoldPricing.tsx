import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, NotebookPen, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getPrices, ServicePriceItem } from "@/services/pricesApi";

type BagOption = {
  id: string;
  name: string;
  subtitle?: string;
  unitPrice?: number;
  estimate?: string;
};

export default function WashDryFoldPricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notesByBagId, setNotesByBagId] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [serverOptions, setServerOptions] = useState<ServicePriceItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await getPrices("wash-dry-fold");
        setServerOptions(items);
      } catch (e) {
        // Keep UI but show toast
        toast({ title: "Could not load prices", description: "Using default placeholders.", variant: "destructive" as any });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  const BAG_OPTIONS: BagOption[] = useMemo(() => {
    if (!serverOptions || serverOptions.length === 0) {
      return [
        { id: "small", name: "Small Bag", subtitle: "≈ up to 7kg", estimate: "₵99.99" },
        { id: "medium", name: "Medium Bag", subtitle: "≈ 8–12kg", estimate: "₵65–₵95" },
        { id: "large", name: "Large Bag", subtitle: "≈ 13–17kg", estimate: "₵100–₵135" },
        { id: "xl", name: "Extra Large Bag", subtitle: "18kg+", estimate: "₵140+" },
      ];
    }
    return serverOptions.map((it) => ({
      id: it.key,
      name: it.name,
      subtitle: it.subtitle,
      unitPrice: typeof it.unitPrice === "number" ? it.unitPrice : undefined,
      estimate: it.displayPrice,
    }));
  }, [serverOptions]);

  function handleAddToCart(option: BagOption) {
    function parseDisplayPrice(label?: string): { min?: number; max?: number } {
      if (!label) return {};
      const cleaned = label.replace(/[^0-9+–.-]/g, "");
      // Range like 65–95
      if (cleaned.includes("–")) {
        const [minStr, maxStr] = cleaned.split("–");
        const min = Number(minStr);
        const max = Number(maxStr);
        return { min: isFinite(min) ? min : undefined, max: isFinite(max) ? max : undefined };
      }
      // Plus like 140+
      if (cleaned.endsWith("+")) {
        const n = Number(cleaned.slice(0, -1));
        return { min: isFinite(n) ? n : undefined, max: undefined };
      }
      // Single number
      const n = Number(cleaned);
      if (isFinite(n)) return { min: n, max: n };
      return {};
    }
    toast({
      title: `${option.name} added`,
      description: notesByBagId[option.id]
        ? `Notes: ${notesByBagId[option.id]}`
        : "Added to cart. You can edit quantities in your cart.",
    });
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const est = typeof option.unitPrice === "number" ? {} : parseDisplayPrice(option.estimate);
      cart.push({
        name: option.name,
        unitPrice: option.unitPrice,
        serviceKey: "wash-dry-fold",
        key: option.id,
        estimatedMin: est.min,
        estimatedMax: est.max,
        unit: undefined,
        quantity: 1,
        notes: notesByBagId[option.id] || undefined,
        serviceType: "Wash, Dry & Fold",
        image: "/images/services/wash-fold.png",
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      try { window.dispatchEvent(new CustomEvent("cart:updated")); } catch {}
    } catch {}
    // Stay on the same page after adding to cart
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Wash, Dry & Fold</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple bag-based pricing. Choose a bag size that matches your laundry load.
            Pickup and delivery are included.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {BAG_OPTIONS.map((option) => (
            <Card key={option.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShoppingBag className="h-5 w-5" />
                      </span>
                      {option.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{option.subtitle}</p>
                  </div>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {typeof option.unitPrice === "number" ? `₵${option.unitPrice}` : option.estimate}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <NotebookPen className="h-4 w-4 text-muted-foreground" />
                    <span>Add notes (detergent, fabric softener, special care)</span>
                  </div>
                  <Textarea
                    placeholder="e.g., Use hypoallergenic detergent, no fabric softener, fold shirts on top"
                    value={notesByBagId[option.id] ?? ""}
                    onChange={(e) =>
                      setNotesByBagId((prev) => ({ ...prev, [option.id]: e.target.value }))
                    }
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => handleAddToCart(option)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => navigate("/services")}>
                    View Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Prices shown are estimates. Final pricing may vary based on actual load size.
        </div>
      </div>
    </div>
  );
}


