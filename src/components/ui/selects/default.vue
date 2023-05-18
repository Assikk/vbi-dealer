<template>
    <div class="flex flex-col gap-2 text-base text-Vgray">
        <label v-if="label">
            {{label}}
        </label>
        <select class="select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0"
        :disabled="disabled"
        @onchange="$emit('change', $event.target.value)">
            <option selected hidden>
                {{active.priceplan}}
            </option>
            <option 
            :selected="active.technicalPriceplan == item.technicalPriceplan ? true : false" 
            v-for="(item, index) in list" 
            :key="index" 
            :value="item.technicalPriceplan">
                {{item.priceplan}}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'DefaultSelectComponent',
    // props: {
    //         label: String, 
    //         list: Array, 
    //         active: String,
    //         disabled: Boolean
    //     },
        props: ['label', 'list', 'active', 'disabled']
}
</script>
<style scoped>
.select {
    -webkit-appearance: none;
    background: url('@/assets/img/arrow-down.png') 95% 50% no-repeat;
}
</style>