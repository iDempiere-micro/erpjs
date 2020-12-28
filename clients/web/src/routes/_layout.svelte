<style>
</style>

<script lang="ts">
import Nav from "../components/Nav.svelte";

export let segment: string;

import {apollo} from '../lib/apollo'
import { setClient } from "svelte-apollo";

import * as sapper from '@sapper/app';
const { session } = sapper.stores();
const { token } = $session;
console.log('*** token in customers', token);
if (token) { setClient(apollo(token)); }

const segmentPageNames = {
  undefined: 'Dashboard',
  'customers': 'Customers'
}

</script>

<div>
<Nav segment="{segment}" />
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {segmentPageNames[segment]}
      </h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-gray-100">
          <slot />
      </div>
    </div>
  </main>
</div>
