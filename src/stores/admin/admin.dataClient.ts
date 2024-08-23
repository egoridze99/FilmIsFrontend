import {injectable} from "inversify";
import {axios} from "src/axios";
import {AnalyticType, UserCreationBodyType} from "src/types/admin/admin.types";
import {UserInfo} from "src/types/shared.types";

@injectable()
export class AdminDataClient {
  async getTelephones(data: {
    city: number;
    min_visits: number;
    last_visit_threshold: string;
    ignore_before_date: string;
  }) {
    const response = await axios.get<{data: string[]}>("/admin/telephones", {
      params: data
    });

    return response.data.data;
  }

  async getAnalyticData(
    dateFrom: string,
    dateTo: string
  ): Promise<AnalyticType> {
    const response = await axios.get<AnalyticType>("/admin/common", {
      params: {until: dateFrom, till: dateTo}
    });

    return response.data;
  }

  async getUsers() {
    const response = await axios.get<UserInfo[]>("/user");

    return response.data;
  }

  removeUser(id: number) {
    return axios.delete(`/user/${id}`);
  }

  createNewUser(data: UserCreationBodyType) {
    return axios.post(`/user`, data);
  }
}
