import type { Cause, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

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

export const causes: Cause[] = [
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

export const blogPosts: BlogPost[] = [
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
