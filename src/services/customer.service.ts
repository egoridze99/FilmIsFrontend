import {inject, injectable} from "inversify";
import {axios} from "src/axios";
import {TYPES} from "src/app/app.types";
import {INotificationService} from "src/services/types/notification.interface";
import {CustomerComment} from "src/types/shared.types";
import moment from "moment";
import {DATETIME_FORMAT} from "src/constants/date";
import {ChangesResponseType} from "src/types/core.types";
import {historyKeysDictionary} from "src/services/constants/customer.service.constants";
import {CustomerRawType} from "src/types/customer/customer.types";
import {Customer} from "src/models/customers/customer.model";
import {action, makeObservable, observable} from "mobx";
import {mergeAll, pickAll} from "ramda";
import {AuthenticationService} from "./authentication.service";

@injectable()
export class CustomerService {
  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @inject(TYPES.AuthenticationService)
  private readonly authService: AuthenticationService;

  private abortController: AbortController | null = null;

  @observable private customersInApp: Record<number, Customer> = {};

  constructor() {
    makeObservable(this);
  }

  @action async getCustomersById(
    ids: number | number[],
    format: "array" | "dict" = "array"
  ): Promise<Customer[] | Customer | Record<number, Customer>> {
    const isIdsArray = Array.isArray(ids);
    const idsAsArray = isIdsArray ? ids : [ids];

    const unloadedIds = idsAsArray.filter((id) => !(id in this.customersInApp));

    if (unloadedIds.length) {
      const response = await axios.get<CustomerRawType[]>(
        `/customer/id?ids=${unloadedIds}`
      );

      const data = response.data;

      this.customersInApp = mergeAll([
        this.customersInApp,
        data.reduce((acc, customer) => {
          acc[customer.id] = new Customer(customer);
          return acc;
        }, {})
      ]);
    }

    if (!isIdsArray) {
      return this.customersInApp[ids];
    }

    return format === "array"
      ? ids.map((id) => this.customersInApp[id])
      : pickAll(ids, this.customersInApp);
  }

  @action clearCustomersInApp() {
    this.customersInApp = {};
  }

  async loadUser(telephone?: string) {
    if (this.abortController) {
      this.abortController.abort();
    }

    const abortController = (this.abortController = new AbortController());

    try {
      const response = await axios.get<CustomerRawType[]>("/customer", {
        params: {
          telephone
        },
        signal: abortController.signal
      });
      this.abortController = null;

      return response.data.map((c) => new Customer(c));
    } catch (e) {
      return null;
    }
  }

  async createUser(data: CustomerRawType): Promise<Customer | null> {
    try {
      const response = await axios.post<CustomerRawType>("/customer", data);

      return new Customer(response.data);
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

  async editUser(id: number, data: CustomerRawType): Promise<Customer | null> {
    try {
      const response = await axios.put<CustomerRawType>(
        `/customer/${id}`,
        data
      );

      const customer = response.data;
      if (customer.id in this.customersInApp) {
        this.customersInApp[customer.id].setValuesFromRawType(customer);
      } else {
        this.customersInApp[customer.id] = new Customer(customer);
      }

      return this.customersInApp[customer.id];
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

  async getUserComments(customerId: number): Promise<CustomerComment[]> {
    try {
      const response = await axios.get<CustomerComment[]>(
        `/customer/comments/${customerId}`
      );

      return response.data.map((c) => ({
        ...c,
        created_at: moment(c.created_at)
      }));
    } catch (e) {
      console.log(e);

      this.notificationService.addNotification({
        title: "Ошибка",
        message: e?.response?.data?.msg || "Ошибка при загрузке комментариев",
        kind: "error"
      });

      return [];
    }
  }

  async createUserComment(
    comment: string,
    customerId: number
  ): Promise<CustomerComment | null> {
    try {
      const response = await axios.put<CustomerComment>(`/customer/comments`, {
        comment,
        customer_id: customerId
      });

      return {
        ...response.data,
        created_at: moment(response.data.created_at)
      };
    } catch (e) {
      console.log(e);

      this.notificationService.addNotification({
        title: "Ошибка",
        message: e?.response?.data?.msg || "Ошибка при добавлении комментария",
        kind: "error"
      });

      return null;
    }
  }

  async loadChangesHistory(customerId: number) {
    const rawChanges = await axios.get<ChangesResponseType<any>[]>(
      `/customer/logs`,
      {
        params: {
          customer_id: customerId
        }
      }
    );

    return rawChanges.data.map((item) => {
      const copy = {...item} as any;

      return {
        author: item.author,
        created_at: moment(item.created_at, DATETIME_FORMAT),
        id: item.id,
        data: Object.keys(item.new).reduce((acc, key) => {
          let wasChanged = copy.new[key] !== copy.old[key];

          if (wasChanged) {
            acc[historyKeysDictionary[key]] = {
              new: copy.new[key],
              old: copy.old[key]
            };
          }

          return acc;
        }, {})
      };
    });
  }
}
