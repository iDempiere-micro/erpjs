import { DocumentNumberingServiceModel, SalesInvoiceModel } from '../..';

export class SalesInvoiceJob {
  async assignDocumentNumbers(
    notDraftInvoicesWithoutDocumentNumber: Array<SalesInvoiceModel>,
    documentNumberingServiceModel: DocumentNumberingServiceModel,) {
    for( const invoice of notDraftInvoicesWithoutDocumentNumber ) {
      if (invoice.documentNo || invoice.isDraft) {
        throw new Error('Call with non draft invoices without document number only!');
      }
      invoice.documentNo = await documentNumberingServiceModel.getNextDocumentNumber(invoice.constructor, await invoice.organization);
    }
  }
}
