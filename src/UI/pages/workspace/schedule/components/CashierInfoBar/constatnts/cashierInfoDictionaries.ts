import {CashierInfo} from "src/types/schedule/schedule.types";

export const cashierInfoTitleDictionary: Record<
  keyof Omit<CashierInfo, "cinema" | "date" | "id">,
  {title: string; weight: number}
> = {
  income: {title: "Доход", weight: 0},
  proceeds: {title: "Прибыль", weight: 2},
  expense: {title: "Затраты", weight: 1},
  all_by_card: {title: "По карте", weight: 3},
  all_by_cash: {title: "Наличными", weight: 4},
  cashier_start: {title: "В кассе на начало", weight: 5},
  cashier_end: {title: "В кассе на конец", weight: 6}
};
