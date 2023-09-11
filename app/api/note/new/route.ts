import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { userId, title, text } = await request.json();
    if (!userId || !title || !text)
      return new NextResponse('Missing either userId, title or text', {
        status: 400,
      });

    const newNote = await prisma.note.create({
      data: { ownerId: userId, title, text },
    });
    return new NextResponse(JSON.stringify(newNote), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to post new note', { status: 500 });
  }
};
