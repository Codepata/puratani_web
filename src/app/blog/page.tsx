import { blogPosts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
