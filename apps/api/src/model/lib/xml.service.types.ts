import { XMLAttribute, XMLChild, XMLElement } from 'xml-serializer-ts';
import { CrossIndustryInvoiceType } from '../../../../../libs/ZUGFeRD-Factur-X/generated';
import {
  ExchangedDocumentContextType,
  ExchangedDocumentType,
  SupplyChainTradeTransactionType,
  TradePartyType,
} from '../../../../../libs/ZUGFeRD-Factur-X/generated/ReusableAggregateBusinessInformationEntity_100';
import * as moment from 'moment';
import { XMLText } from 'xml-serializer-ts/lib/annotations/XMLText';

const XMLNS = 'xmlns';
const RSMNS = 'rsm';
const RAMNS = 'ram';
const UDTNS = 'udt';

class DateTimeString {
  @XMLAttribute({})
  get format(): string {
    return '102';
  }

  @XMLText({})
  get ids(): string {
    return this.value;
  }

  constructor(protected readonly value: string) {}
}

class IssueDateTime {
  constructor(protected readonly e: ExchangedDocumentType) {}

  @XMLChild({
    namespace: UDTNS,
    name: 'DateTimeString',
  })
  get ids(): DateTimeString[] {
    return [
      new DateTimeString(moment(this.e.IssueDateTime.value).format('YYYYMMDD')),
    ];
  }
}

class GuidelineSpecifiedDocumentContextParameter {
  @XMLChild({
    namespace: RAMNS,
    name: 'ID',
  })
  get ids(): string[] {
    return ['rn:factur-x.eu:1p0:minimum'];
  }
}

class TradeParty {
  constructor(protected readonly a: TradePartyType) {}

  @XMLChild({
    namespace: RAMNS,
    name: 'Name',
  })
  get Name(): string[] {
    return [this.a.Name.value];
  }
}

class ApplicableHeaderTradeAgreement {
  @XMLChild({
    namespace: RAMNS,
    name: 'SellerTradeParty',
  })
  get SellerTradeParty(): TradeParty[] {
    return [
      new TradeParty(this.e.ApplicableHeaderTradeAgreement.SellerTradeParty),
    ];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'BuyerTradeParty',
  })
  get BuyerTradeParty(): TradeParty[] {
    return [
      new TradeParty(this.e.ApplicableHeaderTradeAgreement.BuyerTradeParty),
    ];
  }

  constructor(protected readonly e: SupplyChainTradeTransactionType) {}
}

class ApplicableHeaderTradeDelivery {
  /*constructor(protected readonly e: SupplyChainTradeTransactionType) {
    this['@class'] = '.HeaderTradeDeliveryType';
  }*/
}

class SpecifiedTradeSettlementHeaderMonetarySummation {
  @XMLChild({
    namespace: RAMNS,
    name: 'TaxBasisTotalAmount',
  })
  get TaxBasisTotalAmount(): number[] {
    return [
      this.e.ApplicableHeaderTradeSettlement
        .SpecifiedTradeSettlementHeaderMonetarySummation.TaxBasisTotalAmount
        .value,
    ];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'TaxTotalAmount',
  })
  get TaxTotalAmount(): number[] {
    return [
      this.e.ApplicableHeaderTradeSettlement
        .SpecifiedTradeSettlementHeaderMonetarySummation.TaxTotalAmount.value,
    ];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'GrandTotalAmount',
  })
  get GrandTotalAmount(): number[] {
    return [
      this.e.ApplicableHeaderTradeSettlement
        .SpecifiedTradeSettlementHeaderMonetarySummation.GrandTotalAmount.value,
    ];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'DuePayableAmount',
  })
  get DuePayableAmount(): number[] {
    return [
      this.e.ApplicableHeaderTradeSettlement
        .SpecifiedTradeSettlementHeaderMonetarySummation.DuePayableAmount.value,
    ];
  }

  constructor(protected readonly e: SupplyChainTradeTransactionType) {}
}

