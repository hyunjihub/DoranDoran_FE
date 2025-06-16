import { IMypage } from './types/types';
import axios from 'axios';

export const getFetchUserInfo = async (): Promise<IMypage> => {
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
        } catch (error) {
          // 로그아웃
          console.log(error);
        }
      } else if (error.response?.status === 401 && error.response?.data.message === 'refreshToken 만료') {
        // 로그아웃
      } else console.error('Axios Error: ', error.response?.data || error.message);
    } else {
      console.error('Unknown Error: ', error);
    }
    throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.');
  }
};
