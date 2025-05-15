import { IRoom } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';

    const { data } = await axios.get<IRoom>(`${process.env.API_BASE_URL}/chat/lists`, {
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken}`,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = '서버 오류 발생';
    let status = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      status = error.response.status || status;
    }

    if (status === 404 && errorMessage === '채팅방을 찾을 수 없습니다.') return NextResponse.json([], { status: 200 });

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
