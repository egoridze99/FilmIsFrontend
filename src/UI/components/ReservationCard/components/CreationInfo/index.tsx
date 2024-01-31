import React from "react";

import "./creationInfo.scss";
import {Certificate, UserStatus} from "src/types/shared.types";
import {Moment} from "moment";

const fieldsDictionary = {
  date: {
    title: "Дата",
    render: (item) =>
      item[item.date ? "date" : "start_date"]?.format("DD-MM-YYYY")
  },
  created_at: {
    title: "Дата создания записи",
    render: (item) => item.created_at.format("DD-MM-YYYY HH:mm")
  },
  id: {title: "Идентификатор записи"},
  author: {
    title: "Создатель записи",
    render: (item) => `${item.author.fullname}
        ${item.author.status === UserStatus.deprecated ? " (неактивен)" : ""}`
  },
  certificate: {
    title: "id сертификата",
    render: (item) => item.certificate?.ident,
    hide: (item) => !item.certificate
  }
} as Record<
  keyof CreationInfoProps["data"],
  {
    title: string;
    render?: (
      item: CreationInfoProps["data"]
    ) => React.ReactNode | React.ReactNode[];
    hide?: (item: CreationInfoProps["data"]) => boolean;
  }
>;

export type CreationInfoProps = {
  data: {
    date?: Moment;
    start_date?: Moment;
    created_at: Moment;
    id: number;
    author: {fullname: string; status?: UserStatus};
    certificate?: Certificate | null;
  };
};

export const CreationInfo: React.FC<CreationInfoProps> = ({data}) => {
  return (
    <ul className="CreationInfo">
      {Object.entries(fieldsDictionary).map(
        ([key, {title, render, hide}]) =>
          (!hide || !hide(data)) && (
            <li className="CreationInfo__list-item">
              {title}: {render ? render(data) : data[key]}
            </li>
          )
      )}
    </ul>
  );
};
