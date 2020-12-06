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

</script>

<Nav segment="{segment}" />

<main>
  <slot />
</main>
