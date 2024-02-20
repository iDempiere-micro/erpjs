/***********
generated template classes for ./FACTUR-X_MINIMUM_urn_un_unece_uncefact_data_standard_ReusableAggregateBusinessInformationEntity_100.xsd 5/15/2021, 14:41:45
***********/
import {
  CountryIDType,
  CurrencyCodeType,
  DocumentCodeType,
} from './QualifiedDataType_100';
import {
  AmountType,
  CodeType,
  DateTimeType,
  IDType,
  TextType,
} from './UnqualifiedDataType_100';

export class FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_ReusableAggregateBusinessInformationEntity_100 {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props?: FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_ReusableAggregateBusinessInformationEntity_100,
  ) {
    this['@class'] =
      '.FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_ReusableAggregateBusinessInformationEntity_100';
  }
}

export class GuidelineSpecifiedDocumentContextParameterType {
  public ID?: IDType;

  public constructor(props?: GuidelineSpecifiedDocumentContextParameterType) {
    this['@class'] = '.DocumentContextParameterType';

    if (props) {
      this.ID = props.ID;
    }
  }
}

export class DocumentContextParameterType {
  public ID?: IDType;

  public constructor(props?: DocumentContextParameterType) {
    this['@class'] = '.DocumentContextParameterType';

    if (props) {
      this.ID = props.ID;
    }
  }
}

export class ExchangedDocumentContextType {
  public BusinessProcessSpecifiedDocumentContextParameter?: DocumentContextParameterType;
  public GuidelineSpecifiedDocumentContextParameter: GuidelineSpecifiedDocumentContextParameterType;

  public constructor(props?: ExchangedDocumentContextType) {
    this['@class'] = '.ExchangedDocumentContextType';

    if (props) {
      this.BusinessProcessSpecifiedDocumentContextParameter =
        props.BusinessProcessSpecifiedDocumentContextParameter
          ? new DocumentContextParameterType(
              props.BusinessProcessSpecifiedDocumentContextParameter,
            )
          : undefined;
      this.GuidelineSpecifiedDocumentContextParameter =
        props.GuidelineSpecifiedDocumentContextParameter
          ? new DocumentContextParameterType(
              props.GuidelineSpecifiedDocumentContextParameter,
            )
          : undefined;
    }
  }
}

export class ExchangedDocumentType {
  public ID: IDType;
  public TypeCode: DocumentCodeType;
  public IssueDateTime: DateTimeType;

  public constructor(props?: ExchangedDocumentType) {
    this['@class'] = '.ExchangedDocumentType';

    if (props) {
      this.ID = props.ID;
      this.TypeCode = props.TypeCode;
      this.IssueDateTime = props.IssueDateTime;
    }
  }
}

export class HeaderTradeAgreementType {
  public BuyerReference?: TextType;
  public SellerTradeParty: TradePartyType;
  public BuyerTradeParty: TradePartyType;
  public BuyerOrderReferencedDocument?: ReferencedDocumentType;

  public constructor(props?: HeaderTradeAgreementType) {
    this['@class'] = '.HeaderTradeAgreementType';

    if (props) {
      this.BuyerReference = props.BuyerReference;
      this.SellerTradeParty = props.SellerTradeParty
        ? new TradePartyType(props.SellerTradeParty)
        : undefined;
      this.BuyerTradeParty = props.BuyerTradeParty
        ? new TradePartyType(props.BuyerTradeParty)
        : undefined;
      this.BuyerOrderReferencedDocument = props.BuyerOrderReferencedDocument
        ? new ReferencedDocumentType(props.BuyerOrderReferencedDocument)
        : undefined;
    }
  }
}

export class HeaderTradeDeliveryType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(props?: HeaderTradeDeliveryType) {
    this['@class'] = '.HeaderTradeDeliveryType';
  }
}

export class HeaderTradeSettlementType {
  public InvoiceCurrencyCode: CurrencyCodeType;
  public SpecifiedTradeSettlementHeaderMonetarySummation: TradeSettlementHeaderMonetarySummationType;

  public constructor(props?: HeaderTradeSettlementType) {
    this['@class'] = '.HeaderTradeSettlementType';

    if (props) {
      this.InvoiceCurrencyCode = props.InvoiceCurrencyCode;
      this.SpecifiedTradeSettlementHeaderMonetarySummation =
        props.SpecifiedTradeSettlementHeaderMonetarySummation
          ? new TradeSettlementHeaderMonetarySummationType(
              props.SpecifiedTradeSettlementHeaderMonetarySummation,
            )
          : undefined;
    }
  }
}

