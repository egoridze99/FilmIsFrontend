import {injectable} from "inversify";
import {axios} from "src/axios";
import {AnalyticType, UserCreationBodyType} from "src/types/admin/admin.types";
import {UserInfo} from "src/types/shared.types";
import {Roles} from "src/types/core.types";

@injectable()
export class AdminDataClient {
  async getTelephones() {
    const response = await axios.get<{data: string[]}>("/admin/telephones");

    return response.data.data;
  }

  async getAnalyticData(
    dateFrom: string,
    dateTo: string,
    area: "cinema" | "room"
  ): Promise<AnalyticType> {
    const response = await axios.get<AnalyticType>("/admin/common", {
      params: {untill: dateFrom, till: dateTo, area}
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
