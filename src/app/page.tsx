import AboutUs from '@/components/about-us';
import BlogSection from '@/components/blog-section';
import FeaturedCauses from '@/components/featured-causes';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCauses />
      <AboutUs />
      <BlogSection />
    </>
  );
}
