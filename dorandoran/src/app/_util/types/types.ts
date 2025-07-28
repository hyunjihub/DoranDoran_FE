export interface IUser {
  memberId: number | null;
  nickname: string | null;
  profileImage: string | null;
}

export interface IUserProfile extends IUser {
  chatPermitted: boolean;
}

export interface IMypage {
  email: string | null;
  isNotification: boolean | null;
  isPermitted: boolean | null;
}

export interface IChat {
  chatRoomId: number;
  partInPeople: number;
  chatTitle: string | null;
  isGroup: boolean;
  isClose: boolean;
}

export interface IWebsocket {
  socket: WebSocket | null;
  isConnect: boolean;
}

export interface IRoom {
  chatRoomId: number;
  chatRoomTitle: string;
  partInPeople: number;
  chatRoomImage: string | null;
  nonReadCount?: number;
  lastChatContent?: string;
  lastChatTime: string;
  isGroup?: boolean;
  isClose?: boolean;
}

export interface IRoomItem extends IRoom {
  description: string;
  maxCount: number;
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
  type: 'text' | 'image' | 'system' | 'enter' | 'leave' | 'change';
  content: string;
  senderId: number;
  senderNickname: string | null;
  senderProfileImage: string | null;
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
