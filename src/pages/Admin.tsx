import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ordersData = [
  { month: "Jan", orders: 320, revenue: 2450 },
  { month: "Feb", orders: 410, revenue: 2960 },
  { month: "Mar", orders: 380, revenue: 2810 },
  { month: "Apr", orders: 520, revenue: 3620 },
  { month: "May", orders: 610, revenue: 4210 },
  { month: "Jun", orders: 680, revenue: 4750 },
];

const monthlyStatuses = [
  { month: "Jan", processing: 48, delivered: 250, reviewing: 22, cancelled: 6, failed: 3 },
  { month: "Feb", processing: 60, delivered: 310, reviewing: 18, cancelled: 4, failed: 2 },
  { month: "Mar", processing: 55, delivered: 290, reviewing: 35, cancelled: 8, failed: 3 },
  { month: "Apr", processing: 70, delivered: 420, reviewing: 30, cancelled: 10, failed: 4 },
  { month: "May", processing: 85, delivered: 480, reviewing: 45, cancelled: 7, failed: 5 },
  { month: "Jun", processing: 92, delivered: 520, reviewing: 68, cancelled: 9, failed: 4 },
];

const topCustomers = [
  { name: "Ama Kumi", city: "Accra", lastOrder: "2025-09-05", orders: 56, spend: 4280 },
  { name: "Kwesi Appiah", city: "Kumasi", lastOrder: "2025-09-03", orders: 49, spend: 3920 },
  { name: "Efia Sarpong", city: "Takoradi", lastOrder: "2025-09-01", orders: 44, spend: 3610 },
  { name: "Kojo Mensah", city: "Accra", lastOrder: "2025-08-30", orders: 37, spend: 3015 },
  { name: "Nana Adwoa", city: "Tamale", lastOrder: "2025-08-28", orders: 33, spend: 2790 },
];

const servicesMix = [
  { name: "Laundry", value: 48 },
  { name: "Dry Clean", value: 27 },
  { name: "Shoe Care", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = ["#2563eb", "#f97316", "#16a34a", "#9333ea"];

export default function Admin() {
  const totals = useMemo(() => {
    const totalOrders = ordersData.reduce((a, b) => a + b.orders, 0);
    const totalRevenue = ordersData.reduce((a, b) => a + b.revenue, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    return { totalOrders, totalRevenue, avgOrderValue };
  }, []);

  return (
    <div className="px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform analytics and operational insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">Live</Badge>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Total Orders (YTD)</div>
              <div className="mt-2 text-2xl font-semibold">{totals.totalOrders.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Revenue (YTD)</div>
              <div className="mt-2 text-2xl font-semibold">₵{totals.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Avg Order Value</div>
              <div className="mt-2 text-2xl font-semibold">₵{totals.avgOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Active Subscriptions</div>
              <div className="mt-2 text-2xl font-semibold">312</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Orders vs Revenue</h2>
              </div>
              <ChartContainer
                config={{ orders: { label: "Orders", color: "#2563eb" }, revenue: { label: "Revenue", color: "#f97316" } }}
                className="aspect-[16/9]"
              >
                <ResponsiveContainer>
                  <LineChart data={ordersData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Service Mix</h2>
              <ChartContainer config={{}} className="aspect-[1/1]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={servicesMix} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50}>
                      {servicesMix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {servicesMix.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium">{s.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Monthly Revenue</h2>
              <ChartContainer config={{ revenue: { label: "Revenue", color: "#22c55e" } }} className="aspect-[16/9]">
                <ResponsiveContainer>
                  <BarChart data={ordersData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Operational Metrics</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">On-time Delivery</span>
                  <span className="font-semibold">97.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg Turnaround</span>
                  <span className="font-semibold">22 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Couriers</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Support Tickets (Open)</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statuses & Top Customers */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Status by Month</h2>
              <ChartContainer
                config={{ processing: { label: "Processing", color: "#f59e0b" }, delivered: { label: "Delivered", color: "#2563eb" }, reviewing: { label: "Reviewing", color: "#9333ea" }, cancelled: { label: "Cancelled", color: "#ef4444" }, failed: { label: "Failed", color: "#6b7280" } }}
                className="aspect-[16/9]"
              >
                <ResponsiveContainer>
                  <BarChart data={monthlyStatuses} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="processing" stackId="a" fill="var(--color-processing)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="delivered" stackId="a" fill="var(--color-delivered)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="reviewing" stackId="a" fill="var(--color-reviewing)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="cancelled" stackId="a" fill="var(--color-cancelled)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="failed" stackId="a" fill="var(--color-failed)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Top Customers</h2>
                <Badge variant="secondary">Awards</Badge>
              </div>
              <div className="grid gap-4">
                {topCustomers.map((c, idx) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="w-6 text-center text-sm font-semibold">{idx + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{c.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium leading-tight">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.city} • {c.orders} orders</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₵{c.spend.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Last: {new Date(c.lastOrder).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


