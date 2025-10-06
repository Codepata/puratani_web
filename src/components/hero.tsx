import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-banner');

  return (
    <section className="relative h-[85vh] w-full text-primary-foreground">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
          Rediscover Hope, Rebuild Futures
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          Puratani is a collective memory, a shared nostalgia for a time of compassion. Join us in turning that nostalgia into action for a better world.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: '400ms'}}>
          <Button asChild size="lg" style={{backgroundColor: "var(--accent)", color: "var(--accent-foreground)"}} className="hover:opacity-90">
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
