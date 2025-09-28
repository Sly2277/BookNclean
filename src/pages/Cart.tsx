import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, Trash2, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AuthButton from "@/components/AuthButton";
import { api } from "@/services/authApi";
import { getPrices, ServicePriceItem } from "@/services/pricesApi";

type AnyCartItem = Record<string, any> & { quantity?: number };

const Cart = () => {
  const [cartItems, setCartItems] = useState<AnyCartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [couponInfo, setCouponInfo] = useState<{ code: string; discount: number; description?: string } | null>(null);

  // Load cart from localStorage on mount and refresh dynamic prices
  useEffect(() => {
    (async () => {
      let parsed: AnyCartItem[] = [];
      try {
        const raw = localStorage.getItem("cart");
        parsed = raw ? JSON.parse(raw) : [];
      } catch {
        parsed = [];
      }

      // Group items that can be refreshed by serviceKey
      const byService: Record<string, AnyCartItem[]> = {};
      for (const item of parsed) {
        if (item && typeof item === "object" && item.serviceKey && item.key && (item.unitPrice == null)) {
          const sk = String(item.serviceKey);
          if (!byService[sk]) byService[sk] = [];
          byService[sk].push(item);
        }
      }

      // Fetch latest prices per service and update unitPrice where possible
      try {
        const serviceKeys = Object.keys(byService);
        await Promise.all(serviceKeys.map(async (serviceKey) => {
          try {
            const list: ServicePriceItem[] = await getPrices(serviceKey);
            const byKey = new Map(list.map((p) => [p.key, p]));
            for (const item of byService[serviceKey]) {
              const price = byKey.get(String(item.key));
              if (price && typeof price.unitPrice === "number") {
                item.unitPrice = price.unitPrice;
              }
            }
          } catch {}
        }));
      } catch {}

      setCartItems(parsed);
    })();
  }, []);

  // Persist cart to localStorage and notify listeners
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      try { window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: cartItems.length } })); } catch {}
    } catch {}
  }, [cartItems]);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      const existing = next[index] || {};
      next[index] = { ...existing, quantity: newQuantity };
      return next;
    });
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponInfo(null);
    setPromoCode("");
  };

  // Compute a display name and unit price for different item shapes added from various pages
  const lineItems = useMemo(() => {
    return cartItems.map((item) => {
      const quantity = Math.max(1, Number(item.quantity) || 1);
      // Prefer explicit unitPrice used by pricing pages
      const unitPrice: number | null =
        typeof item.unitPrice === "number" ? item.unitPrice :
        typeof item.price === "number" ? item.price : null;
      const name = item.name || item.planName || item.categoryLabel || item.serviceType || "Item";
      const unit = item.unit || undefined;
      const estimatedMin = typeof item.estimatedMin === "number" ? item.estimatedMin : undefined;
      const estimatedMax = typeof item.estimatedMax === "number" ? item.estimatedMax : undefined;
      return { name, unitPrice, quantity, unit, estimatedMin, estimatedMax };
    });
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return lineItems.reduce((sum, li) => sum + (li.unitPrice ? li.unitPrice * li.quantity : 0), 0);
  }, [lineItems]);

  const estimatedRange = useMemo(() => {
    // If any items have only estimated prices, compute min/max subtotal
    let min = 0;
    let max = 0;
    for (const li of lineItems) {
      if (typeof li.unitPrice === "number") {
        min += li.unitPrice * li.quantity;
        max += li.unitPrice * li.quantity;
      } else if (typeof li.estimatedMin === "number" || typeof li.estimatedMax === "number") {
        const liMin = typeof li.estimatedMin === "number" ? li.estimatedMin : 0;
        const liMax = typeof li.estimatedMax === "number" ? li.estimatedMax : liMin;
        min += liMin * li.quantity;
        max += liMax * li.quantity;
      }
    }
    return { min, max };
  }, [lineItems]);

  const discount = couponInfo?.discount ?? 0;
  const deliveryFee = 0; // Free delivery
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const applyCoupon = async () => {
    const code = promoCode.trim();
    if (!code) return;
    try {
      const res = await api.post("/coupons/validate", { code, subtotal });
      const data = res.data as any;
      setCouponInfo({ code: data.code, discount: data.discount, description: data.description });
    } catch (e) {
      setCouponInfo(null);
      alert("Invalid or expired coupon");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <Card>
            <CardContent className="text-center py-14">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some services to get started with your laundry order.
              </p>
              <Button asChild>
                <Link to="/services">Browse Services</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:-ml-4 xs:-ml-8 -ml-9 transition-all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5"/>
                    Cart Items ({cartItems.length})
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 overflow-x-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name || item.planName || item.categoryLabel || "Cart item"}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg truncate">{item.name || item.planName || item.categoryLabel || item.serviceType || "Item"}</h4>
                        {typeof item.unitPrice === "number" || typeof item.price === "number" ? (
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            ₵{(item.unitPrice ?? item.price)}{item.unit ? ` per ${item.unit}` : ""}
                          </p>
                        ) : (typeof item.estimatedMin === "number" || typeof item.estimatedMax === "number") ? (
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Est. ₵{typeof item.estimatedMin === "number" ? item.estimatedMin : 0}{typeof item.estimatedMax === "number" ? ` - ₵${item.estimatedMax}` : "+"}
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm text-muted-foreground">Price to be confirmed</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 p-0 sm:h-10 sm:w-10"
                          onClick={() => updateQuantity(index, Math.max(0, (Number(item.quantity) || 1) - 1))}
                        >
                          <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <span className="w-8 text-center font-medium text-base sm:w-12 sm:text-lg">
                          {Number(item.quantity) || 1}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 p-0 sm:h-10 sm:w-10"
                          onClick={() => updateQuantity(index, (Number(item.quantity) || 1) + 1)}
                        >
                          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>

                      <div className="text-right sm:text-left">
                        <p className="font-semibold">
                          {typeof (item.unitPrice ?? item.price) === "number" ? (
                            <>₵{(item.unitPrice ?? item.price) * (Number(item.quantity) || 1)}</>
                          ) : (typeof item.estimatedMin === "number" || typeof item.estimatedMax === "number") ? (
                            <span className="text-muted-foreground">
                              Est. ₵{(typeof item.estimatedMin === "number" ? item.estimatedMin : 0) * (Number(item.quantity) || 1)}
                              {typeof item.estimatedMax === "number" ? ` - ₵${(item.estimatedMax) * (Number(item.quantity) || 1)}` : "+"}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Est. at pickup</span>
                          )}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-2 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="flex justify-between items-center gap-6 sm:gap-1">
                <Button
                  asChild
                  className="px-3 py-1.5 text-sm sm:px-2 sm:py-2 sm:text-base bg-primary text-white hover:bg-primary-light"
                >
                  <Link to="/services" className="sm:ml-4 ml-auto block w-auto text-center">Add More</Link>
                </Button>
                <Button
                  onClick={clearCart}
                  className="px-1 py-1.5 text-sm sm:px-1 sm:py-2 sm:text-base bg-primary text-white hover:bg-primary-light"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {couponInfo && (
                    <div className="text-sm text-green-600">
                      Applied {couponInfo.code} – Discount: ₵{couponInfo.discount}
                      {couponInfo.description ? ` (${couponInfo.description})` : ""}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    {subtotal > 0 ? (
                      <span>₵{subtotal}</span>
                    ) : (
                      <span className="text-muted-foreground">₵{estimatedRange.min} - ₵{estimatedRange.max}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span>-₵{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      {subtotal > 0 ? (
                        <span>₵{total}</span>
                      ) : (
                        <span className="text-muted-foreground">₵{Math.max(0, estimatedRange.min - discount + deliveryFee)} - ₵{Math.max(0, estimatedRange.max - discount + deliveryFee)}</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Note: Prices shown are estimates and will be confirmed during pickup.
                    </p>
                  </div>
                  <AuthButton className="w-full mt-4" size="lg" to="/checkout">
                    Proceed to Checkout
                  </AuthButton>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Free pickup and delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>24-48 hour turnaround</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>100% satisfaction guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;