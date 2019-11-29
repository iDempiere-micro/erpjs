import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ProductListPartsFragment,
  ProductsGQL,
  SalesInvoiceLineGQL,
  SalesInvoiceLineListPartsFragment,
  SalesInvoiceLineSaveArgs,
  SalesInvoiceListPartsFragment,
  TaxesGQL,
  TaxListPartsFragment
} from '@erpjs/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erp-edit-invoice-line',
  template: `
      <form clrForm [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()" *ngIf="editForm">
          <clr-input-container>
              <label>Line order</label>
              <input clrInput type="text" formControlName="lineOrder"/>
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Line price</label>
              <input clrInput type="text" formControlName="linePrice"/>
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Narration</label>
              <input clrInput type="text" formControlName="narration"/>
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Quantity</label>
              <input clrInput type="text" formControlName="quantity"/>
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name.</clr-control-error>
          </clr-input-container>
          <clr-select-container>
              <label>Line Tax</label>
              <select clrSelect name="responsible" formControlName="lineTaxId" *ngIf="taxes && editForm"
                      (change)="taxChanged()">
                  <option *ngFor="let tax of taxes" [value]="tax.id">{{tax.displayName}}</option>
              </select>
          </clr-select-container>

          <clr-datagrid [(clrDgSingleSelected)]="product" *ngIf="products"
                        (clrDgSingleSelectedChange)="productSelectionChanged($event)">
              <clr-dg-column>ID
              </clr-dg-column>
              <clr-dg-column>Display Name
              </clr-dg-column>
              <clr-dg-column>SKU
              </clr-dg-column>

              <clr-dg-row *clrDgItems="let product of products" [clrDgItem]="product">
                  <clr-dg-cell><a [routerLink]="['/product',product.id]">{{product.id}}</a></clr-dg-cell>
                  <clr-dg-cell><a [routerLink]="['/product',product.id]">{{product.displayName}}</a></clr-dg-cell>
                  <clr-dg-cell><a [routerLink]="['/product',product.id]">{{product.sku}}</a></clr-dg-cell>
              </clr-dg-row>
          </clr-datagrid>

          <button *ngIf="this.invoice" type="submit" class="btn btn-primary">Save</button>
          <button class="btn btn-primary" (click)="okClick()">OK</button>
      </form>
  `,
  styles: []
})
export class EditSalesInvoiceLineComponent implements OnInit {
  @Input() invoiceLine: SalesInvoiceLineListPartsFragment;
  @Input() invoice: SalesInvoiceListPartsFragment;
  @Output()  selectedInvoiceLineChanged = new EventEmitter<SalesInvoiceLineListPartsFragment>();
  taxes: Array<TaxListPartsFragment>;
  lineTax: TaxListPartsFragment;
  editForm: FormGroup;
  submitted = false;
  product: ProductListPartsFragment;
  products: Array<ProductListPartsFragment>;

  constructor(
    private formBuilder: FormBuilder,
    private salesInvoiceLineGQL: SalesInvoiceLineGQL,
    private taxesGQL : TaxesGQL,
    private productsGQL : ProductsGQL,
  ) { }

  productSelectionChanged(product:ProductListPartsFragment) {
    this.editForm.patchValue(
      {
        productId: product.id
      }
    );
  }

  async ngOnInit() {
    this.products = await this.productsGQL.fetch().pipe(map(({data}) => data.products)).toPromise();
    this.taxes = await this.taxesGQL.fetch().pipe(map(({data}) => data.taxes)).toPromise();

    this.editForm = this.formBuilder.group({
      lineOrder: [this.invoiceLine ? this.invoiceLine.lineOrder : '', Validators.required],
      linePrice: [this.invoiceLine ? this.invoiceLine.linePrice : '', Validators.required],
      narration: [this.invoiceLine ? this.invoiceLine.narration : '', Validators.required],
      quantity: [this.invoiceLine ? this.invoiceLine.quantity : '', Validators.required],
      lineTaxId: [this.invoiceLine && this.invoiceLine.lineTax ? this.invoiceLine.lineTax.id : '', Validators.required],
      productId: [this.invoiceLine && this.invoiceLine.product ? this.invoiceLine.product.id : '', Validators.required],
    }, );
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const args = this.getSaveArgs(this.editForm.value);
    const result = await this.salesInvoiceLineGQL.mutate(
      {
        args,
      }).toPromise();
    this.selectedInvoiceLineChanged.emit(result.data.salesInvoiceLine);
  }

  okClick() {
    const formValues = this.editForm.value;
    const invoiceLine = this.invoiceLine;
    this.selectedInvoiceLineChanged.emit(
      {
        ...invoiceLine,
        ...this.getSaveArgs(formValues),
        id: this.invoiceLine ? this.invoiceLine.id : null
      }
    );
  }

  taxChanged() {
    this.lineTax = this.taxes.find(x => +x.id === +this.editForm.value.lineTaxId);
  }



  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }

  getSaveArgs(formValues: any): SalesInvoiceLineSaveArgs {
    const lineTax = this.lineTax;
    const product = this.product;
    return {
      id: this.invoiceLine && this.invoiceLine.id > 0 ? this.invoiceLine.id : null,
      invoiceId: this.invoice ? this.invoice.id : null,
      ...formValues,
      lineOrder: +(formValues.lineOrder),
      linePrice: +(formValues.linePrice),
      quantity: +(formValues.quantity),
      lineTax,
      product
    };
  }

}
