import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CurrenciesGQL,
  CurrencyListPartsFragment,
  CustomerListPartsFragment,
  CustomersGQL,
  MyOrganizationsGQL,
  OrganizationListPartsFragment,
  SalesInvoiceByIdGQL,
  SalesInvoiceDetailPartsFragment,
  SalesInvoiceGQL,
  SalesInvoiceLineListPartsFragment,
  SalesInvoiceSaveArgs
} from '@erpjs/api-interfaces';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'erp-edit-invoice',
  template: `
      <form clrStepper [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()" *ngIf="initialized">
          <clr-stepper-panel formGroupName="customer">
              <clr-step-title>Organization and Customer</clr-step-title>
              <clr-step-description>Who is selling to whom.</clr-step-description>
              <clr-step-content *clrIfExpanded>
                  <clr-select-container>
                      <label>Organization</label>
                      <select clrSelect name="responsible" formControlName="organizationDisplayName" *ngIf="organizations">
                          <option *ngFor="let organization of organizations" [value]="organization.displayName">{{organization.displayName}}</option>
                      </select>
                  </clr-select-container>

                  <clr-input-container>
                      <label>Customer</label>
                      <input clrInput readonly type="text" formControlName="customerDisplayName" />
                      <clr-control-helper>Any header you want the task to be called</clr-control-helper>
                      <clr-control-error>You have to give a task a name. </clr-control-error>
                  </clr-input-container>

                  <clr-datagrid [(clrDgSingleSelected)]="selectedCustomer" *ngIf="customers"
                                (clrDgSingleSelectedChange)="customerSelectionChanged($event)">
                      <clr-dg-column>ID
                      </clr-dg-column>
                      <clr-dg-column>Display Name
                      </clr-dg-column>
                      <clr-dg-column>Legal name
                      </clr-dg-column>
                      <clr-dg-column>VAT
                      </clr-dg-column>

                      <clr-dg-row *clrDgItems="let customer of customers" [clrDgItem]="customer">
                          <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.id}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.displayName}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.legalName}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.vatNumber}}</a></clr-dg-cell>
                      </clr-dg-row>
                  </clr-datagrid>

                  <button clrStepButton="next">next</button>
              </clr-step-content>
          </clr-stepper-panel>

          <clr-stepper-panel formGroupName="lines">
              <clr-step-title>Invoice lines</clr-step-title>
              <clr-step-description>...</clr-step-description>
              <clr-step-content *clrIfExpanded>

                  <clr-datagrid *ngIf="invoiceLines">
                      <clr-dg-column>Line order
                      </clr-dg-column>
                      <clr-dg-column >Product
                      </clr-dg-column>
                      <clr-dg-column>Quantity
                      </clr-dg-column>
                      <clr-dg-column>Line tax
                      </clr-dg-column>
                      <clr-dg-column >Line Price
                      </clr-dg-column>
                      <clr-dg-column >Grand Total (posted)
                      </clr-dg-column>


                      <clr-dg-row *clrDgItems="let invoiceLine of invoiceLines">
                          <clr-dg-cell>{{invoiceLine.lineOrder ? invoiceLine.lineOrder : ''}}</clr-dg-cell>
                          <clr-dg-cell>{{invoiceLine.product ? invoiceLine.product.displayName : ''}}
                          </clr-dg-cell>
                          <clr-dg-cell>{{invoiceLine.quantity ? invoiceLine.quantity : ''}}</clr-dg-cell>
                          <clr-dg-cell>{{invoiceLine.lineTax ? invoiceLine.lineTax.displayName : ''}}</clr-dg-cell>
                          <clr-dg-cell>{{invoiceLine.linePrice ? invoiceLine.linePrice : ''}}</clr-dg-cell>
                          <clr-dg-cell>{{0}} Kč </clr-dg-cell>
                          <clr-dg-row-detail *clrIfExpanded>
                              <div class="clr-row">
                                  <erp-edit-invoice-line [invoiceLine]="invoiceLine" [invoice]="invoice"
                                  (selectedInvoiceLineChanged)="selectedInvoiceLineChanged($event)"
                                  >
                                  </erp-edit-invoice-line>
                              </div>
                          </clr-dg-row-detail>
                      </clr-dg-row>

                      <clr-dg-footer>{{invoiceLines.length}} invoice lines</clr-dg-footer>
                  </clr-datagrid>

                  <button clrStepButton="next">next</button>
              </clr-step-content>
          </clr-stepper-panel>

          <clr-stepper-panel formGroupName="others">
              <clr-step-title>Password</clr-step-title>
              <clr-step-description>...</clr-step-description>
              <clr-step-content *clrIfExpanded>

                <clr-select-container>
                  <label>Currency</label>
                  <select clrSelect name="currency" formControlName="currencyIsoCode" *ngIf="currencies">
                    <option *ngFor="let currency of currencies" [value]="currency.isoCode">
                      {{currency.displayName}} - {{currency.isoCode}}</option>
                  </select>
                </clr-select-container>
                <clr-date-container>
                  <label>Issued on</label>
                  <input type="date" clrDate name="issuedOn" formControlName="issuedOn">
                  <clr-control-helper>The task due date.</clr-control-helper>
                  <clr-control-error>You have to say when the task is due.</clr-control-error>
                </clr-date-container>
                <clr-date-container>
                  <label>Transaction date</label>
                  <input type="date" clrDate name="transactionDate" formControlName="transactionDate">
                  <clr-control-helper>The task due date.</clr-control-helper>
                  <clr-control-error>You have to say when the task is due.</clr-control-error>
                </clr-date-container>
                <clr-input-container>
                  <label>Payment Term In Days</label>
                  <input clrInput type="paymentTermInDays" formControlName="paymentTermInDays"/>
                  <clr-control-helper>Any header you want the task to be called</clr-control-helper>
                  <clr-control-error>You have to give a task a name.</clr-control-error>
                </clr-input-container>

                <button clrStepButton="submit">Save</button>
              </clr-step-content>
          </clr-stepper-panel>
      </form>


       `,
  styles: []
})
export class EditSalesInvoiceComponent implements OnInit {
  id?: number = null;
  editForm: FormGroup;
  customer: FormGroup;
  lines: FormGroup;
  others: FormGroup;
  customers: Array<CustomerListPartsFragment>;
  currencies:Array<CurrencyListPartsFragment>;
  organizations: Array<OrganizationListPartsFragment>;
  selectedCustomer: CustomerListPartsFragment;
  invoiceLines: Array<SalesInvoiceLineListPartsFragment>;
  @Input() invoice: SalesInvoiceDetailPartsFragment;
  submitted = false;
  initialized = false;

