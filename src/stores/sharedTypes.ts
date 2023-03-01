export type TaskType = 'verify' | 'enroll';
export type TaskStatus = 'started' | 'finished' | 'waiting';

export interface MetaData {
  operator_id: string;
  org_id: number;
  org_slug: string;
  client_id: string;
}

export interface LoginData {
  access_token: string,
  refresh_token: string
}
