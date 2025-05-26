import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = Number(searchParams.get('cursor') || '0');
    const limit = Number(searchParams.get('limit') || '10');

    const { data } = await axios.get(
      `${process.env.API_BASE_URL}/chat/chatrooms?limit=${limit}${cursor > 0 ? `&cursor=${cursor}` : ''}`
    );

    const hasMore = data.length === limit;

    return NextResponse.json({
      data,
      nextPage: cursor !== null ? cursor + 1 : 1,
      hasMore,
    });
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

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';

    const body = await req.json();

    const { data } = await axios.post(`${process.env.API_BASE_URL}/chat/chatrooms`, body, {
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken};`,
      },
    });
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
