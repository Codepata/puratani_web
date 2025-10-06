import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { Cause } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      imageUrl: 'https://picsum.photos/seed/error/600/400',
      imageHint: 'placeholder image',
    };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

const causes: Cause[] = [
  {
    id: '1',
    title: 'Education for Underprivileged Children',
    description: 'Help provide books and school supplies for children in rural areas.',
    goal: 10000,
    current: 7500,
    ...getImage('cause-1'),
  },
  {
    id: '2',
    title: 'Reforest Our Planet',
    description: 'Join us in planting trees to combat climate change and restore habitats.',
    goal: 50000,
    current: 25000,
    ...getImage('cause-2'),
  },
  {
    id: '3',
    title: 'Healthcare for the Elderly',
    description: 'Support senior citizens with essential medical care and support.',
    goal: 20000,
    current: 15000,
    ...getImage('cause-3'),
  },
  {
    id: '4',
    title: 'Save the Stray Animals',
    description: 'Provide shelter, food, and medical attention for stray animals.',
    goal: 5000,
    current: 4500,
    ...getImage('cause-4'),
  },
  {
    id: '5',
    title: 'Clean Our Oceans',
    description: 'Fund beach and ocean cleanup initiatives to protect marine life.',
    goal: 15000,
    current: 7500,
    ...getImage('cause-5'),
  },
  {
    id: '6',
    title: 'Access to Clean Water',
    description: 'Help build wells and water purification systems in remote communities.',
    goal: 30000,
    current: 28000,
    ...getImage('cause-6'),
  },
];


export default function CausesPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Causes</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Every cause is a chance to make a difference. Find one that speaks to you and join our mission for a better world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause) => (
            <Card key={cause.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={cause.imageUrl}
                    alt={cause.title}
                    fill
                    className="object-cover"
                    data-ai-hint={cause.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
                <CardTitle className="font-headline text-xl leading-snug">{cause.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{cause.description}</p>
                <div className="mt-4">
                  <Progress value={(cause.current / cause.goal) * 100} className="h-2" />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>
                      Raised: ${cause.current.toLocaleString()}
                    </span>
                    <span>
                      Goal: ${cause.goal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" style={{backgroundColor: "var(--accent)", color: "var(--accent-foreground)"}}>
                  <Link href={`/donate?cause=${cause.id}`}>Donate</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
