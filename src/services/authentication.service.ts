import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction
} from "mobx";
import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {IStorage} from "src/services/types/storage.interface";
import {AUTHENTICATION_KEY} from "src/constants/storageKeys";
import jwtDecode from "jwt-decode";
import {User} from "src/types/core.types";
import {axios} from "src/axios";
import {IAuthenticationService} from "src/services/types/authentication.interface";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  @inject(TYPES.LocalStorageService)
  @observable
  private readonly localStorageService: IStorage;

  @observable isLoading: boolean = false;
  @observable isAuthenticated: boolean = false;
  @observable private jwt: string | null = null;

  constructor() {
    makeObservable(this);

    reaction(
      () => this.localStorageService,
      (localStorageService) => {
        const jwt = localStorageService.getItem(AUTHENTICATION_KEY);

        runInAction(() => {
          if (jwt) {
            this.isAuthenticated = true;
            this.jwt = jwt;
          }
        });
      }
    );
  }

  @computed
  get userData() {
    if (!this.jwt) {
      return null;
    }

    return (jwtDecode(this.jwt) as {identity: User}).identity;
  }

  @action
  async signIn(login: string, password: string) {
    this.isLoading = true;

    try {
      const response = await axios.post<{jwt: string}>("/login", {
        login,
        password
      });

      this.jwt = response.data.jwt;
      this.localStorageService.setItem(AUTHENTICATION_KEY, this.jwt as string);
      this.isAuthenticated = true;

      return {isSuccess: true};
    } catch (e) {
      return {
        isSuccess: false,
        error: e?.response?.data?.msg || "Непредвиденная ошибка"
      };
    } finally {
      this.isLoading = false;
    }
  }

  @action
  logout() {
    this.localStorageService.removeItem(AUTHENTICATION_KEY);
    this.jwt = null;
    this.isAuthenticated = false;
  }
}
