export type Cause = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  goal: number;
  current: number;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  preview: string;
};
