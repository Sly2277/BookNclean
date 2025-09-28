import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createPrice, deletePrice, getPrices, ServicePriceItem } from "@/services/pricesApi";

export default function AdminManage() {
  const [prices, setPrices] = useState<ServicePriceItem[]>([]);
  const [form, setForm] = useState<Partial<ServicePriceItem>>({ serviceKey: "wash-dry-fold", key: "", name: "", subtitle: "", unitPrice: undefined, displayPrice: "", sortOrder: 0, active: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const items = await getPrices("wash-dry-fold");
        setPrices(items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="px-4 py-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>
        <p className="text-sm text-muted-foreground mb-6">Manage your ecommerce operations.</p>
        <Tabs defaultValue="prices">
          <TabsList>
            <TabsTrigger value="prices">Prices</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="mb-2 text-lg font-semibold">Wash, Dry & Fold Prices</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Key (e.g., small)" value={form.key || ""} onChange={(e) => setForm((p) => ({ ...p, key: e.target.value }))} />
                    <Input placeholder="Name" value={form.name || ""} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                    <Input placeholder="Subtitle" value={form.subtitle || ""} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
                    <Input placeholder="Unit Price (number)" type="number" value={form.unitPrice ?? ""} onChange={(e) => setForm((p) => ({ ...p, unitPrice: e.target.value ? Number(e.target.value) : undefined }))} />
                    <Input placeholder="Display Price (e.g., ₵65–₵95)" value={form.displayPrice || ""} onChange={(e) => setForm((p) => ({ ...p, displayPrice: e.target.value }))} />
                    <Input placeholder="Sort Order" type="number" value={form.sortOrder ?? 0} onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) || 0 }))} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={async () => {
                      const toCreate: ServicePriceItem = {
                        serviceKey: "wash-dry-fold",
                        key: form.key || "",
                        name: form.name || "",
                        subtitle: form.subtitle || "",
                        unitPrice: form.unitPrice,
                        displayPrice: form.displayPrice,
                        sortOrder: form.sortOrder || 0,
                        active: true,
                      };
                      const created = await createPrice(toCreate);
                      setPrices((p) => [...p, created]);
                    }}>Add / Save</Button>
                    <Button variant="outline" onClick={async () => { const items = await getPrices("wash-dry-fold"); setPrices(items); }}>Refresh</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">If unit price is set, it overrides display price on the storefront.</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-3 text-lg font-semibold">Current Cards</div>
                  <div className="space-y-2">
                    {loading ? (
                      <div>Loading...</div>
                    ) : prices.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No items yet</div>
                    ) : (
                      prices
                        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                        .map((p) => (
                        <div key={p._id} className="flex items-center gap-3 p-3 border rounded">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{p.name} <span className="text-xs text-muted-foreground">({p.key})</span></div>
                            <div className="text-xs text-muted-foreground truncate">{typeof p.unitPrice === 'number' ? `₵${p.unitPrice}` : p.displayPrice}</div>
                          </div>
                          <Button size="sm" variant="destructive" onClick={async () => { if (!p._id) return; await deletePrice(p._id); setPrices((list) => list.filter((x) => x._id !== p._id)); }}>Delete</Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">Orders management coming soon.</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">Users management coming soon.</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="coupons" className="mt-4">
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">Coupons management coming soon.</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


