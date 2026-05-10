export type AuthFieldErrors = Partial<{
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  photoURL: string;
  general: string;
}>;

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  displayName: string;
  confirmPassword: string;
};

export type ProfileInput = {
  displayName: string;
  bio: string;
  photoURL: string;
};
