<script lang="ts">
    import type { ProductDetail } from '../../lib/model/product';
    import { productService } from '../../lib/core';
    import { _ } from 'svelte-i18n';

    export let product: ProductDetail = productService.getDetailSafeEntity();
</script>

<div class="border-t border-gray-200">
    <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.products.detail.displayName')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.displayName}
            </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.products.detail.sku')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.sku}
            </dd>
        </div>
    </dl>
</div>
