/***********
generated template classes for ./FACTUR-X_MINIMUM.xsd 5/15/2021, 14:41:45
***********/
import {
  ExchangedDocumentContextType,
  ExchangedDocumentType,
  SupplyChainTradeTransactionType,
} from './ReusableAggregateBusinessInformationEntity_100';

export class FACTUR_X_MINIMUM {
  public crossIndustryInvoice: CrossIndustryInvoice;

  public constructor(props?: FACTUR_X_MINIMUM) {
    this['@class'] = '.FACTUR_X_MINIMUM';
    if (props) {
      this.crossIndustryInvoice = props.crossIndustryInvoice;
    }
  }
}

export class CrossIndustryInvoiceType {
  //
  public ExchangedDocumentContext: ExchangedDocumentContextType;
  public ExchangedDocument: ExchangedDocumentType;
  public SupplyChainTradeTransaction: SupplyChainTradeTransactionType;

  public constructor(props?: CrossIndustryInvoiceType) {
    this['@class'] = '.CrossIndustryInvoiceType';

    if (props) {
      this.ExchangedDocumentContext = props.ExchangedDocumentContext;
      this.ExchangedDocument = props.ExchangedDocument;
      this.SupplyChainTradeTransaction = props.SupplyChainTradeTransaction;
    }
  }
}

export type CrossIndustryInvoice = CrossIndustryInvoiceType;
