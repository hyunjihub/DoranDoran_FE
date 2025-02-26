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
