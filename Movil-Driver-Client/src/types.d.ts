export type AuthContextType = {
  token: boolean;
  setToken: (token: boolean) => void;
  login: () => void;
  logout: () => void;
}