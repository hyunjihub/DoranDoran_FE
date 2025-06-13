import { NextRequest, NextResponse } from 'next/server';

import { IUser } from '@/app/_util/types/types';
import axios from 'axios';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = await axios.patch<IUser>(`${process.env.API_BASE_URL}/member/password`, body);

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
