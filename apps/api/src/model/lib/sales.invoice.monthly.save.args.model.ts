import { BaseSaveArgsModel } from './base.save.args.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { CustomerModel } from './customer.model';
import { CurrencyModel } from './currency.model';
import { OrganizationModel } from './organization.model';
import { Field } from '@nestjs/graphql';

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
