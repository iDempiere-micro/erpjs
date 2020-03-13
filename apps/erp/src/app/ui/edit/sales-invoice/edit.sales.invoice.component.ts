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
                          <option *ngFor="let organization of organizations" [value]="organization.displayName">
                            {{organization.displayName}} - {{organization.idNumber}} - {{organization.legalName}}
                            - {{organization.legalAddress.line1}}, {{organization.legalAddress.zipCode}}
                            {{organization.legalAddress.city}}, {{organization.legalAddress.country.displayName}}
                          </option>
                      </select>
                    <clr-control-helper>The invoice seller</clr-control-helper>
                    <clr-control-error>An invoice needs to be invoiced by an organization. Choose one from the dropdown
                      above.</clr-control-error>
                  </clr-select-container>

                  <clr-input-container>
                      <label>Customer</label>
                      <input clrInput readonly type="text" formControlName="customerDisplayName" />
                      <clr-control-helper>The invoice customer or client</clr-control-helper>
                      <clr-control-error>An invoice needs to have a customer or client. Choose one from the list below.
                      </clr-control-error>
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
              <clr-step-description>Product and service invoiced</clr-step-description>
              <clr-step-content *clrIfExpanded>
                <clr-select-container>
                  <label>Currency</label>
                  <select clrSelect name="currency" formControlName="currencyIsoCode" *ngIf="currencies">
                    <option *ngFor="let currency of currencies" [value]="currency.isoCode">
                      {{currency.displayName}} - {{currency.isoCode}}</option>
                  </select>
                </clr-select-container>

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
                                <button class="btn btn-info-outline" (click)="askDeleteInvoiceLine(invoiceLine)" >Delete</button>
                              </div>
                          </clr-dg-row-detail>
                      </clr-dg-row>

                      <clr-dg-footer>{{invoiceLines.length}} invoice lines</clr-dg-footer>
                  </clr-datagrid>

                <button class="btn btn-info-outline" (click)="addInvoiceLine()" >Add Invoice Line</button>

                  <button clrStepButton="next">next</button>
              </clr-step-content>
          </clr-stepper-panel>

          <clr-stepper-panel formGroupName="others">
              <clr-step-title>Terms</clr-step-title>
              <clr-step-description>Dates and other conditions</clr-step-description>
              <clr-step-content *clrIfExpanded>

                <clr-date-container>
                  <label>Issued on</label>
                  <input type="date" clrDate name="issuedOn" formControlName="issuedOn">
                  <clr-control-helper>Invoice issue date; usually today or transaction date.
                    Due date is calculated based on the issue date.</clr-control-helper>
                  <clr-control-error>You have to say when the invoice was issued.</clr-control-error>
                </clr-date-container>
                <clr-date-container>
                  <label>Transaction date</label>
                  <input type="date" clrDate name="transactionDate" formControlName="transactionDate">
                  <clr-control-helper>The corresponding transaction date.
                    The transaction will be posted on the Transaction date.</clr-control-helper>
                  <clr-control-error>You have to say when the invoice transaction happened.</clr-control-error>
                </clr-date-container>
                <clr-input-container>
                  <label>Payment Term In Days</label>
                  <input clrInput type="paymentTermInDays" formControlName="paymentTermInDays"/>
                  <clr-control-helper>How many days from the issue date to the due date</clr-control-helper>
                  <clr-control-error>You have to give the payment term in days.</clr-control-error>
                </clr-input-container>

                <button clrStepButton="submit">Save</button>
              </clr-step-content>
          </clr-stepper-panel>
      </form>

      <clr-modal [(clrModalOpen)]="confirmDeleteLineVisible">
        <h3 class="modal-title">Delete Invoice Line</h3>
        <div class="modal-body">
          <p>Confirm you want to remove and delete this invoice line. This action is irreversible.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" (click)="confirmDeleteLineVisible = false">Cancel</button>
          <button type="button" class="btn btn-primary" (click)="deleteInvoiceLine(invoiceLineToBeDeleted)">OK</button>
        </div>
      </clr-modal>
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
  confirmDeleteLineVisible = false;
  invoiceLineToBeDeleted: SalesInvoiceLineListPartsFragment;

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
      currencyIsoCode: [this.invoice ? this.invoice.currency.isoCode :'',  Validators.required],
      invoiceLines: [ this.invoice ? this.invoice.lines : [], Validators.required],
    });
    this.lines = lines;

    const others =this.formBuilder.group({
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

  deleteInvoiceLine(invoiceLine: SalesInvoiceLineListPartsFragment) {
    const invoiceLines = this.invoiceLines.filter( x => x.id !== invoiceLine.id );
    this.invoiceLines = invoiceLines;
    this.lines.patchValue(
      {
        invoiceLines
      }
    );
    this.confirmDeleteLineVisible = false;
  }

  askDeleteInvoiceLine(invoiceLine: SalesInvoiceLineListPartsFragment) {
    this.invoiceLineToBeDeleted = invoiceLine;
    this.confirmDeleteLineVisible = true;
  }

  addInvoiceLine() {
    const minNew =
      (!this.invoiceLines || this.invoiceLines.length === 0) ? 0 : Math.min(...this.invoiceLines.map( x => x.id ));
    this.invoiceLines.push({id: minNew-1, lineOrder: -minNew + 1} as any);
    this.lines.patchValue(
      {
        invoiceLines: this.invoiceLines
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
    const {currencyIsoCode} = this.lines.value;
    const {issuedOn, paymentTermInDays, transactionDate} = this.others.value;

    const organization = this.organizations.find(x => x.displayName === organizationDisplayName);

    const args : SalesInvoiceSaveArgs = {
      customerDisplayName, organizationDisplayName,
      id: this.invoice ? this.invoice.id : null,
      bankAccountDisplayName: organization.bankAccount.displayName,
      lines: this.invoiceLines.map( x => {
        const {lineTax, product, updtTs, updtOpId, isActive, isCurrent, invoice, __typename, ...y} = x;
        console.log(invoice, lineTax, product, x);
        return {
          ...y,
          invoiceId: invoice ? invoice.id : null,
          lineTaxId: lineTax.id,
          productId: product.id,
          id: x.id > 0 ? x.id : null,
          }
        }
      ),
      currencyIsoCode, issuedOn, paymentTermInDays: +paymentTermInDays, transactionDate
    };
    console.log('*** args', args, JSON.stringify(args));

    const {data} = await this.salesInvoiceGQL.mutate({args}).toPromise();
    await this.router.navigate(['/salesInvoice', data.salesInvoice.id]);
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}
