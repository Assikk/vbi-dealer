<template>
    <button class="text-[15px] p-4 min-w-[134px] border-2 transition ease-linear rounded-lg text-[#272727] border-transparent"
    :class="active ? 'bg-[#FFC800] cursor-default' : 'bg-[#F0F0F0] hover:border-[#FFC800] cursor-pointer'">
        <slot/>
    </button>
</template>
<script>
export default {
    name: 'PrimaryButtonKonstructor',
    props: {
        active: {
            type: Boolean,
        }
    }
}
</script>