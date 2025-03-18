import { Fields, Files, IncomingForm } from 'formidable';

import { IncomingMessage } from 'http';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { checkTokens } from '@/app/_util/tokenCheck';

export const config = {
  api: {
    bodyParser: false, // Next.js의 기본 바디 파서 비활성화
  },
};

export async function POST(req: Request) {
  return new Promise<NextResponse>((resolve, reject) => {
    // Next.js의 Request를 IncomingMessage로 변환
    const nodeReq = req as unknown as IncomingMessage;

    const form = new IncomingForm();

    form.parse(nodeReq, async (err, fields: Fields, files: Files) => {
      if (err) {
        return reject(NextResponse.json({ error: '파일 업로드 실패' }, { status: 500 }));
      }

      const image = files.image?.[0];
      if (!image) {
        return reject(NextResponse.json({ error: '이미지 파일이 존재하지 않습니다.' }, { status: 400 }));
      }

      try {
        const tokenErrorResponse = await checkTokens();
        if (tokenErrorResponse) {
          return resolve(tokenErrorResponse);
        }

        const response = await axios.post(
          `${process.env.API_BASE_URL}/image`,
          { imageName: image.originalFilename },
          {
            withCredentials: true,
          }
        );

        await axios.put(response.data.uploadUrl, image, {
          headers: {
            'Content-Type': image.mimetype,
          },
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
