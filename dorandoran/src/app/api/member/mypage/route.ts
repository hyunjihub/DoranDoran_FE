import { IMypage } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { checkTokens } from '@/app/_util/tokenCheck';

export async function POST() {
  try {
    const tokenErrorResponse = await checkTokens();
    if (tokenErrorResponse) {
      return tokenErrorResponse;
    }

    const { data } = await axios.post<IMypage>(
      `${process.env.API_BASE_URL}/member/mypage`,
      {},
      {
        withCredentials: true,
      }
    );

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
