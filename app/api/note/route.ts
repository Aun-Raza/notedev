import { getDataFromToken } from '@/middleware/auth';
import { User } from '@/types';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    const { id } = getDataFromToken(request) as User;
    const notes = await prisma.note.findMany({
      where: { ownerId: id },
      include: { owner: true },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch all notes', {
      status: 500,
    });
  }
};
