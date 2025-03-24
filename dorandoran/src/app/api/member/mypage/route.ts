import { IMypage } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('access')?.value || '';

    const { data } = await axios.get<IMypage>(`${process.env.API_BASE_URL}/member/mypage`, {
      withCredentials: true,
      headers: {
        Cookie: `access=${sessionCookie}`,
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

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
