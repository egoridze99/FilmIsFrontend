import moment, {Moment} from "moment/moment";
import {action, computed, makeObservable, observable} from "mobx";
import {CustomerRawType} from "src/types/customer/customer.types";
import {omit} from "ramda";

export class Customer {
  readonly id: number;

  @observable name: string;
  @observable telephone: string;

  @observable has_comments: boolean | null;
  @observable surname: string | null;
  @observable patronymic: string | null;
  @observable birthday_date: Moment | null;
  @observable birthplace: string | null;
  @observable passport_issued_by: string | null;
  @observable passport_issue_date: Moment | null;
  @observable department_code: string | null;
  @observable passport_identity: string | null;
  @observable gender: "М" | "Ж" | null;

  constructor(data: CustomerRawType) {
    makeObservable(this);

    this.id = data.id;
    this.setValuesFromRawType(data);
  }

  @action setValuesFromRawType(data: CustomerRawType) {
    const dataWithoutId = omit(["id"], data);

    for (let key in dataWithoutId) {
      this[key] = data[key] || null;
    }

    this.birthday_date = dataWithoutId.birthday_date
      ? moment(dataWithoutId.birthday_date)
      : null;
    this.passport_issue_date = dataWithoutId.passport_issue_date
      ? moment(dataWithoutId.passport_issue_date)
      : null;
  }

  @computed get fieldsAsDict(): CustomerRawType {
    const fields = [
      "id",
      "name",
      "telephone",
      "has_comments",
      "surname",
      "patronymic",
      "birthday_date",
      "birthplace",
      "passport_issued_by",
      "passport_issue_date",
      "department_code",
      "passport_identity",
      "gender"
    ];

    return fields.reduce((acc, field) => {
      acc[field] = this[field];
      return acc;
    }, {} as CustomerRawType);
  }

  @computed get fullname() {
    const fieldsDescriptionDict = {
      surname: "фамилия",
      patronymic: "отчество"
    };

    const emptyValues = ["surname", "patronymic"].filter((i) => !this?.[i]);

    const fullName = [this?.surname || "", this?.name, this?.patronymic || ""]
      .join(" ")
      .trim();

    return `${fullName}${
      emptyValues.length
        ? ` (${emptyValues
            .map((filed) => fieldsDescriptionDict[filed])
            .join(", ")} не заполнены)`
        : ""
    }`;
  }

  @computed get isCustomerHasBlankFields() {
    return Object.values(
      omit(
        ["name", "telephone", "id", "has_comments"] as Array<
          keyof CustomerRawType
        >,
        this.fieldsAsDict
      )
    ).some((i) => !i);
  }

  @computed get isCustomerTooYoung() {
    return moment().diff(this.birthday_date, "years") < 18;
  }

  @action setFieldValue(key: keyof this, value: (typeof this)[keyof this]) {
    this[key] = value;
  }
}
