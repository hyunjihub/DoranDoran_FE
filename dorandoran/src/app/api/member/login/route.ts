import { IUser } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const host = req.headers.get('host') || '.dorandoran.online';

    const response = await axios.post<IUser>(`${process.env.API_BASE_URL}/member/login`, body, {
      withCredentials: true,
      headers: {
        Host: host,
        'Content-Type': 'application/json',
      },
    });

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      setCookieHeader.forEach(async (cookie) => {
        const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
        (await cookies()).set(cookieName, cookieValue, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          domain: host,
          ...(cookieName !== 'access' ? { maxAge: 604800 } : {}),
        });
      });
    }

    const res = NextResponse.json(response.data, { status: 201 });
    if (setCookieHeader) {
      res.headers.set('Set-Cookie', setCookieHeader.join(', '));
    }
    return res;
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
