import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import _ from 'lodash';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    if (!username || !password)
      return NextResponse.json('Invalid username or password', { status: 400 });

    const foundUser = await prisma.user.findFirst({
      where: { username },
    });

    if (foundUser)
      return NextResponse.json('user already registered', { status: 400 });

    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = await prisma.user.create({
      data: { username, password: hash },
    });

    const token = jwt.sign(
      { id: newUser.id, username },
      process.env.SECRET || ''
    );
    const response = NextResponse.json(_.pick(newUser, ['id', 'username']), {
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
