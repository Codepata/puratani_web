import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';

const donationAmounts = [25, 50, 100, 250];

export default function DonatePage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Make a Donation</CardTitle>
              <CardDescription>Your generosity fuels our mission. Every contribution makes a difference.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-base font-semibold">Choose an amount</Label>
                    <RadioGroup defaultValue="50" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {donationAmounts.map((amount) => (
                            <div key={amount}>
                                <RadioGroupItem value={String(amount)} id={`amount-${amount}`} className="sr-only" />
                                <Label htmlFor={`amount-${amount}`} className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/10 hover:text-accent cursor-pointer [&:has([data-state=checked])]:border-accent">
                                    <span className="font-bold text-xl">${amount}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or enter a custom amount</span>
                        </div>
                    </div>
                    <div>
                         <Label htmlFor="custom-amount" className="sr-only">Custom amount</Label>
                        <Input id="custom-amount" type="number" placeholder="Enter amount" />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-base font-semibold">Your Information</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <Label className="text-base font-semibold">Payment Details</Label>
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                            <Input id="card-number" placeholder="0000 0000 0000 0000" />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry</Label>
                            <Input id="expiry-date" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="zip">ZIP</Label>
                            <Input id="zip" placeholder="12345" />
                        </div>
                    </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" size="lg" className="w-full" style={{backgroundColor: "var(--accent)", color: "var(--accent-foreground)"}}>
                Donate Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
