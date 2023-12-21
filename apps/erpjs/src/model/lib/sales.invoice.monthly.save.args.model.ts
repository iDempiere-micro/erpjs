export interface IdAndValue<T> {
  id: number;
  value: T;
}

export interface SalesInvoiceMonthlySaveArgsModel {
  totalHours: number;
  dailyRate: number;
  organizationDivider: IdAndValue<number>[];
  narration: string;
  year: number;
  month: number;
  day: number;
  eurToCzkRate: number;
}
