import { IChannel, IUser } from ".";

export interface ResponseType<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type LoginResponse = {
  token: string;
  user: IUser;
  channels: IChannel[];
};
