import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function checkTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken) {
    return NextResponse.json({ error: 'accessToken이 없습니다.' }, { status: 401 });
  } else if (!refreshToken) {
    return NextResponse.json({ error: 'refreshToken이 없습니다.' }, { status: 401 });
  }

  return null;
}
