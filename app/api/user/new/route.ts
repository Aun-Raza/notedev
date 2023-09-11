import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import _ from 'lodash';

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    if (!username || !password)
      return new Response('Invalid username or password', { status: 400 });

    const newUser = await prisma.user.create({ data: { username, password } });
    return new Response(JSON.stringify(_.pick(newUser, ['username'])), {
      status: 201,
    });
  } catch (error) {
    return new Response('Failed to register user', {
      status: 500,
    });
  }
};
