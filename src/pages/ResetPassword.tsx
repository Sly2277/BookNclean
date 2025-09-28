import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/authApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const t = searchParams.get("token") || "";
    setToken(t);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      toast({ title: "Invalid link", description: "Missing token.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Minimum 6 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", description: "Re-enter matching passwords.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPassword({ token, password });
      toast({ title: "Password updated", description: "You can now log in." });
      navigate("/login");
    } catch (err: any) {
      const desc = err?.response?.data?.message || "Please try again.";
      toast({ title: "Reset failed", description: Array.isArray(desc) ? desc.join(", ") : desc, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Reset password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter a new password for your account.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}


