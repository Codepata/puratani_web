import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const AboutUs = () => {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">About Puratani</h2>
            <p className="mt-4 text-muted-foreground">
              'Puratani' means ancient, or of the old times. It's a word that evokes a sense of nostalgia, a longing for a simpler, more compassionate past. We believe that this collective memory holds the key to a better future.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our mission is to channel this shared sentiment into tangible action. We identify and support causes that aim to restore balance, whether it's in our communities, our environment, or our own hearts. By connecting donors and volunteers with impactful projects, we're not just funding change—we're building a movement fueled by the best of our shared humanity.
            </p>
          </div>
          <div className="order-1 md:order-2">
            {aboutImage && (
              <div className="relative aspect-4/3 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
