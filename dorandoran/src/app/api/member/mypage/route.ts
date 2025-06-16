import { IMypage } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { reissue } from '@/app/_util/reissue';

export async function GET() {
  try {
    const cookieStore = cookies();
    let accessToken = (await cookieStore).get('access')?.value || '';
    const refreshToken = (await cookieStore).get('refresh')?.value || '';

    let response: NextResponse | null = null;

    if (!accessToken && refreshToken) {
      const reissueResult = await reissue(refreshToken);

      if (!reissueResult.accessToken) {
        return NextResponse.json({ status: 401 });
      }

      accessToken = reissueResult.accessToken;
      response = NextResponse.next();
      response.headers.append('Set-Cookie', `access=${accessToken};`);
    }

    const { data } = await axios.get<IMypage>(`${process.env.API_BASE_URL}/member/mypage`, {
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`,
      },
    });

    if (response) {
      response = NextResponse.json(data, { status: 201 });
      response.headers.append('Set-Cookie', `access=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`);
      return response;
    }

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
