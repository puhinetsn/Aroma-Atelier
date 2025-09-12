export interface SignInFields {
  email: string;
  password: string;
}

export interface SignUpFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserToken {
  token: string;
}
