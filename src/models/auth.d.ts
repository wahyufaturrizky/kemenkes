export type User = {
  id: string;
  userName: string;
  email: string;
  token: string;
  expiration: Date;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
};

export type Error = {
  errors: Object | null;
  type: string;
  title: string;
  status: number | null;
  detail: null | string;
  instance: null | string;
};

export type AuthState = {
  user: any;
  error: Error;
  token: string
  refreshToken: string;
};

export interface IRefreshToken {
  token: string;
  expiration: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}
