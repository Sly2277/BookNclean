import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  DollarSign, 
  LayoutDashboard, 
  ShieldCheck,
  ShoppingCart, 
  CreditCard,
  Phone,
  User,
  Package,
  Diamond,
  LogIn,
  UserPlus,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { hasAdminAccess, isAuthenticated, getProfile, logout } from "@/services/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseMenuItems = [
  { title: "Home", url: "/", icon: Home, auth: "public" as const },
  { title: "Services", url: "/services", icon: ShoppingBag, auth: "public" as const },
  { title: "Pricing", url: "/pricing", icon: DollarSign, auth: "public" as const },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, auth: "auth" as const },
  { title: "Admin", url: "/admin", icon: ShieldCheck, auth: "admin" as const },
  { title: "Manage", url: "/admin/manage", icon: ShieldCheck, auth: "admin" as const },
  { title: "My Orders", url: "/my-orders", icon: Package, auth: "auth" as const },
  { title: "Cart", url: "/cart", icon: ShoppingCart, auth: "public" as const },
  { title: "Checkout", url: "/checkout", icon: CreditCard, auth: "auth" as const },
  { title: "Contact", url: "/contact", icon: Phone, auth: "public" as const },
  { title: "Profile", url: "/profile", icon: User, auth: "auth" as const },
];

export function AppSidebar() {
  const { state, isMobile, openMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const showLabels = state === "expanded" || (isMobile && openMobile);

  const authed = isAuthenticated();
  const admin = hasAdminAccess();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!authed) {
        setUser(null);
        return;
      }
      try {
        const u = await getProfile();
        if (!active) return;
        setUser({ name: (u as any).name, email: (u as any).email });
      } catch {
        setUser(null);
      }
    }
    load();
    return () => { active = false; };
  }, [authed]);
  const visibleMenuItems = useMemo(() => {
    return baseMenuItems.filter((item) => {
      if (item.auth === "public") return true;
      if (item.auth === "auth") return authed;
      if (item.auth === "admin") return admin;
      return true;
    });
  }, [authed, admin, location.pathname]);

  return (
    <Sidebar 
      className="border-r-0 bg-gradient-to-b from-primary to-primary-dark shadow-xl"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-black/20 pb-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Diamond className="h-5 w-5 text-white" />
          </div>
          
          {showLabels && (
            <div className="flex flex-col">
              <span className="font-semibold text-white">FreshLaundry</span>
              <span className="text-xs text-white/80">Pro</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {visibleMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        text-white/80 hover:text-white hover:bg-white/10 hover:font-semibold md:hover:text-base
                        ${isActive ? 'bg-white/15 text-white border-l-2 border-white font-semibold' : ''}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {showLabels && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/20 pt-4">
        {!authed && (
          <div className="flex flex-col gap-1">
            <NavLink
              to="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10 hover:font-semibold"
              title="Login"
            >
              <LogIn className="h-5 w-5 flex-shrink-0" />
              {showLabels && (
                <span className="font-medium">Login</span>
              )}
            </NavLink>
            <NavLink
              to="/signup"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10 hover:font-semibold"
              title="Signup"
            >
              <UserPlus className="h-5 w-5 flex-shrink-0" />
              {showLabels && (
                <span className="font-medium">Signup</span>
              )}
            </NavLink>
          </div>
        )}
        {authed && user && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <User className="h-5 w-5 text-white" />
            </div>
            {showLabels && (
              <div className="flex flex-1 flex-col min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white truncate">{user.name}</span>
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-semibold text-purple-700 hover:bg-white/90"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
                <span className="text-xs text-white/60 truncate">{user.email}</span>
              </div>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}