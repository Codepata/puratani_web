'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { BlogPost } from '@/lib/types';
import { PlusCircle, Edit, Trash } from 'lucide-react';
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


const initialBlogPosts: BlogPost[] = [
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


export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const openDialog = (post: BlogPost | null = null) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleSave = (formData: FormData) => {
    const postData: BlogPost = {
        id: formData.get('id') as string || String(blogPosts.length + 1),
        title: formData.get('title') as string,
        date: new Date(formData.get('date') as string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        preview: formData.get('preview') as string,
        imageUrl: editingPost?.imageUrl || `https://picsum.photos/seed/${Math.random()}/600/400`,
        imageHint: editingPost?.imageHint || 'abstract',
    };

    if (editingPost) {
      setBlogPosts(blogPosts.map((p) => (p.id === editingPost.id ? postData : p)));
    } else {
      setBlogPosts([postData, ...blogPosts ]);
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    setBlogPosts(blogPosts.filter((p) => p.id !== id));
  };
  
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Blog Posts</h1>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <form action={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              <DialogDescription>
                {editingPost ? 'Make changes to your blog post.' : 'Fill in the details for your new blog post.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <input type="hidden" name="id" defaultValue={editingPost?.id || ''} />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" defaultValue={editingPost?.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" name="date" type="date" defaultValue={editingPost ? formatDateForInput(editingPost.date) : ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preview" className="text-right">
                  Preview
                </Label>
                <Textarea id="preview" name="preview" defaultValue={editingPost?.preview} className="col-span-3" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
