import AboutUs from '@/components/about-us';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const PageHeader = () => (
  <div className="bg-card py-16 md:py-24">
    <div className="container text-center">
      <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Story</h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
        We are a collective of dreamers, thinkers, and doers united by a shared nostalgia for a more compassionate world.
      </p>
    </div>
  </div>
);

const MissionVision = () => (
    <section className="py-16 md:py-24 bg-background">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-headline text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-6">
                        To channel collective nostalgia into positive action by supporting and scaling grassroots initiatives that foster community, sustainability, and well-being.
                    </p>
                    <h2 className="font-headline text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground">
                        We envision a world where the empathy of the past fuels the innovations of the future, creating a global community where everyone has the opportunity to thrive.
                    </p>
                </div>
                 <div>
                    <h2 className="font-headline text-3xl font-bold mb-6">Our Values</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Compassion</h3>
                                <p className="text-sm text-muted-foreground">We lead with heart and empathy in all our endeavors.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Integrity</h3>
                                <p className="text-sm text-muted-foreground">We are committed to transparency and accountability.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Collaboration</h3>
                                <p className="text-sm text-muted-foreground">We believe in the power of partnership to achieve greater impact.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Innovation</h3>
                                <p className="text-sm text-muted-foreground">We seek creative solutions to long-standing challenges.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);


export default function AboutPage() {
  return (
    <>
      <PageHeader />
      <AboutUs />
      <MissionVision />
    </>
  );
}
