export type Customer = {
  id: number;
  name: string;
  surname?: string;
  patronymic?: string;
  telephone: string;
  birthday_date?: string;
  birthplace?: string;
  passport_issued_by?: string;
  passport_issue_date?: string;
  department_code?: string;
  passport_series?: string;
  passport_number?: string;
  gender?: "М" | "Ж";
};
