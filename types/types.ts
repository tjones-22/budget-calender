export type BillType = "payday" | "bill" | "purchase";

export type Bill = {
  type: BillType;
  name: string;
};

export type Day = {
  dayNumber: number;
  bills: Bill[];
};
