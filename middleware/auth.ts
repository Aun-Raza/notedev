import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decoded = jwt.verify(token, process.env.SECRET || '');
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
