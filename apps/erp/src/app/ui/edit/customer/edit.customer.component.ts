import { Component, Input, OnInit } from '@angular/core';
import { Address, Country, Customer, CustomerGQL } from '@erpjs/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type EditCustomer = { __typename?: 'Customer' }
  & Pick<Customer, 'id' |'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail'>
  & { legalAddress: (
    { __typename?: 'Address' }
    & Pick<Address, 'line1' | 'city' | 'zipCode'>
    & { country: (
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'displayName' | 'isoCode'>
      ) }
    ) };

@Component({
  selector: 'erp-edit-customer',
  template: `
      <form clrForm [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()">
          <clr-input-container>
              <label>Display name</label>
              <input clrInput type="text" formControlName="displayName" />
              <clr-control-helper>Any unique name that you want the company to be called</clr-control-helper>
              <clr-control-error>You have to give a customer a name. If not sure, use the legal name.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Legal name</label>
              <input clrInput type="text" formControlName="legalName" />
              <clr-control-helper>The customer legal name incl. the legal form.</clr-control-helper>
              <clr-control-error>You have to have the correct legal name for invoicing and other processes.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>VAT number</label>
              <input clrInput type="text" formControlName="vatNumber" />
              <clr-control-helper>VAT number is the customer is VAT registered.</clr-control-helper>
              <clr-control-error>We have to have the VAT number. If the customer is not VAT registered, 
                  enter some other unique id number.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Legal address - street</label>
              <input clrInput type="text" formControlName="legalAddressLine1" />
              <clr-control-helper>The customer legal address street</clr-control-helper>
              <clr-control-error>You have to have the correct legal address for invoicing and other processes.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Legal address - city</label>
              <input clrInput type="text" formControlName="legalAddressCity" />
              <clr-control-helper>The customer legal address city</clr-control-helper>
              <clr-control-error>You have to have the correct legal address for invoicing and other processes.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Legal address - ZIP/Postal code</label>
              <input clrInput type="text" formControlName="legalAddressZip" />
              <clr-control-helper>The customer legal address zip code</clr-control-helper>
              <clr-control-error>You have to have the correct legal address for invoicing and other processes.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label>Email to send invoices to</label>
              <input clrInput type="text" formControlName="invoicingEmail" />
              <clr-control-helper>Where should the invoices be sent to (email address).</clr-control-helper>
              <clr-control-error>We have to have the valid email address for invoicing.</clr-control-error>
          </clr-input-container>
          <button type="submit" class="btn btn-primary">Save</button>
      </form>
  `,
  styles: []
})
export class EditCustomerComponent implements OnInit {
  @Input() customer: EditCustomer;

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerGQL: CustomerGQL,
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      displayName: [this.customer.displayName, Validators.required],
      legalName: [this.customer.legalName, Validators.required],
      vatNumber: [this.customer.vatNumber, Validators.required],
      legalAddressLine1: [this.customer.legalAddress.line1, Validators.required],
      legalAddressCity: [this.customer.legalAddress.city, Validators.required],
      legalAddressZip: [this.customer.legalAddress.zipCode, Validators.required],
      invoicingEmail: [this.customer.invoicingEmail, Validators.required],
    }, );
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    await this.customerGQL.mutate(
      {
        args: {
          id: this.customer.id,
          displayName: this.editForm.value.displayName,
          legalName: this.editForm.value.legalName,
          legalAddress: {
            city: this.editForm.value.legalAddressCity,
            countryIsoCode: 'CZ',
            line1: this.editForm.value.legalAddressLine1,
            zipCode: this.editForm.value.legalAddressZip,
          },
          invoicingEmail: this.editForm.value.invoicingEmail,
        }}).toPromise();
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}
