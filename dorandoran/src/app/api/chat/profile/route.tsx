import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value || '';
  const refreshToken = (await cookieStore).get('refresh')?.value || '';

  if (!accessToken && refreshToken) {
    return NextResponse.json({ message: 'accessToken 만료' }, { status: 401 });
  } else if (!accessToken && !refreshToken) {
    return NextResponse.json({ message: 'refreshToken 만료' }, { status: 401 });
  }

  try {
    const id = Number(searchParams.get('id') || 1);

    const { data } = await axios.get(`${process.env.API_BASE_URL}/chat/profile?id=${id}`, {
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
