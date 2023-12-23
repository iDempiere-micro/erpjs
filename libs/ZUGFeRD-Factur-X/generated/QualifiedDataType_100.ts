/***********
generated template classes for ./FACTUR-X_MINIMUM_urn_un_unece_uncefact_data_standard_QualifiedDataType_100.xsd 5/15/2021, 14:41:45
***********/

export class FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_QualifiedDataType_100 {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props?: FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_QualifiedDataType_100,
  ) {
    this['@class'] =
      '.FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_QualifiedDataType_100';
  }
}

export class CountryIDType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(props?: CountryIDType) {
    this['@class'] = '.CountryIDType';
  }
}

export class CurrencyCodeType {
  value?: string;

  public constructor(value?: string) {
    this['@class'] = '.CurrencyCodeType';
    this.value = value;
  }
}

export class DocumentCodeType {
  value?: string;

  public constructor(value?: string) {
    this['@class'] = '.DocumentCodeType';
    this.value = value;
  }
}
