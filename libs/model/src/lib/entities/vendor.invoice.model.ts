import { BaseModel } from './base.model';
import { HasCurrency } from '../helpers/has.currency';
import { HasGrandTotal } from '../helpers/has.grand.total';
import { TransactionModel } from './transaction.model';
import { HasOrganization } from '../helpers/has.organization';
import { HasDueDate } from '../helpers/has.due.date';
import { HasBankAccount } from '../helpers/has.bank.account';
import { HasIssuedOn } from '../helpers/has.issued.on';
import { HasDocumentNo } from '../helpers/has.document.no';

export interface VendorInvoiceModel extends BaseModel,
  HasCurrency, HasGrandTotal, TransactionModel,
  HasOrganization, HasDueDate, HasBankAccount, HasIssuedOn, HasDocumentNo
{

}
