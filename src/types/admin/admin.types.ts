export type AnalyticType = {
  checkout: {area: string; sum: number}[];
  duration: {area: string; sum: number}[];
  money: {
    area: string;
    card: number;
    cash: number;
    sum: number;
  }[];
};
