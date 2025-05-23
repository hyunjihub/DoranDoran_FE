import { IMessage } from '@/app/_util/types/types';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('access')?.value || '';
    const { searchParams } = new URL(request.url);
    const key = Number(searchParams.get('key') || null);
    const groupId = Number(searchParams.get('groupId') || null);
    const privateId = Number(searchParams.get('privateId') || null);

    const { data } = await axios.get<IMessage[]>(
      `${process.env.API_BASE_URL}/chat/chats?${groupId ? 'groupId' : 'privateId'}=${groupId ? groupId : privateId}${
        key ? `&key=${key}` : ''
      }`,
      {
        withCredentials: true,
        headers: {
          Cookie: `access=${accessToken}`,
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
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
