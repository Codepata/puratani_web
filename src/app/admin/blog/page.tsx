'use client';
import { useState } from 'react';
import { blogPosts as initialBlogPosts } from '@/lib/data';
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
    const postData = {
        id: formData.get('id') as string,
        title: formData.get('title') as string,
        date: new Date(formData.get('date') as string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        preview: formData.get('preview') as string,
        imageUrl: editingPost?.imageUrl || `https://picsum.photos/seed/${Math.random()}/600/400`,
        imageHint: editingPost?.imageHint || 'abstract',
    };

    if (editingPost) {
      setBlogPosts(blogPosts.map((p) => (p.id === editingPost.id ? postData : p)));
    } else {
      setBlogPosts([{...postData, id: String(blogPosts.length + 1) }, ...blogPosts, ]);
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
