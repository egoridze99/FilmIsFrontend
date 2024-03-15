import {injectable} from "inversify";
import {axios} from "src/axios";
import {Customer} from "src/types/shared.types";

@injectable()
export class CustomerService {
  private abortController: AbortController | null = null;

  async loadUser(telephone?: string) {
    if (this.abortController) {
      this.abortController.abort();
    }

    const abortController = (this.abortController = new AbortController());

    try {
      const response = await axios.get<Customer[]>("/customer", {
        params: {
          telephone
        },
        signal: abortController.signal
      });
      this.abortController = null;

      return response.data;
    } catch (e) {
      return null;
    }
  }
}
