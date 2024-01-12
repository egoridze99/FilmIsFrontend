import {Guard, GuardsEnum} from "src/types/guards.types";
import {AuthenticationGuard} from "src/guards/authentication.guard";
import {RootGuard} from "./root.guard";

export const guardsDictionary: Record<GuardsEnum, Guard> = {
  [GuardsEnum.AUTHENTICATION_GUARD]: AuthenticationGuard,
  [GuardsEnum.ROOT_GUARD]: RootGuard
};
