import axios from 'axios';
import useLogout from '@/app/_util/hooks/useLogout';

export const useRequestWithAuthRetry = () => {
  const executeLogout = useLogout({ type: 'session' });

  const requestWithRetry = async <T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    data?: object | null
  ): Promise<T> => {
    try {
      await axios.get('/api/member/reissue');
      return await axios({ method, url, data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        const status = error.response?.status;

        if (status === 401 && msg === 'accessToken 만료') {
          try {
            await axios.get('/api/member/reissue');
            const response = await axios({ method, url, data });
            return response.data;
          } catch {
            executeLogout();
            throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
          }
        }

        if (status === 401 && msg === 'refreshToken 만료') {
          executeLogout();
          throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
        }

        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  };

  return requestWithRetry;
};
