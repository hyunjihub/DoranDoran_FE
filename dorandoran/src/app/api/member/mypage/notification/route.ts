import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');

    if (!accessToken) {
      return NextResponse.json({ error: 'accessToken이 없습니다.' }, { status: 401 });
    } else if (!refreshToken) {
      return NextResponse.json({ error: 'refreshToken이 없습니다.' }, { status: 401 });
    }

    await axios.post(
      `${process.env.API_BASE_URL}/member/mypage/notification`,
      { isNotification: req },
      {
        withCredentials: true,
      }
    );

    return NextResponse.json({ status: 201 });
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
