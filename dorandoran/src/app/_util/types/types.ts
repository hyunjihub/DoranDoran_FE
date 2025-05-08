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

export interface IWebsocket {
  socket: WebSocket | null;
  isConnect: boolean;
}

export interface IRoom {
  id: number;
  title: string;
  count: number;
  maxCount: number;
  lastChatTime: string;
}

export interface IRoomInfo {
  chatRoomTitle: string;
  chatRoomImage: string;
  maxCount: number;
  currentCount: number;
  description: string;
  isManager: boolean;
}

export interface IMessage {
  chatId: number;
  type: 'text' | 'image' | 'system';
  contents: string;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  date: string;
  time: string;
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
