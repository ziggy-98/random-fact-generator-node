import { UserService } from "../plugins/services/UserService";
import { FactService } from "../plugins/services/FactService";

export type Services = {
  userService: UserService;
  factService: FactService;
};
