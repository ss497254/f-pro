export interface IMessage {
  content: string;
  username: string;
  timestamp: number;
  delivering?: boolean;
}
