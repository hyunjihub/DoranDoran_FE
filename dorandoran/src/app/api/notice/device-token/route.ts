import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';
    const refreshToken = (await cookieStore).get('refresh')?.value || '';

    if (!accessToken && refreshToken) {
      return NextResponse.json({ message: 'accessToken 만료' }, { status: 401 });
    } else if (!accessToken && !refreshToken) {
      return NextResponse.json({ message: 'refreshToken 만료' }, { status: 401 });
    }

    await axios.post(`${process.env.API_BASE_URL}/notice/device-token`, body, {
      headers: {
        Cookie: `access=${accessToken};`,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    let errorMessage = '서버 오류 발생';
    let status = 500;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      status = error.response.status || status;
      console.log(error.response.data?.message);
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}

export async function DELETE(req: Request) {
  try {
    const { deviceToken } = await req.json();
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';
    const refreshToken = (await cookieStore).get('refresh')?.value || '';

    if (!accessToken && refreshToken) {
      return NextResponse.json({ message: 'accessToken 만료' }, { status: 401 });
    } else if (!accessToken && !refreshToken) {
      return NextResponse.json({ message: 'refreshToken 만료' }, { status: 401 });
    }

    await axios.delete(`${process.env.API_BASE_URL}/member/withdraw`, {
      data: {
        deviceToken,
      },
      withCredentials: true,
      headers: {
        Cookie: `access=${accessToken};`,
      },
    });

    return NextResponse.json({}, { status: 200 });
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