class ApplicableHeaderTradeSettlement {
  @XMLChild({
    namespace: RAMNS,
    name: 'InvoiceCurrencyCode',
  })
  get InvoiceCurrencyCode(): string[] {
    return [this.e.ApplicableHeaderTradeSettlement.InvoiceCurrencyCode.value];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'SpecifiedTradeSettlementHeaderMonetarySummation',
  })
  get SpecifiedTradeSettlementHeaderMonetarySummation(): SpecifiedTradeSettlementHeaderMonetarySummation[] {
    return [new SpecifiedTradeSettlementHeaderMonetarySummation(this.e)];
  }

  constructor(protected readonly e: SupplyChainTradeTransactionType) {}
}

class SupplyChainTradeTransaction {
  constructor(protected readonly e: SupplyChainTradeTransactionType) {}

  @XMLChild({
    namespace: RAMNS,
    name: 'ApplicableHeaderTradeAgreement',
  })
  get ApplicableHeaderTradeAgreement(): ApplicableHeaderTradeAgreement[] {
    return [new ApplicableHeaderTradeAgreement(this.e)];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'ApplicableHeaderTradeDelivery',
  })
  get ApplicableHeaderTradeDelivery(): ApplicableHeaderTradeDelivery[] {
    return [new ApplicableHeaderTradeDelivery()];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'ApplicableHeaderTradeSettlement',
  })
  get ApplicableHeaderTradeSettlement(): ApplicableHeaderTradeSettlement[] {
    return [new ApplicableHeaderTradeSettlement(this.e)];
  }
}

class ExchangedDocument {
  constructor(protected readonly e: ExchangedDocumentType) {}

  @XMLChild({
    namespace: RAMNS,
    name: 'ID',
  })
  get ids(): string[] {
    return [this.e.ID.value];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'TypeCode',
  })
  get TypeCode(): string[] {
    return [this.e.TypeCode.value];
  }

  @XMLChild({
    namespace: RAMNS,
    name: 'IssueDateTime',
  })
  get IssueDateTime(): IssueDateTime[] {
    return [new IssueDateTime(this.e)];
  }
}

class ExchangedDocumentContext {
  constructor(protected readonly e: ExchangedDocumentContextType) {}

  @XMLChild({
    namespace: RAMNS,
    name: 'GuidelineSpecifiedDocumentContextParameter',
  })
  get GuidelineSpecifiedDocumentContextParameter(): GuidelineSpecifiedDocumentContextParameter[] {
    return [new GuidelineSpecifiedDocumentContextParameter()];
  }
}

/**
 *
 *
 * <rsm:CrossIndustryDocument
 * xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:12"
 * xmlns:rsm="urn:ferd:CrossIndustryDocument:invoice:1p0"
 * xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:15">
 *
 */
@XMLElement({ root: 'rsm:CrossIndustryInvoice' })
export class CrossIndustryInvoiceTypeRoot {
  @XMLAttribute({ namespace: XMLNS })
  get ram(): string {
    return 'urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100';
  }

  @XMLAttribute({ namespace: XMLNS })
  get rsm(): string {
    return 'urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100';
  }

  @XMLAttribute({ namespace: XMLNS })
  get udt(): string {
    return 'urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100';
  }

  @XMLChild({
    namespace: RSMNS,
    name: 'ExchangedDocumentContext',
  })
  get ExchangedDocumentContext(): ExchangedDocumentContext[] {
    return [new ExchangedDocumentContext(this.p.ExchangedDocumentContext)];
  }

  @XMLChild({
    namespace: RSMNS,
    name: 'ExchangedDocument',
  })
  get ExchangedDocument(): ExchangedDocument[] {
    return [new ExchangedDocument(this.p.ExchangedDocument)];
  }

  @XMLChild({
    namespace: RSMNS,
    name: 'SupplyChainTradeTransaction',
  })
  get SupplyChainTradeTransaction(): SupplyChainTradeTransaction[] {
    return [
      new SupplyChainTradeTransaction(this.p.SupplyChainTradeTransaction),
    ];
  }

  constructor(protected readonly p: CrossIndustryInvoiceType) {}
}
