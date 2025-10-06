'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, HeartHandshake, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/firebase';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // In a real app, this data would be fetched from a database
  const blogPostsCount = 6; 
  const causesCount = 6;
  const latestPosts = [
      { id: '1', title: 'The Power of Community in Driving Change', date: 'October 26, 2023' },
      { id: '2', title: 'Innovations in Green Energy', date: 'October 22, 2023' },
      { id: '3', title: 'A Day in the Life of a Volunteer', date: 'October 18, 2023' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome, {user?.displayName || 'Admin'}!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Blog Posts</span>
              <Newspaper className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Total number of published articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{blogPostsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Causes</span>
              <HeartHandshake className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Total number of fundraising causes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{causesCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Users</span>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
            <CardDescription>Total registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">125</p>
            <p className="text-xs text-muted-foreground mt-1">(Sample data)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                    <h3 className="font-semibold">Manage Blog Posts</h3>
                    <p className="text-sm text-muted-foreground">Create, edit, or delete posts.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blog"><ExternalLink className="mr-2 h-4 w-4"/>View All</Link>
                </Button>
            </div>
             <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                    <h3 className="font-semibold">Manage Causes</h3>
                    <p className="text-sm text-muted-foreground">Update and track fundraising.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/causes"><ExternalLink className="mr-2 h-4 w-4"/>View All</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest blog posts published.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {latestPosts.map(post => (
                <li key={post.id} className="flex items-center justify-between text-sm">
                  <Link href={`/blog/${post.id}`} className="hover:underline" target="_blank">
                    {post.title}
                  </Link>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
