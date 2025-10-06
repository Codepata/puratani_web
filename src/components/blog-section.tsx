import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const BlogSection = () => {
    const featuredPosts = blogPosts.slice(0, 3);
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">From Our Blog</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
                Stay updated with our latest stories, insights, and impact reports from the field.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
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
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/blog">Visit Our Blog</Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
