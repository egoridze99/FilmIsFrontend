import {Guard, GuardsEnum} from "src/types/guards.types";
import {AuthenticationGuard} from "src/guards/authentication.guard";

export const guardsDictionary: Record<GuardsEnum, Guard> = {
  [GuardsEnum.AUTHENTICATION_GUARD]: AuthenticationGuard
};
