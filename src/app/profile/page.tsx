import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit, LogOut, Gift } from 'lucide-react';

const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  joined: 'October 2023',
  avatarId: 'profile-avatar',
};

const donationHistory = [
  { id: 1, cause: 'Education for Children', amount: 50, date: '2023-10-15' },
  { id: 2, cause: 'Reforest Our Planet', amount: 100, date: '2023-09-22' },
  { id: 3, cause: 'Healthcare for the Elderly', amount: 75, date: '2023-08-05' },
];

export default function ProfilePage() {
    const avatarImage = PlaceHolderImages.find((img) => img.id === user.avatarId);

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-card">
              {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user.name} data-ai-hint={avatarImage.imageHint} />}
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground mt-1">{user.email}</p>
              <p className="text-sm text-muted-foreground mt-2">Member since {user.joined}</p>
            </div>
            <div className="md:ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Donation History</CardTitle>
              <CardDescription>Thank you for your incredible support. Here's a record of your contributions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {donationHistory.map((donation, index) => (
                  <li key={donation.id}>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                      <div className="flex items-center gap-4">
                        <Gift className="h-6 w-6 text-accent" />
                        <div>
                          <p className="font-semibold">{donation.cause}</p>
                          <p className="text-sm text-muted-foreground">{new Date(donation.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-lg">${donation.amount}</p>
                    </div>
                    {index < donationHistory.length - 1 && <Separator className="mt-4" />}
                  </li>
                ))}
              </ul>
              {donationHistory.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You haven't made any donations yet.</p>
                    <Button asChild variant="link" className="mt-2 text-accent">
                        <a href="/causes">Find a cause to support</a>
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
