import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { signup as signupRequest } from "@/services/authApi";
import type { AxiosError } from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "Please re-enter your password.", variant: "destructive" });
      return;
    }
    if (!acceptedTerms) {
      toast({ title: "Accept terms to continue", description: "Please agree to the Terms and Conditions.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await signupRequest({ fullName: name, email, password });
      toast({ title: "Account created", description: "Welcome to FreshLaundry! Please log in." });
      // Preserve cart intent: if they had items, send them to login with return to /cart
      let hasCart = false;
      try {
        const raw = localStorage.getItem("cart");
        const parsed = raw ? JSON.parse(raw) : [];
        hasCart = Array.isArray(parsed) && parsed.length > 0;
      } catch {}
      if (hasCart) {
        navigate("/login", { state: { from: "/cart" } });
      } else {
        navigate("/login");
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      const description = (error.response?.data as any)?.message || "Please try again.";
      toast({ title: "Signup failed", description: Array.isArray(description) ? description.join(", ") : description, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join FreshLaundry</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(v) => setAcceptedTerms(Boolean(v))}
              className="rounded-full h-5 w-5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <div className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
}


