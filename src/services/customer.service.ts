import {inject, injectable} from "inversify";
import {axios} from "src/axios";
import {Customer} from "src/types/customer.types";
import {TYPES} from "src/app/app.types";
import {INotificationService} from "src/services/types/notification.interface";

@injectable()
export class CustomerService {
  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

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

  async createUser(data: Customer): Promise<Customer | null> {
    try {
      const response = await axios.post<Customer>("/customer", data);

      return response.data;
    } catch (e) {
      console.log(e);

      this.notificationService.addNotification({
        title: "Ошибка",
        message: e?.response?.data?.msg || "Ошибка при создании пользователя",
        kind: "error"
      });

      return null;
    }
  }
}