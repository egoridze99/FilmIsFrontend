import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {TransactionService} from "src/services/transaction.service";

export class TransactionContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.TransactionService).to(TransactionService);
  }
}
