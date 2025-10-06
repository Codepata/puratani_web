'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.6-4.8 1.6-4.54 0-8.28-3.74-8.28-8.28s3.74-8.28 8.28-8.28c2.48 0 4.2.98 5.64 2.32l2.3-2.3C18.57 1.95 15.82 1 12.48 1 5.8 1 1 5.8 1 12s4.8 11 11.48 11c3.83 0 6.4-1.28 8.3-3.25 2.05-2.05 2.6-5.2 2.6-7.82V10.92h-9.8Z"
    />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-1 .1-1 .1-1 1.1.1 1.7 1.1 1.7 1.1.9 1.7 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.2 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.6 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.6.1 2.9.7.7 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
    />
  </svg>
);

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleOAuthSignIn = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.message,
      });
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Sign In Error',
        description: error.message,
      });
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Sign Up Error',
            description: error.message,
        });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast({
        variant: 'destructive',
        title: 'Email Required',
        description: 'Please enter your email to reset your password.',
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: 'Password Reset Email Sent',
        description: `If an account exists for ${resetEmail}, a password reset link has been sent.`,
      });
      setIsResetDialogOpen(false);
      setResetEmail('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Password Reset Error',
        description: error.message,
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">
            {isSigningUp ? 'Create an Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isSigningUp ? 'Enter your details to get started.' : 'Sign in to continue to your account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSigningUp ? handleEmailSignUp : handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {!isSigningUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                  <Label htmlFor="remember-me" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </Label>
                </div>
                <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 text-sm text-accent hover:underline">
                      Forgot password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handlePasswordReset}>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Label htmlFor="reset-email" className="sr-only">Email</Label>
                        <Input 
                          id="reset-email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                        />
                      </div>
                      <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Send Reset Link</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            <Button type="submit" className="w-full" style={{backgroundColor: "var(--primary)", color: "var(--primary-foreground)"}}>
              {isSigningUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleOAuthSignIn(new GoogleAuthProvider())}><GoogleIcon className="mr-2 h-4 w-4" /> Google</Button>
            <Button variant="outline" onClick={() => handleOAuthSignIn(new GithubAuthProvider())}><GithubIcon className="mr-2 h-4 w-4" /> GitHub</Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Button variant="link" className="p-0 text-accent hover:underline font-medium" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? 'Sign in' : 'Sign up'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