  constructor(
    private route: ActivatedRoute,
    private salesInvoiceGQL: SalesInvoiceGQL,
    private customersGQL: CustomersGQL,
    private formBuilder: FormBuilder,
    private myOrganizationsGQL: MyOrganizationsGQL,
    private currenciesGQL: CurrenciesGQL,
    private router: Router,
    private query: SalesInvoiceByIdGQL,
  ) {}

  async ngOnInit() {
    if (!this.invoice) {
      const id = +this.route.snapshot.params.id;
      if(id) {
        this.id = id;
        this.invoice = await this.query.fetch({ id })
          .pipe(map(({ data }) => data.salesInvoiceById)).toPromise();
      }
    }

    const customer = this.formBuilder.group({
      customerDisplayName: [this.invoice ? this.invoice.customer.displayName: '', Validators.required],
      organizationDisplayName: [this.invoice ? this.invoice.organization.displayName: '', Validators.required],
    });
    this.customer = customer;
    const lines = this.formBuilder.group({
      invoiceLines: [ this.invoice ? this.invoice.lines : [], Validators.required],
    });
    this.lines = lines;

    const others =this.formBuilder.group({
      currencyIsoCode: [this.invoice ? this.invoice.currency.isoCode :'',  Validators.required],
      issuedOn: [this.invoice ? new Date(this.invoice.issuedOn) :'', Validators.required],
      paymentTermInDays: [this.invoice ? this.invoice.paymentTermInDays :'', Validators.required],
      transactionDate: [this.invoice ? new Date(this.invoice.transactionDate) :'', Validators.required],
    });
    this.others = others;

    this.editForm = this.formBuilder.group({
      customer,
      lines,
      others,
    });
    this.currencies = await this.currenciesGQL.fetch().pipe(map(({data}) => data.currencies)).toPromise();
    this.customers = await this.customersGQL.fetch().pipe(map(({data}) => data.customers)).toPromise();
    this.organizations = await this.myOrganizationsGQL.fetch().pipe(map(({data}) => data.myOrganizations)).toPromise();
    this.invoiceLines = this.invoice ?  this.invoice.lines : [{id: -1, lineOrder: 1} as any];

    this.initialized = true;
  }

  customerSelectionChanged(customer:CustomerListPartsFragment) {
    this.customer.patchValue(
      {
        customerDisplayName: customer ? customer.displayName : null
      }
    );
  }

  selectedInvoiceLineChanged(invoiceLine: SalesInvoiceLineListPartsFragment) {
    const invoiceLines = this.invoiceLines.filter( x => x.id !== invoiceLine.id );
    invoiceLines.push(invoiceLine);
    this.invoiceLines = invoiceLines;
    this.lines.patchValue(
      {
        invoiceLines
      }
    );
  }

  async onSubmit() {
    this.submitted = true;

    console.log('*** this.editForm.invalid', this.editForm);

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const form = this.editForm.value;
    const {customerDisplayName, organizationDisplayName} = this.customer.value;
    const {currencyIsoCode, issuedOn, paymentTermInDays, transactionDate} = this.others.value;

    const organization = this.organizations.find(x => x.displayName === organizationDisplayName);

    const args : SalesInvoiceSaveArgs = {
      customerDisplayName, organizationDisplayName,
      id: this.invoice ? this.invoice.id : null,
      bankAccountDisplayName: organization.bankAccount.displayName,
      lines: this.invoiceLines.map( x => {
        const {lineTax, product, updtTs, updtOpId, isActive, isCurrent, invoice, __typename, ...y} = x;
        return {
        ...y,
        invoiceId: invoice ? invoice.id : null,
        lineTaxId: lineTax.id,
        productId: product.id,
        id: x.id > 0 ? x.id : null,
      }} ),
      currencyIsoCode, issuedOn, paymentTermInDays: +paymentTermInDays, transactionDate
    };
    console.log('*** args', args, JSON.stringify(args));

    const {data} = await this.salesInvoiceGQL.mutate({ args}).toPromise();
    await this.router.navigate(['/salesInvoice', data.salesInvoice.id]);
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}
