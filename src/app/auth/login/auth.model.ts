export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  success?: boolean;
  token: string;
  email: string;
  isLoggedIn?: boolean;
  expiresIn: number;
  username: string;
  access?: boolean;
  userID?: string;
}
