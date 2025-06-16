import { IMypage } from './types/types';
import axios from 'axios';

export const getFetchUserInfo = async (executeLogout: () => void): Promise<IMypage> => {
  try {
    const response = await axios.get('/api/member/mypage');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && error.response?.data.message === 'accessToken 만료') {
        try {
          await axios.get(`/api/member/reissue`);
          const retryResponse = await axios.get('/api/member/mypage');
          return retryResponse.data;
        } catch {
          executeLogout();
          throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        }
      } else if (error.response?.status === 401 && error.response?.data.message === 'refreshToken 만료') {
        executeLogout();
        throw new Error('로그아웃 되었습니다. 다시 로그인 해주세요.');
      } else {
        alert(error.response?.data || error.message);
      }
      throw error;
    }
    throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.');
  }
};
