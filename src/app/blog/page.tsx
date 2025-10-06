import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
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

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Power of Community in Driving Change',
    date: 'October 26, 2023',
    preview: 'Discover how local communities are coming together to create a global impact. Their stories are a testament to what we can achieve when we work as one.',
    ...getImage('blog-1'),
  },
  {
    id: '2',
    title: 'Innovations in Green Energy',
    date: 'October 22, 2023',
    preview: 'We explore the latest breakthroughs in renewable energy technology and how they are shaping a sustainable future for generations to come.',
    ...getImage('blog-2'),
  },
  {
    id: '3',
    title: 'A Day in the Life of a Volunteer',
    date: 'October 18, 2023',
    preview: 'Experience the rewarding journey of our volunteers. Read about their challenges, triumphs, and the people they meet along the way.',
    ...getImage('blog-3'),
  },
    {
    id: '4',
    title: 'Why Education Matters More Than Ever',
    date: 'October 15, 2023',
    preview: 'An in-depth look at how quality education can break cycles of poverty and empower individuals to build better futures for themselves and their communities.',
    ...getImage('blog-4'),
  },
  {
    id: '5',
    title: 'Art as a Medium for Social Commentary',
    date: 'October 11, 2023',
    preview: 'Exploring how artists around the world are using their talents to raise awareness about pressing social and environmental issues.',
    ...getImage('blog-5'),
  },
  {
    id: '6',
    title: 'Building the Sustainable Cities of Tomorrow',
    date: 'October 7, 2023',
    preview: 'From vertical farming to smart grids, we dive into the concepts and technologies that are transforming our urban landscapes into greener, more livable spaces.',
    ...getImage('blog-6'),
  },
];


export default function BlogPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Words from Our World</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Insights, stories, and updates from the front lines of change. Explore our thoughts and join the conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
             <Card key={post.id} className="overflow-hidden flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                    <div className="relative aspect-video">
                        <Image 
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint={post.imageHint}
                        />
                    </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                    <CardTitle className="font-headline text-xl mt-1 leading-snug">{post.title}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.preview}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="p-0 text-accent">
                        <Link href={`/blog/${post.id}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
