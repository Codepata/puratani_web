import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
];


const FeaturedCauses = () => {
  const featuredCauses = causes;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Causes</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            These are the causes that need your immediate attention. Your contribution can make a world of difference.
          </p>
        </div>
        
        <Carousel 
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredCauses.map((cause) => (
              <CarouselItem key={cause.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
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
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{cause.description}</p>
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/causes">View All Causes</Link>
            </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCauses;
