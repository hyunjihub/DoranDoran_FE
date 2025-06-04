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

    if (!accessToken) {
      if (refreshToken) {
        await reissue();
        const newAccessToken = (await cookieStore).get('access')?.value || '';

        if (!newAccessToken) {
          return NextResponse.json({ status: 401 });
        }

        accessToken = newAccessToken;
      } else {
        return NextResponse.json({ status: 401 });
      }
    }

    const { data } = await axios.get<IMypage>(`${process.env.API_BASE_URL}/member/mypage`, {
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken}`,
      },
    });

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
