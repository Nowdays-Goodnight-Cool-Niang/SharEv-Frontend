export interface ISocialLinks {
  github?: string;
  linkedIn?: string;
  instagram?: string;
}

export interface IAccount {
  id?: string;
  name: string;
  email: string;
  socialLinks: ISocialLinks;
}
