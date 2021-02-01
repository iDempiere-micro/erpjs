<script lang="ts">
    export let title;
</script>

<header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        </slot>
    </div>
</header>
<main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <slot name="content" />
            </div>
        </div>
    </div>
</main>
