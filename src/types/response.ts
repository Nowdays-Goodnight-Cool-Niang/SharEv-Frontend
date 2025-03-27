import { IProfile } from '.';

export interface IParticipantsResponse {
  accountInfoPage: {
    content: IProfile[];
  };
  totalSize: number;
}
