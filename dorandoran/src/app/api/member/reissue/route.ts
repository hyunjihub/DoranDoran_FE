import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const refresh = (await cookieStore).get('refresh')?.value || '';

    const response = await axios.get(`${process.env.API_BASE_URL}/member/reissue`, {
      withCredentials: true,
      headers: {
        Cookie: `refresh=${refresh}`,
      },
    });

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const res = NextResponse.json({ status: 201 });

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
