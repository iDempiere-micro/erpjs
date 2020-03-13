import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerByIdGQL, CustomerByIdQuery, CustomerByIdQueryVariables, CustomerDetailPartsFragment } from '@erpjs/api-interfaces';
import { ItemDetailComponent } from '@erp/core/base/item.detail.component';
import { DataLoadingService } from '@erp/core/services/data.loading.service';
import { WindowService } from '@erp/core';

@Component({
  moduleId: module.id,
  selector: 'xpl-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent
  extends ItemDetailComponent<CustomerDetailPartsFragment, CustomerByIdQuery, CustomerByIdQueryVariables, CustomerByIdGQL>
  implements OnInit {

  address: string;

  extractData(result: CustomerByIdQuery): CustomerDetailPartsFragment {
    return result.customerById;
  }

  getQuery(): CustomerByIdGQL {
    return this.query;
  }

  constructor(
    route: ActivatedRoute,
    private query: CustomerByIdGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super(route, dataLoadingService, windowService)
  }

  async customOnInit() {
    this.address =
      `${this.data.legalAddress.line1}, ${this.data.legalAddress.zipCode} ${this.data.legalAddress.city}, ` +
      `${this.data.legalAddress.country.displayName}`;
  }
}
