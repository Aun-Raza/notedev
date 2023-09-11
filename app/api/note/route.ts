import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const notes = await prisma.note.findMany({
      include: { owner: true },
      orderBy: { updatedAt: 'desc' },
    });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all notes', {
      status: 500,
    });
  }
};
