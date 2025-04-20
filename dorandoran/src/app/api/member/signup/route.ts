import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await axios.post(`${process.env.API_BASE_URL}/member/signup`, body);
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
