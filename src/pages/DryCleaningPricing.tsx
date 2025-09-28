import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shirt, Plus, Minus, ShoppingBag, Briefcase, SprayCan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

type Item = {
  id: string;
  name: string;
  price: number;
  Icon: any;
  category: "Tops" | "Formal" | "Outerwear" | "Bottoms";
};

const ITEMS: Item[] = [
  { id: "shirt", name: "Shirt", price: 25, Icon: Shirt, category: "Tops" },
  { id: "suit", name: "Suit", price: 60, Icon: Briefcase, category: "Formal" },
  { id: "dress", name: "Dress", price: 45, Icon: Shirt, category: "Formal" },
  { id: "jacket", name: "Jacket", price: 40, Icon: Shirt, category: "Outerwear" },
  { id: "trousers", name: "Trousers", price: 30, Icon: SprayCan, category: "Bottoms" },
  { id: "j", name: "J", price: 30, Icon: SprayCan, category: "Bottoms" },
];

export default function DryCleaningPricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Item["category"]>("All");
  const jumpRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function increment(id: string) {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }
  function decrement(id: string) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
  }
  function addToCart(item: Item) {
    const qty = quantities[item.id] ?? 0;
    const nextQty = qty > 0 ? qty : 1;
    setQuantities((prev) => ({ ...prev, [item.id]: nextQty }));
    const cartRaw = localStorage.getItem("cart");
    const cart: any[] = cartRaw ? JSON.parse(cartRaw) : [];
    const cartItem = {
      serviceType: "Dry Cleaning",
      itemId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: nextQty,
      addedAt: new Date().toISOString(),
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    try { window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: cart.length } })); } catch {}
    toast({ title: `${item.name} added`, description: `x${nextQty} • ₵${item.price} each` });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter((i) =>
      (category === "All" || i.category === category) &&
      (!q || i.name.toLowerCase().includes(q))
    );
  }, [query, category]);

  const grouped = useMemo(() => {
    const map: Record<string, Item[]> = {};
    for (const item of filtered) {
      const letter = item.name[0]?.toUpperCase() ?? "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(item);
    }
    return Object.keys(map).sort().map((letter) => ({ letter, items: map[letter].sort((a, b) => a.name.localeCompare(b.name)) }));
  }, [filtered]);
  const flatItems = useMemo(() => filtered.slice().sort((a, b) => a.name.localeCompare(b.name)), [filtered]);

  const subtotal = useMemo(() => {
    return ITEMS.reduce((sum, item) => sum + (quantities[item.id] ?? 0) * item.price, 0);
  }, [quantities]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Dry Cleaning</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional dry cleaning for delicate fabrics and formal wear. Select items and quantities; pricing updates instantly.
          </p>
        </div>

        <div className="sticky top-0 z-10 mb-6 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <Input
                placeholder="Search items (e.g., shirt, suit, dress)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <div className="flex gap-2">
                {(["All", "Tops", "Bottoms", "Formal", "Outerwear"] as const).map((c) => (
                  <Button key={c} variant={c === category ? "default" : "outline"} size="sm" onClick={() => setCategory(c as any)}>
                    {c}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button>
              <span className="text-sm text-muted-foreground">{filtered.length} item(s)</span>
            </div>
          </div>
          <div className="pb-3 overflow-x-auto lg:hidden">
            <div className="flex gap-2 min-w-max">
              {Array.from(new Set(grouped.map(g => g.letter))).map(letter => (
                <Button key={letter} variant="outline" size="sm" onClick={() => jumpRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  {letter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: grouped with headers */}
        <div className="lg:hidden">
          {grouped.map(({ letter, items }) => (
            <div key={letter} ref={(el) => (jumpRefs.current[letter] = el)} className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">{letter}</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {items.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <item.Icon className="h-5 w-5" />
                          </span>
                          {item.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm font-semibold">₵{item.price}/item</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => decrement(item.id)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{quantities[item.id] ?? 0}</span>
                          <Button variant="outline" size="icon" onClick={() => increment(item.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button size="sm" className="h-9" onClick={() => addToCart(item)}>
                          <ShoppingBag className="mr-2 h-3 w-3" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: flat dense grid without headers */}
        <div className="hidden lg:grid gap-6 grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {flatItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.Icon className="h-5 w-5" />
                    </span>
                    {item.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-sm font-semibold">₵{item.price}/item</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => decrement(item.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantities[item.id] ?? 0}</span>
                    <Button variant="outline" size="icon" onClick={() => increment(item.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm" className="h-9" onClick={() => addToCart(item)}>
                    <ShoppingBag className="mr-2 h-3 w-3" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Current Subtotal</p>
                <p className="text-2xl font-bold">₵{subtotal}</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => navigate("/services")}>Continue Shopping</Button>
                <Button className="flex-1 sm:flex-none" onClick={() => navigate("/cart")}>View Cart</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


