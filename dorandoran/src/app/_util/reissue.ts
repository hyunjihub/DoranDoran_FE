import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function reissue() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get('refresh')?.value;

  const response = await axios.post(`${process.env.API_BASE_URL}/member/reissue`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh=${refreshToken}`,
    },
  });

  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader) {
    const res = NextResponse.json(response.data, { status: 201 });

    setCookieHeader.forEach((cookie) => {
      res.headers.append('Set-Cookie', cookie);
    });

    return res;
  }
  return NextResponse.json({ status: 201 });
}
