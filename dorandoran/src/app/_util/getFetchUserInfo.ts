import { IMypage } from './types/types';
import axios from 'axios';

export const getFetchUserInfo = async (): Promise<IMypage> => {
  try {
    const response = await axios.get('/api/member/mypage', { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error: ', error.response?.data || error.message);
    } else {
      console.error('Unknown Error: ', error);
    }
    throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.');
  }
};
