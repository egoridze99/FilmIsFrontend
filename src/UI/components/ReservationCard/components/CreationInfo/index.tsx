import React from "react";

import "./creationInfo.scss";
import {Certificate, UserStatus} from "src/types/shared.types";

const fieldsDictionary = {
  date: "Дата",
  created_at: "Дата создания записи",
  id: "Идентификатор записи"
};

export type CreationInfoProps = {
  data: {
    date: string;
    created_at: string;
    id: number;
    author: {fullname: string; status?: UserStatus};
    certificate?: Certificate | null;
  };
};

export const CreationInfo: React.FC<CreationInfoProps> = ({data}) => {
  return (
    <ul className="CreationInfo">
      {Object.entries(fieldsDictionary).map(([key, title]) => (
        <li className="CreationInfo__list-item">
          {title}: {data[key]}
        </li>
      ))}
      <li className="CreationInfo__list-item">
        Создатель записи: {data.author.fullname}
        {data.author.status === UserStatus.deprecated ? " (неактивен)" : null}
      </li>
      {data.certificate && (
        <li className="CreationInfo__list-item">
          id сертификата: {data.certificate.ident}
        </li>
      )}
    </ul>
  );
};
