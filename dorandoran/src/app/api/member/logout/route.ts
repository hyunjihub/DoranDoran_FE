import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    const access = (await cookieStore).get('access')?.value || '';
    const refresh = (await cookieStore).get('refresh')?.value || '';

    await axios.post(
      `${process.env.API_BASE_URL}/member/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `access=${access}; refresh=${refresh};`,
        },
      }
    );

    const cookieNames = ['access', 'refresh'];

    cookieNames.forEach(async (cookieName) => {
      (await cookieStore).delete(cookieName);
    });

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
