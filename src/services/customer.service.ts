import {inject, injectable} from "inversify";
import {axios} from "src/axios";
import {Customer} from "src/types/customer.types";
import {TYPES} from "src/app/app.types";
import {INotificationService} from "src/services/types/notification.interface";
import {applyCustomerAdapter} from "src/utils/customer/applyCustomerAdapter";

@injectable()
export class CustomerService {
  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  private subscribers = [] as ((customer: Customer) => void)[];

  private abortController: AbortController | null = null;

  onCustomerUpdate = (cb: (customer: Customer) => void) => {
    this.subscribers.push(cb);
  };

  unsubscribe = (cb: (customer: Customer) => void): void => {
    this.subscribers = this.subscribers.filter((c) => c !== cb);
  };

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

      return response.data.map((c) => applyCustomerAdapter(c));
    } catch (e) {
      return null;
    }
  }

  async createUser(data: Customer): Promise<Customer | null> {
    try {
      const response = await axios.post<Customer>("/customer", data);

      return applyCustomerAdapter(response.data);
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

  async editUser(id: number, data: Customer): Promise<Customer | null> {
    try {
      const response = await axios.put<Customer>(`/customer/${id}`, data);

      const customer = applyCustomerAdapter(response.data);
      this.subscribers.forEach((cb) => cb(customer));

      return customer;
    } catch (e) {
      console.log(e);

      this.notificationService.addNotification({
        title: "Ошибка",
        message:
          e?.response?.data?.msg || "Ошибка при редактировании пользователя",
        kind: "error"
      });

      return null;
    }
  }
}
