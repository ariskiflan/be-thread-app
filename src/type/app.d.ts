export interface Iregister {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export type authMidlleware = {
  id: string;
};

const enum Estatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  userId?: number;
}

export interface Ithread {
  id?: number;
  content?: string;
  userId: number;
  threadId: number;
}
