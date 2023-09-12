import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    if (!username || !password)
      return NextResponse.json('Invalid username or password', { status: 400 });

    const foundUser = await prisma.user.findFirstOrThrow({
      where: { username },
    });

    if (!foundUser)
      return NextResponse.json('Incorrect username or password', {
        status: 404,
      });

    if (!bcrypt.compareSync(password, foundUser.password))
      return NextResponse.json('Incorrect username or password', {
        status: 404,
      });

    const token = jwt.sign(
      { id: foundUser.id, username },
      process.env.SECRET || ''
    );
    const response = NextResponse.json(_.pick(foundUser, ['id', 'username']), {
      status: 201,
    });
    response.cookies.set('token', token);
    return response;
  } catch (error) {
    return NextResponse.json('Failed to register user', {
      status: 500,
    });
  }
};
