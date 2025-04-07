import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function DELETE(req: Request) {
  try {
    const { password } = await req.json();
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';
    const refreshToken = (await cookieStore).get('refresh')?.value || '';

    const response = await axios.delete(`${process.env.API_BASE_URL}/member/logout`, {
      data: {
        password: password,
      },
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken}; refresh=${refreshToken};`,
      },
    });

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const res = NextResponse.json({}, { status: 201 });

      setCookieHeader.forEach((cookie) => {
        res.headers.append('Set-Cookie', cookie);
      });

      return res;
    }

    return NextResponse.json({}, { status: 204 });
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
