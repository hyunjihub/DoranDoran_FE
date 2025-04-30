import { NextResponse } from 'next/server';
import axios from 'axios';
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await axios.post(`${process.env.API_BASE_URL}/chat/chatrooms`, body);
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = '서버 오류 발생';
    let status = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      status = error.response.status || status;
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
