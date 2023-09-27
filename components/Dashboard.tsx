'use client';

import { useDebounce } from '@/hook/useDebounce';
import { Note } from '@/types';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@nextui-org/react';
import DeletePrompt from './DeletePrompt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchText, setSearchText] = useState('');
  const [updatedNote, setUpdatedNote] = useState<Note | null>(null);
  const debouncedNote = useDebounce(updatedNote, 1000);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function deleteNote(id: string) {
    const { data } = await axios.delete<Note>(`/api/note/${id}`);

    const notesClone = notes.filter((note) => note.id !== data.id);
    setNotes(notesClone);
    toast.error('Deleted note', { autoClose: 1000 });
  }

  async function addNote() {
    const { data } = await axios.post<Note>('/api/note/new', {
      title: ' ',
      text: ' ',
    });
    const notesClone = [...notes];
    notesClone.unshift(data);
    setNotes(notesClone);
    toast.success('Added new note', { autoClose: 1500 });
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

  function notesBySearch() {
    if (!searchText.trim()) return notes;

    const regex = new RegExp(searchText, 'i');
    const filteredNotes = notes.filter(
      (note) => regex.test(note.title) || regex.test(note.text)
    );
    return filteredNotes;
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
      <ToastContainer />
      <DeletePrompt
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedNote={selectedNote}
        onDelete={deleteNote}
      />
      <h1 className='text-6xl font-semibold font-mono text-primary mt-6 mb-4'>
        Dashboard
      </h1>
      <Button onClick={addNote} color='secondary' className='mt-1'>
        <span className='font-bold'>+</span>Add Note
      </Button>
      <Input
        type='text'
        label='Search notes by name or content'
        className='search-input my-2'
        size='sm'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-2'>
        {notesBySearch().map((note) => (
          <Card key={note.id} className='hover:border-0 hover:outline-blue-300'>
            <CardHeader className='pb-0 pt-2 px-4 flex'>
              <input
                className='w-full font-bold text-large p-1 focus:outline-none grow text-primary'
                value={note.title}
                onChange={(ev) =>
                  handleNoteChange(note.id, ev.target.value, note.text)
                }
              />

              <Button
                onPress={() => {
                  setSelectedNote(note);
                  onOpen();
                }}
                className='flex justify-end px-2'
                color='danger'
                size='sm'
              >
                <FontAwesomeIcon size='xl' icon={faDeleteLeft} />
              </Button>
            </CardHeader>
            <CardBody className='py-2 h-unit-7xl flex flex-col'>
              <textarea
                className='w-full h-full p-1 focus:outline-none resize-none grow text-primary'
                value={note.text}
                onChange={(ev) =>
                  handleNoteChange(note.id, note.title, ev.target.value)
                }
              />
              <time className='text-right font-mono text-secondary'>
                {moment(note.updatedAt).format('MM/DD/YY hh:mma')}
              </time>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
