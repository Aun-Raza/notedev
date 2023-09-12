import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from '@/middleware/auth';
import { User } from '@/types';
const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { id } = getDataFromToken(request) as User;
    const { title, text } = await request.json();
    if (!title || !text)
      return NextResponse.json('Missing title or text', {
        status: 400,
      });

    const newNote = await prisma.note.create({
      data: { ownerId: id, title, text },
    });
    return NextResponse.json(newNote, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to post new note', { status: 500 });
  }
};
