import moment from "moment/moment";
import {action, computed, makeObservable, observable} from "mobx";
import {CustomerRawType} from "src/types/customer/customer.types";
import {omit} from "ramda";
import {
  CastOptionalToRequired,
  NullableFields
} from "../../types/utility.types";
import {DATE_FORMAT} from "../../constants/date";

type CustomerDataType = NullableFields<CastOptionalToRequired<CustomerRawType>>;

export class Customer {
  @observable private data: CustomerDataType;

  readonly _isAbleToReadAndEdit: boolean = false;

  constructor(data: CustomerRawType, isAbleToRead: boolean) {
    makeObservable(this);

    this.setValuesFromRawType(data);
    this._isAbleToReadAndEdit = isAbleToRead;
  }

  @action setValuesFromRawType(data: CustomerRawType) {
    this.data = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value ?? null;
        return acc;
      },
      {} as typeof this.data
    );

    this.data.birthday_date = data.birthday_date
      ? moment(data.birthday_date)
      : null;

    this.data.passport_issue_date = data.passport_issue_date
      ? moment(data.passport_issue_date)
      : null;
  }

  @computed get id() {
    return this.data.id;
  }

  @computed get name() {
    return this.data.name as string;
  }

  @computed get telephone() {
    return this.data.telephone as string;
  }

  @computed get has_comments() {
    return this.data.has_comments;
  }

  @computed get birthday_date() {
    if (!this.data.birthplace) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.birthday_date
      : "*".repeat(DATE_FORMAT.length);
  }

  @computed get birthplace() {
    if (!this.data.birthplace) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.birthplace
      : "*".repeat(this.data.birthplace?.length || 4);
  }

  @computed get passport_issued_by() {
    if (!this.data.passport_issued_by) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.passport_issued_by
      : "*".repeat(15);
  }

  @computed get passport_issue_date() {
    if (!this.data.passport_issue_date) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.passport_issue_date
      : "*".repeat(DATE_FORMAT.length);
  }

  @computed get department_code() {
    if (!this.data.department_code) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.department_code
      : "*".repeat(this.data.department_code.length);
  }

  @computed get passport_identity() {
    if (!this.data.passport_identity) {
      return null;
    }

    return this._isAbleToReadAndEdit
      ? this.data.passport_identity
      : "*".repeat(this.data.passport_identity.length);
  }

  @computed get gender() {
    return this.data.gender;
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
      acc[field] = this.data[field];
      return acc;
    }, {} as CustomerRawType);
  }

  @computed get fullname() {
    if (!this._isAbleToReadAndEdit) {
      return this.name;
    }

    const fieldsDescriptionDict = {
      surname: "фамилия",
      patronymic: "отчество"
    };

    const emptyValues = ["surname", "patronymic"].filter((i) => !this?.data[i]);

    const fullName = [
      this?.data?.surname || "",
      this?.data?.name,
      this?.data?.patronymic || ""
    ]
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
    return moment().diff(this.data.birthday_date, "years") < 18;
  }

  @action
  setFieldValue<T extends CustomerDataType, K extends keyof CustomerDataType>(
    key: K,
    value: T[K]
  ) {
    this.data[key] = value;
  }
}
