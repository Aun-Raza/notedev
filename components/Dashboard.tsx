'use client';

import { useDebounce } from '@/hook/useDebounce';
import { Note } from '@/types';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [updatedNote, setUpdatedNote] = useState<Note | null>(null);
  const debouncedNote = useDebounce(updatedNote, 1000);

  async function deleteNote(id: string) {
    const { data } = await axios.delete<Note>(`/api/note/${id}`);

    const notesClone = notes.filter((note) => note.id !== data.id);
    setNotes(notesClone);
  }

  async function addNote() {
    const { data } = await axios.post<Note>('/api/note/new', {
      title: ' ',
      text: ' ',
    });
    const notesClone = [...notes];
    notesClone.unshift(data);
    setNotes(notesClone);
  }

  function handleNoteChange(id: string, title: string, text: string) {
    const notesClone = [...notes];
    const foundNote = notesClone.find((note) => note.id === id);
    if (!foundNote) return;

    foundNote.title = title;
    foundNote.text = text;
    foundNote.updatedAt = new Date();
    const updated = { ...foundNote, title, text };
    setNotes(notesClone);
    setUpdatedNote(updated);
  }

  useEffect(() => {
    async function updateNote(updatedNote: Note) {
      const { id, title, text } = updatedNote;
      await axios.put(`/api/note/${id}`, { title, text });
    }

    if (debouncedNote) {
      updateNote(debouncedNote);
    }
  }, [debouncedNote]);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await axios.get<Note[]>('/api/note');
      setNotes(data);
    }
    fetchNotes();
  }, []);

  return (
    <div className='mt-4 container mx-auto'>
      <h1 className='text-4xl font-semibold font-mono'>Notes</h1>
      <Button onClick={addNote} color='primary' className='mt-1'>
        <span className='font-bold'>+</span>Add Note
      </Button>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-2'>
        {notes.map(({ id, title, text, updatedAt }) => (
          <Card key={id}>
            <CardHeader className='pb-0 pt-2 px-4 flex'>
              <input
                className='w-full font-bold text-large p-1 focus:outline-none grow'
                value={title}
                onChange={(ev) => handleNoteChange(id, ev.target.value, text)}
              />
              <Button
                onClick={() => deleteNote(id)}
                color='danger'
                className='w-fit'
              >
                Delete
              </Button>
            </CardHeader>
            <CardBody className='py-2 h-unit-7xl flex flex-col'>
              <textarea
                className='w-full h-full p-1 focus:outline-none resize-none grow'
                value={text}
                onChange={(ev) => handleNoteChange(id, title, ev.target.value)}
              />
              <time className='text-right'>
                {moment(updatedAt).format('MM/DD/YY hh:mma')}
              </time>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
