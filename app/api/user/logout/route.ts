import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const response = NextResponse.json('logout successful', { status: 200 });
  response.cookies.delete('token');
  return response;
};
