import { Fields, Files, IncomingForm } from 'formidable';
import { NextRequest, NextResponse } from 'next/server';

import { IncomingMessage } from 'http';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 바디 파서 비활성화
  },
};

export async function POST(req: NextRequest) {
  const form = new IncomingForm();

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req as unknown as IncomingMessage, async (err, fields: Fields, files: Files) => {
      if (err) {
        return reject(NextResponse.json({ error: '파일 업로드 실패' }, { status: 500 }));
      }

      const image = files.image?.[0];
      if (!image) {
        return reject(NextResponse.json({ error: '이미지 파일이 존재하지 않습니다.' }, { status: 400 }));
      }

      try {
        const response = await axios.post(
          `${process.env.API_BASE_URL}/image`,
          { imageName: image.originalFilename },
          { withCredentials: true }
        );

        await axios.put(response.data.uploadUrl, image, {
          headers: { 'Content-Type': image.mimetype },
        });

        return resolve(
          NextResponse.json(
            { img: `https://${process.env.IMAGE_BUCKET}.s3.amazonaws.com/${image.originalFilename}` },
            { status: 200 }
          )
        );
      } catch (error: unknown) {
        let errorMessage = '서버 오류 발생';
        let status = 500;

        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data?.message || errorMessage;
          status = error.response.status || status;
        }

        return resolve(NextResponse.json({ error: errorMessage }, { status }));
      }
    });
  });
}
