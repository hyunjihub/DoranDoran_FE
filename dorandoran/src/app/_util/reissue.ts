import axios from 'axios';

export async function reissue(refreshToken: string) {
  const response = await axios.post(`${process.env.API_BASE_URL}/member/reissue`, null, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh=${refreshToken}`,
    },
    withCredentials: true,
  });

  const setCookie = response.headers['set-cookie'];
  const newAccessToken = extractCookieValue(setCookie, 'access');
  return { accessToken: newAccessToken };
}

function extractCookieValue(setCookieHeader: string[] | undefined, name: string): string | null {
  if (!setCookieHeader) return null;
  const regex = new RegExp(`${name}=([^;]+)`);
  for (const cookie of setCookieHeader) {
    const match = cookie.match(regex);
    if (match) return match[1];
  }
  return null;
}
