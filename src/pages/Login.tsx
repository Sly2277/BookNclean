import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { login as loginRequest } from "@/services/authApi";
import type { AxiosError } from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state as any;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show a gentle prompt if redirected from protected actions (e.g., submit question)
  // We only show it once when arriving on the page.
  useState(() => {
    const state = location.state as any;
    if (state?.reason === "login-to-submit-question") {
      toast({
        title: "Please log in",
        description: "Log in to send your question to our team.",
      });
    }
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await loginRequest({ email, password });
      toast({ title: "Welcome back!", description: "You are now logged in." });
      const state = location.state as any;
      const redirectTo = (state && state.from) ? state.from : "/";
      let hasCart = false;
      try {
        const raw = localStorage.getItem("cart");
        const parsed = raw ? JSON.parse(raw) : [];
        hasCart = Array.isArray(parsed) && parsed.length > 0;
      } catch {}
      if (hasCart) {
        navigate("/cart", { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      const description = (error.response?.data as any)?.message || "Please try again.";
      toast({ title: "Login failed", description: Array.isArray(description) ? description.join(", ") : description, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back to FreshLaundry</p>
          {state?.from === "/cart" && (
            <p className="mt-2 text-xs text-green-700">Youll return to your cart after logging in.</p>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            <Link to="/signup" className="text-muted-foreground hover:underline">Create account</Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}


