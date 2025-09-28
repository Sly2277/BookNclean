import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RouteLoader } from "@/components/RouteLoader";
import { lazy, Suspense } from "react";
import RequireAuth, { RequireAdmin } from "@/components/RequireAuth";
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const WashDryFoldPricing = lazy(() => import("./pages/WashDryFoldPricing"));
const DryCleaningPricing = lazy(() => import("./pages/DryCleaningPricing"));
const CarpetCleaningPricing = lazy(() => import("./pages/CarpetCleaningPricing"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminManage = lazy(() => import("./pages/AdminManage"));
const HouseOfficeCleaning = lazy(() => import("./pages/HouseOfficeCleaning"));
const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <RouteLoader />
      </Layout>
    ),
    children: [
      { index: true, element: <Suspense fallback={null}><Index /></Suspense> },
      { path: "dashboard", element: <RequireAuth><Suspense fallback={null}><Dashboard /></Suspense></RequireAuth> },
      { path: "services", element: <Suspense fallback={null}><Services /></Suspense> },
      { path: "contact", element: <Suspense fallback={null}><Contact /></Suspense> },
      { path: "pricing", element: <Suspense fallback={null}><Pricing /></Suspense> },
      { path: "pricing/subscription-plans", element: <Suspense fallback={null}><SubscriptionPlans /></Suspense> },
      { path: "pricing/house-office-cleaning", element: <Suspense fallback={null}><HouseOfficeCleaning /></Suspense> },
      { path: "pricing/wash-dry-fold", element: <Suspense fallback={null}><WashDryFoldPricing /></Suspense> },
      { path: "pricing/dry-cleaning", element: <Suspense fallback={null}><DryCleaningPricing /></Suspense> },
      { path: "pricing/carpet-cleaning", element: <Suspense fallback={null}><CarpetCleaningPricing /></Suspense> },
      { path: "cart", element: <Suspense fallback={null}><Cart /></Suspense> },
      { path: "profile", element: <RequireAuth><Suspense fallback={null}><Profile /></Suspense></RequireAuth> },
      { path: "checkout", element: <RequireAuth><Suspense fallback={null}><Checkout /></Suspense></RequireAuth> },
      { path: "my-orders", element: <RequireAuth><Suspense fallback={null}><MyOrders /></Suspense></RequireAuth> },
      { path: "admin", element: <RequireAdmin><Suspense fallback={null}><Admin /></Suspense></RequireAdmin> },
      { path: "admin/manage", element: <RequireAdmin><Suspense fallback={null}><AdminManage /></Suspense></RequireAdmin> },
      { path: "login", element: <Suspense fallback={null}><Login /></Suspense> },
      { path: "signup", element: <Suspense fallback={null}><Signup /></Suspense> },
      { path: "forgot-password", element: <Suspense fallback={null}><ForgotPassword /></Suspense> },
      { path: "reset-password", element: <Suspense fallback={null}><ResetPassword /></Suspense> },
      { path: "verify-email", element: <Suspense fallback={null}><VerifyEmail /></Suspense> },
      { path: "*", element: <Suspense fallback={null}><NotFound /></Suspense> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
