<template>
    <button class="w-fit rounded-full text-base py-[3px] px-6 bg-light-yellow font-['Roboto']"
    :class="isDisable ? 'opacity-60 cursor-auto' : 'opacity-100 cursor-pointer'">
        <slot/>
    </button>
</template>
<script>
export default {
    name: 'ButtonRoundedComponent',
    props: ['isDisable']
}
</script>