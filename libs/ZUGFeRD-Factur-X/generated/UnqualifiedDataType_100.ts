/***********
generated template classes for ./FACTUR-X_MINIMUM_urn_un_unece_uncefact_data_standard_UnqualifiedDataType_100.xsd 5/15/2021, 14:41:45
***********/

export class FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_UnqualifiedDataType_100 {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props?: FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_UnqualifiedDataType_100,
  ) {
    this['@class'] =
      '.FACTUR_X_MINIMUM_urn_un_unece_uncefact_data_standard_UnqualifiedDataType_100';
  }
}

export class AmountType {
  value: number;

  public constructor(value?: number) {
    this['@class'] = '.AmountType';
    this.value = value;
  }
}

export class CodeType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(props?: CodeType) {
    this['@class'] = '.CodeType';
  }
}

export class DateTimeType {
  value: Date;

  public constructor(value?: Date) {
    this['@class'] = '.DateTimeType';
    this.value = value;
  }
}

export class IDType {
  value: string;

  public constructor(value?: string) {
    this['@class'] = '.IDType';
    this.value = value;
  }
}

export class TextType {
  value: string;

  public constructor(value?: string) {
    this['@class'] = '.TextType';
    this.value = value;
  }
}
