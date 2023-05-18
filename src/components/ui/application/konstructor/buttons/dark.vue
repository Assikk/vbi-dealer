<template>
    <button class="px-14 py-4 bg-black rounded-lg font-bold text-sm text-white transition ease-linear hover:text-[#FFC800]">
        <slot/>
    </button>
</template>
<script>
export default {
    name: 'DarkButton'
}
</script>