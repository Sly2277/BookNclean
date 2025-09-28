import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getPrices, ServicePriceItem } from "@/services/pricesApi";

type SizeKey = "small" | "medium" | "large" | "xl";
type SizeCategory = "Small" | "Medium" | "Large" | "Extra Large" | null;

type Option = {
  id: SizeKey;
  name: SizeCategory extends null ? never : string;
  subtitle?: string;
  unitPrice?: number;
  estimate?: string;
};

export default function CarpetCleaningPricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serverOptions, setServerOptions] = useState<ServicePriceItem[]>([]);
  const [selected, setSelected] = useState<SizeKey>("small");

  useEffect(() => {
    (async () => {
      try {
        const items = await getPrices("carpet-cleaning");
        setServerOptions(items);
      } catch {}
    })();
  }, []);

  const OPTIONS: Option[] = useMemo(() => {
    if (!serverOptions || serverOptions.length === 0) {
      return [
        { id: "small", name: "Small", subtitle: "≈ bedside rug", estimate: "₵60–₵90" },
        { id: "medium", name: "Medium", subtitle: "≈ living area rug", estimate: "₵100–₵140" },
        { id: "large", name: "Large", subtitle: "≈ big hall rug", estimate: "₵150–₵220" },
        { id: "xl", name: "Extra Large", subtitle: "oversized/runner", estimate: "₵230+" },
      ];
    }
    return serverOptions.map((it) => ({
      id: it.key as SizeKey,
      name: it.name,
      subtitle: it.subtitle,
      unitPrice: typeof it.unitPrice === "number" ? it.unitPrice : undefined,
      estimate: it.displayPrice,
    }));
  }, [serverOptions]);

  const selectedOption = OPTIONS.find((o) => o.id === selected);

  function parseDisplayPrice(label?: string): { min?: number; max?: number } {
    if (!label) return {};
    const cleaned = label.replace(/[^0-9+–.-]/g, "");
    if (cleaned.includes("–")) {
      const [minStr, maxStr] = cleaned.split("–");
      const min = Number(minStr);
      const max = Number(maxStr);
      return { min: isFinite(min) ? min : undefined, max: isFinite(max) ? max : undefined };
    }
    if (cleaned.endsWith("+")) {
      const n = Number(cleaned.slice(0, -1));
      return { min: isFinite(n) ? n : undefined, max: undefined };
    }
    const n = Number(cleaned);
    if (isFinite(n)) return { min: n, max: n };
    return {};
  }

  function addToCart() {
    if (!selectedOption) return;
    const est = typeof selectedOption.unitPrice === "number" ? {} : parseDisplayPrice(selectedOption.estimate);
    const item = {
      name: `Carpet Cleaning – ${selectedOption.name}`,
      unitPrice: selectedOption.unitPrice,
      serviceKey: "carpet-cleaning",
      key: selectedOption.id,
      estimatedMin: est.min,
      estimatedMax: est.max,
      unit: undefined,
      quantity: 1,
      serviceType: "Carpet Cleaning",
      image: "/images/services/carpet-cleaning.png",
    };
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      try { window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: cart.length } })); } catch {}
    } catch {}
    toast({ title: `${selectedOption.name} added`, description: selectedOption.unitPrice ? `₵${selectedOption.unitPrice}` : selectedOption.estimate });
    // Stay on the same page; no auto-navigation
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Carpet Cleaning</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a size for a quick estimate. Admin-managed prices are applied in real time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Simple Estimate with XL */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" /> Simple Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {OPTIONS.map((opt) => (
                  <Button key={opt.id} variant={selected === opt.id ? "default" : "outline"} onClick={() => setSelected(opt.id)}>
                    {opt.name}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Visual guide: Small ≈ bedside rug, Medium ≈ living area rug, Large ≈ big hall rug, Extra Large ≈ oversized/runner.
              </p>
              {selectedOption && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Selected</span>
                  <Badge variant="secondary">
                    {typeof selectedOption.unitPrice === "number" ? `₵${selectedOption.unitPrice}` : (selectedOption.estimate || "Estimate")}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
          {/* CTA Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Pricing & Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Selected option</span>
                <Badge variant="secondary">{selectedOption ? selectedOption.name : "Choose one"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Price</span>
                <span className="text-2xl font-bold">
                  {selectedOption ? (
                    typeof selectedOption.unitPrice === "number" ? `₵${selectedOption.unitPrice}` : (selectedOption.estimate || "Estimate")
                  ) : "—"}
                </span>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={addToCart} disabled={!selectedOption}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/services")}>Back to Services</Button>
              </div>
              <p className="text-xs text-muted-foreground">Final pricing may vary slightly after on-site assessment.</p>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  );
}


