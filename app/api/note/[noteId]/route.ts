import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
const prisma = new PrismaClient();

interface IParams {
  params: { noteId: string };
}

export const GET = async (request: NextRequest, { params }: IParams) => {
  try {
    const { noteId } = params;
    const notes = await prisma.note.findUniqueOrThrow({
      where: { id: noteId },
      include: { owner: true },
    });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch note', {
      status: 500,
    });
  }
};

export const PUT = async (request: NextRequest, { params }: IParams) => {
  try {
    const { noteId } = params;
    const { title, text } = await request.json();
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      include: { owner: true },
      data: { title, text },
    });
    return new Response(JSON.stringify(updatedNote), { status: 201 });
  } catch (error) {
    return new Response('Failed to update note', {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest, { params }: IParams) => {
  try {
    const { noteId } = params;
    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
      include: { owner: true },
    });
    return new Response(JSON.stringify(deletedNote), { status: 201 });
  } catch (error) {
    return new Response('Failed to delete note', {
      status: 500,
    });
  }
};
