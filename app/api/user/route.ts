import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import _ from 'lodash';

export const GET = async (request: Request) => {
  try {
    const allUsers = await prisma.user.findMany({});
    return new Response(JSON.stringify(allUsers), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch all users', {
      status: 500,
    });
  }
};
