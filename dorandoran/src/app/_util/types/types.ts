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
