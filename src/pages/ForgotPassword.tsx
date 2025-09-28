import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { forgotPassword as forgotPasswordRequest } from "@/services/authApi";
import type { AxiosError } from "axios";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPasswordRequest({ email });
      toast({
        title: "Reset link sent",
        description: "Check your inbox for reset instructions.",
      });
    } catch (err) {
      const error = err as AxiosError<any>;
      const description = (error.response?.data as any)?.message || "Please try again.";
      toast({ title: "Something went wrong", description: Array.isArray(description) ? description.join(", ") : description, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="mt-1 text-sm text-muted-foreground">We’ll email you a reset link</p>
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

          <div className="text-sm text-muted-foreground">
            Remembered it? <Link to="/login" className="text-primary hover:underline">Back to login</Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </div>
    </div>
  );
}


