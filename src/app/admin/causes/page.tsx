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
import { Progress } from '@/components/ui/progress';
import type { Cause } from '@/lib/types';
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

const initialCauses: Cause[] = [
  {
    id: '1',
    title: 'Education for Underprivileged Children',
    description: 'Help provide books and school supplies for children in rural areas.',
    goal: 10000,
    current: 7500,
    ...getImage('cause-1'),
  },
  {
    id: '2',
    title: 'Reforest Our Planet',
    description: 'Join us in planting trees to combat climate change and restore habitats.',
    goal: 50000,
    current: 25000,
    ...getImage('cause-2'),
  },
  {
    id: '3',
    title: 'Healthcare for the Elderly',
    description: 'Support senior citizens with essential medical care and support.',
    goal: 20000,
    current: 15000,
    ...getImage('cause-3'),
  },
  {
    id: '4',
    title: 'Save the Stray Animals',
    description: 'Provide shelter, food, and medical attention for stray animals.',
    goal: 5000,
    current: 4500,
    ...getImage('cause-4'),
  },
  {
    id: '5',
    title: 'Clean Our Oceans',
    description: 'Fund beach and ocean cleanup initiatives to protect marine life.',
    goal: 15000,
    current: 7500,
    ...getImage('cause-5'),
  },
  {
    id: '6',
    title: 'Access to Clean Water',
    description: 'Help build wells and water purification systems in remote communities.',
    goal: 30000,
    current: 28000,
    ...getImage('cause-6'),
  },
];


export default function AdminCausesPage() {
  const [causes, setCauses] = useState<Cause[]>(initialCauses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCause, setEditingCause] = useState<Cause | null>(null);

  const openDialog = (cause: Cause | null = null) => {
    setEditingCause(cause);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setEditingCause(null);
    setIsDialogOpen(false);
  };

  const handleSave = (formData: FormData) => {
    const causeData: Cause = {
      id: formData.get('id') as string || String(causes.length + 1),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      goal: Number(formData.get('goal')),
      current: Number(formData.get('current')),
      imageUrl: editingCause?.imageUrl || `https://picsum.photos/seed/${Math.random()}/600/400`,
      imageHint: editingCause?.imageHint || 'abstract',
    };

    if (editingCause) {
      setCauses(causes.map((c) => (c.id === editingCause.id ? causeData : c)));
    } else {
      setCauses([causeData, ...causes]);
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    setCauses(causes.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Causes</h1>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Cause
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {causes.map((cause) => (
              <TableRow key={cause.id}>
                <TableCell className="font-medium">{cause.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Progress value={(cause.current / cause.goal) * 100} className="w-48 h-2" />
                    <span className="text-xs text-muted-foreground">
                      ${cause.current.toLocaleString()} / ${cause.goal.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(cause)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cause.id)}>
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
              <DialogTitle>{editingCause ? 'Edit Cause' : 'Create New Cause'}</DialogTitle>
              <DialogDescription>
                {editingCause ? 'Make changes to your cause.' : 'Fill in the details for your new cause.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <input type="hidden" name="id" defaultValue={editingCause?.id || ''} />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" defaultValue={editingCause?.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" name="description" defaultValue={editingCause?.description} className="col-span-3" rows={3} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal" className="text-right">
                  Goal
                </Label>
                <Input id="goal" name="goal" type="number" defaultValue={editingCause?.goal} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current" className="text-right">
                  Current
                </Label>
                <Input id="current" name="current" type="number" defaultValue={editingCause?.current} className="col-span-3" />
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
