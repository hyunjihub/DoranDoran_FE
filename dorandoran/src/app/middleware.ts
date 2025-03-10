import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const allowedOrigin = process.env.API_BASE_URL;

export function middleware(req: NextRequest) {
  if (!allowedOrigin) {
    console.error('CORS ERROR: API_BASE_URL is not set');
    return new NextResponse('CORS 설정 오류', { status: 500 });
  }

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
