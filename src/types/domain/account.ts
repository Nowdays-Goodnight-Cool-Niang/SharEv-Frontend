export interface IAccountApiResponse {
  id?: number;
  name: string;
  email: string;
}

export type IAccountUpdateRequest = Omit<IAccountApiResponse, 'id'>;

export interface ILink {
  id: number;
  url: string;
}

export interface IAccount {
  id?: number;
  name: string;
  email: string;
  linkUrls: string[];
}
