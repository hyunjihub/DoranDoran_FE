import { IUser } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const host = req.headers.get('host') || 'www.dorandoran.online';

    const { data } = await axios.post<IUser>(`${process.env.API_BASE_URL}/member/login`, body, {
      withCredentials: true,
      headers: {
        Host: host,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = '서버 오류 발생';
    let status = 500;

    console.log(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      status = error.response.status || status;
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
