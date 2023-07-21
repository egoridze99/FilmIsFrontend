import {
  BeforeNavigateCallbackType,
  INavigationService
} from "src/services/types/navigation.interface";
import {injectable} from "inversify";
import {createBrowserHistory, History} from "history";
import {makeObservable, observable} from "mobx";
import {ROUTER_PATHS} from "src/constants/routerPaths";

@injectable()
export default class NavigationService implements INavigationService {
  private _history: History = createBrowserHistory();
  private beforeNavigateCallbacks: BeforeNavigateCallbackType[] = [];

  @observable lastVisitedPath: string = "";

  constructor() {
    makeObservable(this);
  }

  get history() {
    return this._history;
  }

  async navigate(path: string, search?: string) {
    const beforeNavigationCallbackResults = await Promise.all(
      this.beforeNavigateCallbacks.map((cb) => cb(path))
    );
    if (beforeNavigationCallbackResults.every((item) => item)) {
      this.lastVisitedPath = this._history.location.pathname;
      this._history.push({
        pathname: path,
        search: search ? `?${search}` : ""
      });
      return true;
    }

    return false;
  }

  async setQueryParams(
    data: {key: string; value: string}[],
    withNavigate: boolean = true
  ) {
    const path = this._history.location.pathname;
    const search = this._history.location.search;
    const urlSearchParams = new URLSearchParams(search);

    data.forEach((item) => {
      urlSearchParams.set(item.key, item.value);
    });

    if (withNavigate) {
      return await this.navigate(path, urlSearchParams.toString());
    }

    this._history.push({
      search: `?${urlSearchParams.toString()}`
    });
    return true;
  }

  getQueryParams(): Record<string, any> {
    const search = this._history.location.search;
    const urlSearchParams = new URLSearchParams(search);
    const result: Record<string, any> = {};
    urlSearchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  async removeQueryParams(data: string[], withNavigate: boolean = true) {
    const path = this._history.location.pathname;
    const search = this._history.location.search;
    const urlSearchParams = new URLSearchParams(search);
    data.forEach((key) => urlSearchParams.delete(key));

    return withNavigate
      ? await this.navigate(path, urlSearchParams.toString())
      : true;
  }

  navigateToSignIn() {
    this.navigate(ROUTER_PATHS.signIn);
  }

  navigateToRoot() {
    this.navigate(ROUTER_PATHS.root);
  }

  registerBeforeNavigateHandler(cb: BeforeNavigateCallbackType) {
    this.beforeNavigateCallbacks.push(cb);

    return cb;
  }

  removeBeforeNavigateHandler(cb: BeforeNavigateCallbackType) {
    const isExist = !!this.beforeNavigateCallbacks.find((c) => c === cb);

    if (isExist) {
      this.beforeNavigateCallbacks = this.beforeNavigateCallbacks.filter(
        (c) => c !== cb
      );
    }

    return isExist;
  }
}
