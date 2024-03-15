import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {CustomerService} from "src/services/customer.service";

export class CustomerContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.CustomerService).to(CustomerService);
  }
}
