import {User} from "src/types/core.types";

export interface IAuthenticationService {
  isLoading: boolean;
  isAuthenticated: boolean;
  userData: User | null;
  isRoot: boolean;

  signIn(
    login: string,
    password: string
  ): Promise<{isSuccess: boolean; error?: string}>;
  logout(): void;
}
