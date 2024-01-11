import {UserCreationBodyType} from "src/types/admin/admin.types";
import {Roles} from "src/types/core.types";

export const initialValues: UserCreationBodyType = {
  login: "",
  name: "",
  password: "",
  surname: "",
  role: Roles.admin
};
