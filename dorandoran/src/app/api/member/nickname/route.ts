import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const word = url.searchParams.get('word');

  if (!word) {
    return NextResponse.json({ error: 'Word query parameter가 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    await axios.get(`${process.env.API_BASE_URL}/nickname?word=${word}`);
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
