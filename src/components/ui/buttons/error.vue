<template>
    <button class="py-1 px-2 bg-vbi-red hover:bg-dark-red text-white rounded text-sm">
        <slot/>
    </button>
</template>
<script>
export default {
    name: 'ButtonErrorComponent'
}
</script>