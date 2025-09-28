import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ShoppingCart, Menu, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, subscribeAuth } from "@/services/authApi";

interface LayoutProps {
  children: React.ReactNode;
}

function MenuToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 -ml-1" onClick={toggleSidebar} aria-label="Toggle menu">
          <Menu className="h-5 w-5 text-foreground" strokeWidth={3} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start">Open menu</TooltipContent>
    </Tooltip>
  );
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password";
  const [authed, setAuthed] = useState<boolean>(isAuthenticated());
  const [cartCount, setCartCount] = useState<number>(0);
  useEffect(() => {
    const unsub = subscribeAuth((a) => setAuthed(a));
    return () => unsub();
  }, []);
  useEffect(() => {
    // Initialize from localStorage
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      setCartCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setCartCount(0);
    }
    // Listen for cart updates
    const onUpdate = (e: any) => {
      if (e && e.detail && typeof e.detail.count === 'number') {
        setCartCount(e.detail.count);
      } else {
        try {
          const raw = localStorage.getItem("cart");
          const parsed = raw ? JSON.parse(raw) : [];
          setCartCount(Array.isArray(parsed) ? parsed.length : 0);
        } catch {
          setCartCount(0);
        }
      }
    };
    window.addEventListener("cart:updated", onUpdate as any);
    return () => window.removeEventListener("cart:updated", onUpdate as any);
  }, []);
  return (
    <SidebarProvider defaultOpen={false}>
      {/* Floating Cart Button */}
      <div className="fixed top-5 right-5 z-50">
        <Link to="/cart" aria-label="View cart" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {cartCount}
          </span>
        </Link>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/233502575255"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Chat"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <div className="flex min-h-screen w-full">
        <AppSidebar key={authed ? 'authed' : 'guest'} />
        <SidebarInset className="flex-1 w-full">
          {/* Top header with sticky sidebar trigger */}
          <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <MenuToggleButton />
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <span className="text-xs font-bold text-white">FL</span>
              </div>
              <span className="font-semibold">FreshLaundry Pro</span>
            </div>
          </header>
          
          <main className="flex-1 w-full overflow-x-hidden">
            {/* Route content */}
            <Outlet />
            {/* Optional overlays passed as children (e.g., RouteLoader) */}
            {children}
          </main>
          {!hideFooter && (
            <footer className="border-t bg-accent/20 px-4 py-8">
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <p className="text-sm text-muted-foreground">© 2025 FreshLaundry Pro. All rights reserved.</p>
                  <div className="flex items-center gap-6">
                    <a href="https://wa.me/233502575255" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-[#25D366] hover:opacity-80">
                      <MessageCircle className="h-6 w-6" />
                    </a>
                    <a href="mailto:bookncleanlaundry@gmail.com" aria-label="Email" className="text-[#EA4335] hover:opacity-80">
                      <Mail className="h-6 w-6" />
                    </a>
                    <a href="tel:+233541509091" aria-label="Call" className="text-[#34A853] hover:opacity-80">
                      <Phone className="h-6 w-6" />
                    </a>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
                    <Link to="#privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}