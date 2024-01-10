import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {AdminDataClient} from "src/stores/admin/admin.dataClient";
import {AdminRepository} from "src/stores/admin/admin.repository";

export class AdminContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.AdminDataClient).to(AdminDataClient);
    this.bind(TYPES.AdminRepository).to(AdminRepository);
  }
}
