import { NextResponse } from 'next/server';
import chatroomSample from '@/app/_util/json/chatroom.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '10');

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = chatroomSample.room.slice(start, end);
  const hasMore = end < chatroomSample.room.length;

  return NextResponse.json({
    data,
    nextPage: page + 1,
    hasMore,
  });
}
