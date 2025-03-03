export interface IUser {
  userId: string | null;
  nickname: string | null;
  accessToken: string | null;
  profileImg: string | null;
}

export interface IChat {
  isManager: boolean | null;
  isAvaliable: boolean | null;
  chatTitle: string | null;
}

export interface IMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isDateChanged?: boolean;
  isLastInGroup?: boolean;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IFindForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignupForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type AuthStatus = 'idle' | 'inProgress' | 'failed' | 'success';
