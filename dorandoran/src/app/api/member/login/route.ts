import { IUser } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await axios.post<IUser>(`${process.env.API_BASE_URL}/member/login`, body);

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const res = NextResponse.json(response.data, { status: 201 });

      setCookieHeader.forEach((cookie) => {
        res.headers.append('Set-Cookie', cookie);
      });

      return res;
    }

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
