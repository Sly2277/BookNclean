import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail } from "@/services/authApi";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'verifying' | 'done'>('idle');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      toast({ title: 'Invalid link', description: 'Missing token.', variant: 'destructive' });
      return;
    }
    setStatus('verifying');
    verifyEmail(token)
      .then(() => {
        setStatus('done');
        toast({ title: 'Email verified', description: 'You can now log in.' });
      })
      .catch((err: any) => {
        const desc = err?.response?.data?.message || 'Please try again.';
        toast({ title: 'Verification failed', description: Array.isArray(desc) ? desc.join(', ') : desc, variant: 'destructive' });
        setStatus('idle');
      });
  }, [searchParams, toast]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Verify email</h1>
        {status === 'verifying' && <p className="text-sm text-muted-foreground">Verifying your email...</p>}
        {status === 'done' && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">Your email has been verified successfully.</p>
            <Button onClick={() => navigate('/login')}>Go to login</Button>
          </>
        )}
      </div>
    </div>
  );
}


