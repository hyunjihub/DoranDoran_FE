import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access')?.value || '';

  const formData = await req.formData();
  const file = formData.get('image');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '올바른 파일이 아닙니다.' }, { status: 400 });
  }
  const uniqueName = uuidv4() + encodeURIComponent(file.name);
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/image`,
      { fileName: uniqueName, fileSize: file.size / 1024 ** 2 },
      {
        withCredentials: true,
        headers: {
          Cookie: `access=${accessToken};`,
        },
      }
    );

    await axios.put(response.data.uploadUrl, file, {
      headers: { 'Content-Type': file.type },
    });

    return NextResponse.json(
      { url: `https://${process.env.IMAGE_BUCKET}.s3.amazonaws.com/${uniqueName}` },
      { status: 200 }
    );
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
