export interface Account {
  id: number;
  name: string;
  balance: number;
  transactions: {
    type: string;
    amount: number;
    date: Date;
    from?: number;
    to?: number;
  }[];
}