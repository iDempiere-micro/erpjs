<style>
:global(input.invalid) {
  border-color: red;
}
</style>

<script context="module" lang="ts">
export async function preload(page, session) {
  const { token } = session;

  if (!token) {
    return this.redirect(302, "login");
  }
}
</script>

<script lang="ts">
import { gql } from "apollo-boost";

import { form, bindClass } from "svelte-forms";
import * as sapper from '@sapper/app';
import { apollo } from '../lib/apollo'
import { mutation, setClient } from "svelte-apollo";
const { session } = sapper.stores();
const { token } = $session;
console.log('*** token in add customer', token);

const ADD_CUSTOMER = gql`
  mutation CreateCustomer($displayName: String!) {
    createCustomer(
      args: {
        displayName: $displayName
        legalName: $displayName
        invoicingEmail: "ccc"
        idNumber: "123"
        legalAddress: {
          city: "ccc"
          countryIsoCode: "CZ"
          line1: "lll"
          zipCode: "1234567"
        }
      }
    ) {
      id
    }
  }
`;
const addBook = mutation(ADD_CUSTOMER /*, apollo(token)*/ );

let name = "";

const myForm = form(() => ({
  name: { value: name, validators: ["required"] },
}));

const createCustomer = async () => {
  await addBook({
    variables: { displayName: name },
  });
};
</script>

<form>
  <input
    type="text"
    name="name"
    bind:value="{name}"
    use:bindClass="{{ form: myForm }}"
  />

  <button on:click|preventDefault="{createCustomer}"> Validate form </button>

  <button disabled="{!$myForm.valid}">Login</button>
</form>
