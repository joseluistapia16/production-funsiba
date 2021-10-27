export interface User {
  user_id?: number;
  username: string;
  avatar_id?: number;
  score: number;
}

export interface Login {
  email: string;
  password: string;
}
