import { NextResponse } from 'next/server';
import axios from 'axios';
import { checkTokens } from '@/app/_util/tokenCheck';

export async function POST(req: Request) {
  try {
    const tokenErrorResponse = await checkTokens();
    if (tokenErrorResponse) {
      return tokenErrorResponse;
    }

    const body = await req.json();

    await axios.post(`${process.env.API_BASE_URL}/member/mypage/profile`, body, {
      withCredentials: true,
    });

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
