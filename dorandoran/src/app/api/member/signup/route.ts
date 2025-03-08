import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'https://your-backend-server.com'; // 실제 백엔드 서버 주소

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await axios.post(`${API_BASE_URL}/member/signup`, body);
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
