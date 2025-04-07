export interface IUser {
  memberId: number | null;
  nickname: string | null;
  profileImage: string | null;
}

export interface IMypage {
  email: string | null;
  isNotification: boolean | null;
  isPermitted: boolean | null;
}

export interface IChat {
  isManager: boolean | null;
  isAvaliable: boolean | null;
  chatTitle: string | null;
}

export interface IRoom {
  id: number;
  title: string;
  count: number;
  maxCount: number;
  lastChatTime: string;
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