export class LegalOrganizationType {
  public ID?: IDType;

  public constructor(props?: LegalOrganizationType) {
    this['@class'] = '.LegalOrganizationType';

    if (props) {
      this.ID = props.ID;
    }
  }
}

export class ReferencedDocumentType {
  public IssuerAssignedID: IDType;

  public constructor(props?: ReferencedDocumentType) {
    this['@class'] = '.ReferencedDocumentType';

    if (props) {
      this.IssuerAssignedID = props.IssuerAssignedID;
    }
  }
}

export class SupplyChainTradeTransactionType {
  public ApplicableHeaderTradeAgreement: HeaderTradeAgreementType;
  public ApplicableHeaderTradeDelivery: HeaderTradeDeliveryType;
  public ApplicableHeaderTradeSettlement: HeaderTradeSettlementType;

  public constructor(props?: SupplyChainTradeTransactionType) {
    this['@class'] = '.SupplyChainTradeTransactionType';

    if (props) {
      this.ApplicableHeaderTradeAgreement = props.ApplicableHeaderTradeAgreement
        ? new HeaderTradeAgreementType(props.ApplicableHeaderTradeAgreement)
        : undefined;
      this.ApplicableHeaderTradeDelivery = props.ApplicableHeaderTradeDelivery
        ? new HeaderTradeDeliveryType(props.ApplicableHeaderTradeDelivery)
        : undefined;
      this.ApplicableHeaderTradeSettlement =
        props.ApplicableHeaderTradeSettlement
          ? new HeaderTradeSettlementType(props.ApplicableHeaderTradeSettlement)
          : undefined;
    }
  }
}

export class TaxRegistrationType {
  public ID: IDType;

  public constructor(props?: TaxRegistrationType) {
    this['@class'] = '.TaxRegistrationType';

    if (props) {
      this.ID = props.ID;
    }
  }
}

export class TradeAddressType {
  public PostcodeCode?: CodeType;
  public LineOne?: TextType;
  public LineTwo?: TextType;
  public LineThree?: TextType;
  public CityName?: TextType;
  public CountryID: CountryIDType;
  public CountrySubDivisionName?: TextType;

  public constructor(props?: TradeAddressType) {
    this['@class'] = '.TradeAddressType';

    if (props) {
      this.PostcodeCode = props.PostcodeCode;
      this.LineOne = props.LineOne;
      this.LineTwo = props.LineTwo;
      this.LineThree = props.LineThree;
      this.CityName = props.CityName;
      this.CountryID = props.CountryID;
      this.CountrySubDivisionName = props.CountrySubDivisionName;
    }
  }
}

export class TradePartyType {
  public Name: TextType;
  public SpecifiedLegalOrganization?: LegalOrganizationType;
  public PostalTradeAddress?: TradeAddressType;
  public SpecifiedTaxRegistration?: TaxRegistrationType[];

  public constructor(props?: TradePartyType) {
    this['@class'] = '.TradePartyType';

    if (props) {
      this.Name = props.Name;
      this.SpecifiedLegalOrganization = props.SpecifiedLegalOrganization
        ? new LegalOrganizationType(props.SpecifiedLegalOrganization)
        : undefined;
      this.PostalTradeAddress = props.PostalTradeAddress
        ? new TradeAddressType(props.PostalTradeAddress)
        : undefined;
      this.SpecifiedTaxRegistration = props.SpecifiedTaxRegistration?.map(
        (o) => new TaxRegistrationType(o),
      );
    }
  }
}

export class TradeSettlementHeaderMonetarySummationType {
  public TaxBasisTotalAmount: AmountType;
  public TaxTotalAmount?: AmountType;
  public GrandTotalAmount: AmountType;
  public DuePayableAmount: AmountType;

  public constructor(props?: TradeSettlementHeaderMonetarySummationType) {
    this['@class'] = '.TradeSettlementHeaderMonetarySummationType';

    if (props) {
      this.TaxBasisTotalAmount = props.TaxBasisTotalAmount;
      this.TaxTotalAmount = props.TaxTotalAmount;
      this.GrandTotalAmount = props.GrandTotalAmount;
      this.DuePayableAmount = props.DuePayableAmount;
    }
  }
}
