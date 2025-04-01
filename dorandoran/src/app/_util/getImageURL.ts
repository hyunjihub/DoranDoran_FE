import axios from 'axios';

export default async function getImageURL(image: File): Promise<string | null> {
  const validMimeTypes = ['image/png', 'image/jpeg'];
  const maxSizeMB = 10;

  if (!validMimeTypes.includes(image.type)) {
    alert('이미지는 png, jpg/jpeg 파일만 업로드 가능합니다.');
    return null;
  }

  if (image.size < maxSizeMB * 1024 * 1024) {
    alert('이미지는 10MB 이하의 파일만 업로드 가능합니다.');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post('/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url;
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    return null;
  }
}
