<template>
    <!-- <button class="w-full rounded text-base py-[10px] px-4 bg-light-yellow font-['Roboto']"
    :class="isDisable ? 'opacity-60 cursor-auto' : 'opacity-100 cursor-pointer'">
        <slot/>
    </button> -->
    <button class="w-full rounded-xl p-4 transition ease-linear"
    :class="disabled ? 'bg-[#95ADFF] text-white' : active ? 'bg-[#003CBE] text-white' : 'bg-primary hover:bg-[#003CBE] text-black hover:text-white'">
        <Text class="text-inherit">
            <slot/>
        </Text>
    </button>
</template>
<script>
import Text from '@/components/ui/texts/ExtraBold-Black-Base.vue'
export default {
    name: 'PrimaryButtonComponent',
    props: {
        disabled: {
            type: Boolean
        },
        active: {
            type: Boolean
        }
    },
    components: {
        Text
    }
}
</script>