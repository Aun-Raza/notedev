import { getDataFromToken } from '@/middleware/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

interface IParams {
  params: { noteId: string };
}

export const GET = async (request: NextRequest, { params }: IParams) => {
  try {
    getDataFromToken(request);
    const { noteId } = params;
    const notes = await prisma.note.findUniqueOrThrow({
      where: { id: noteId },
      include: { owner: true },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch note', {
      status: 500,
    });
  }
};

export const PUT = async (request: NextRequest, { params }: IParams) => {
  try {
    getDataFromToken(request);
    const { noteId } = params;
    const { title, text } = await request.json();
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      include: { owner: true },
      data: { title, text },
    });
    return NextResponse.json(updatedNote, { status: 201 });
  } catch (error) {
    return NextResponse.json('Failed to update note', {
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
    return NextResponse.json(deletedNote, { status: 201 });
  } catch (error) {
    return NextResponse.json('Failed to delete note', {
      status: 500,
    });
  }
};
