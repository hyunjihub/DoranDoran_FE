import { ILoginForm } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'https://your-backend-server.com'; // 실제 백엔드 서버 주소

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await axios.post<ILoginForm>(`${API_BASE_URL}/member/email`, body);

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
