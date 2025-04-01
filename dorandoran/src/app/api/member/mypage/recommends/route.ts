import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function PATCH() {
  try {
    const cookieStore = cookies();
    const access = (await cookieStore).get('access')?.value || '';

    await axios.patch(
      `${process.env.API_BASE_URL}/member/mypage/recommends`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `access=${access}`,
        },
      }
    );

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
