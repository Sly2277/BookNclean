import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Building2, Home, Store, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CleaningCategoryKey = "1-bedroom" | "2-bedroom" | "3-bedroom" | "office" | "shop" | "other";

interface CleaningCategory {
  key: CleaningCategoryKey;
  label: string;
  minPrice: number;
  maxPrice: number;
  icon: JSX.Element;
  hint?: string;
}

const currency = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function HouseOfficeCleaning() {
  const { toast } = useToast();
  const [selectedKey, setSelectedKey] = useState<CleaningCategoryKey | null>(null);
  const [notes, setNotes] = useState("");
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories: CleaningCategory[] = useMemo(() => [
    { key: "1-bedroom", label: "1 Bedroom", minPrice: 60, maxPrice: 90, icon: <Home className="h-6 w-6" />, hint: "Small apartment or bedsit" },
    { key: "2-bedroom", label: "2 Bedroom", minPrice: 80, maxPrice: 120, icon: <Home className="h-6 w-6" /> },
    { key: "3-bedroom", label: "3 Bedroom", minPrice: 110, maxPrice: 160, icon: <Home className="h-6 w-6" /> },
    { key: "office", label: "Office", minPrice: 100, maxPrice: 200, icon: <Briefcase className="h-6 w-6" />, hint: "Open plan or cubicles" },
    { key: "shop", label: "Shop", minPrice: 70, maxPrice: 140, icon: <Store className="h-6 w-6" /> },
    { key: "other", label: "Custom", minPrice: 50, maxPrice: 200, icon: <Building2 className="h-6 w-6" />, hint: "Describe rooms and areas" },
  ], []);

  const selected = categories.find(c => c.key === selectedKey) || null;

  useEffect(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const handleAddToCart = () => {
    if (!selected && !notes.trim()) {
      toast({ title: "Select a category or add a description", description: "This helps us estimate your price range." });
      return;
    }

    const cartRaw = localStorage.getItem("cart");
    const cart: any[] = cartRaw ? JSON.parse(cartRaw) : [];

    const item = {
      serviceType: "House/Office Cleaning",
      categoryKey: selected?.key ?? "other",
      categoryLabel: selected?.label ?? "Custom",
      estimatedMin: selected?.minPrice ?? null,
      estimatedMax: selected?.maxPrice ?? null,
      notes: notes.trim() || null,
      quantity: 1,
      addedAt: new Date().toISOString(),
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: notify listeners that cart changed
    try {
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: cart.length } }));
    } catch {}

    toast({ title: "Added to cart", description: `${item.categoryLabel}${item.notes ? " • " + item.notes : ""}` });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">House / Office Cleaning</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a category or describe your space. We’ll show an estimated price range.</p>
      </div>

      {/* Quick jump dropdown */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Jump to:</span>
        <Select
          value={categories[currentIndex]?.key}
          onValueChange={(val) => {
            const idx = categories.findIndex(c => c.key === (val as CleaningCategoryKey));
            if (idx >= 0) {
              setCurrentIndex(idx);
              carouselApi?.scrollTo(idx);
            }
          }}
        >
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Choose category" /></SelectTrigger>
          <SelectContent>
            {categories.map(c => (
              <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Horizontal carousel */}
      <div className="relative">
        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: false }}>
          <CarouselContent>
            {categories.map((cat) => {
              const isActive = selectedKey === cat.key;
              return (
                <CarouselItem key={cat.key} className="md:basis-1/2 lg:basis-1/3">
                  <Card
                    className={cn("h-full cursor-pointer transition-all hover:shadow-md", isActive ? "ring-2 ring-primary shadow-md" : "")}
                    onClick={() => setSelectedKey(cat.key)}
                    role="button"
                    aria-pressed={isActive}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary", isActive ? "bg-primary/20" : "")}>{cat.icon}</div>
                        <CardTitle className="text-base font-medium">{cat.label}</CardTitle>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">Range</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Estimate varies with size and condition</span>
                        </TooltipContent>
                      </Tooltip>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <CardDescription className="text-sm">
                        {currency(cat.minPrice)} – {currency(cat.maxPrice)}
                      </CardDescription>
                      {cat.hint ? <p className="mt-2 text-xs text-muted-foreground">{cat.hint}</p> : null}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button variant="default" size="sm" className="h-9" onClick={() => setSelectedKey(cat.key)}>
                          {isActive ? "Selected" : "Select"}
                        </Button>
                        <Button variant="outline" size="sm" className="h-9" onClick={() => { setSelectedKey(cat.key); handleAddToCart(); }}>Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* Pagination dots */}
        <div className="mt-4 flex justify-center gap-2">
          {categories.map((_, idx) => {
            const active = currentIndex === idx;
            return (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => carouselApi?.scrollTo(idx)}
                className={cn("h-2.5 w-2.5 rounded-full transition", active ? "bg-primary" : "bg-muted")}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Or add a short description</CardTitle>
            <CardDescription>Example: "4 rooms and a small hall" or "Two offices + reception"</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your space briefly"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[88px]"
            />
            <p className="mt-2 text-xs text-muted-foreground">This note will be attached to your order.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
            <CardDescription>Your quick estimate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Selection</span>
                <span>{selected ? selected.label : "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated</span>
                <span>{selected ? `${currency(selected.minPrice)} – ${currency(selected.maxPrice)}` : "—"}</span>
              </div>
            </div>
            <Button className="mt-4 w-full h-9" size="sm" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


