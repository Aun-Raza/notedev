'use client';

import { MockNotes, Note } from '@/types';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React, { useState } from 'react';

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>(MockNotes);

  function handleNoteChange(id: string, title: string, text: string) {
    const notesClone = [...notes];
    const foundNote = notesClone.find((note) => note.id === id);
    if (!foundNote) return;
    foundNote.title = title;
    foundNote.text = text;
    setNotes(notesClone);
  }

  return (
    <div className='mt-4 container mx-auto'>
      <h1 className='text-4xl font-semibold font-mono'>Notes</h1>
      <Button color='primary' className='mt-1'>
        <span className='font-bold'>+</span>Add Note
      </Button>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-2'>
        {notes.map(({ id, title, text, date }) => (
          <Card key={id}>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <input
                className='w-full font-bold text-large p-1 focus:outline-none'
                value={title}
                onChange={(ev) => handleNoteChange(id, ev.target.value, text)}
              />
            </CardHeader>
            <CardBody className='py-2 h-unit-7xl'>
              <textarea
                className='w-full h-full p-1 focus:outline-none resize-none'
                value={text}
                onChange={(ev) => handleNoteChange(id, title, ev.target.value)}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
