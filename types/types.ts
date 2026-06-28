import type { ReactNode } from "react";

export type BillType = "payday" | "bill" | "purchase";

export type Bill = {
  type: BillType;
  name: string;
};

export type Day = {
  dayNumber: number;
  bills: Bill[];
};

export type AuthFormState = {
  error?: string;
};

export type BankFormState = {
  error?: string;
  success?: string;
};

export type SignUpWithCredentialsInput = {
  email?: string;
  name?: string;
  username: string;
  password: string;
};

export type LoginWithCredentialsInput = {
  username: string;
  password: string;
};

export type UpdateBankStartingBalanceInput = {
  username: string;
  startingBalance: number;
};

export type UpdateBankStartingBalanceByUserIdInput = {
  userId: string;
  startingBalance: number;
};

export type SubmitButtonProps = {
  children: ReactNode;
  pendingText?: string;
  className?: string;
};
