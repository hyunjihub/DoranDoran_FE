import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    await axios.post(`${process.env.API_BASE_URL}/member/logout`);
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
