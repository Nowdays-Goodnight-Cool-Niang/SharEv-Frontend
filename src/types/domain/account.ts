export interface IAccountApiResponse {
  id?: number;
  name: string;
  email: string;
}

export interface IAccountUpdateRequest {
  name: string;
  email: string;
  addLinkUrls?: string[];
  deleteLinkIds?: number[];
}

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
