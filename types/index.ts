export interface Note {
  id: string;
  title: string;
  text: string;
  date: number;
}

export const MockNotes: Note[] = [
  {
    id: '1',
    title: 'JavaScript',
    text: 'text1...',
    date: Date.now(),
  },
  {
    id: '2',
    title: 'CSS',
    text: 'text2...',
    date: Date.now(),
  },
  {
    id: '3',
    title: 'React',
    text: 'text3...',
    date: Date.now(),
  },
  {
    id: '4',
    title: 'NextJS',
    text: 'text4...',
    date: Date.now(),
  },
];
