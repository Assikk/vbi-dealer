<template>
    <div class="flex flex-col gap-2 text-base">
        <label>
            {{label}}
        </label>
        <select class="select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0"
        @onchange="$emit('change', $event.target.value)">
            <option selected hidden/>
            <option 
            :selected="active === item.id ? true : false" 
            v-for="(item, index) in list" 
            :key="index" 
            :value="item.id">
                {{item.nameRu}}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'CountrytSelectComponent',
    // props: {
    //         label: String, 
    //         list: Array, 
    //         active: String,
    //     },
    props: ['label', 'list', 'active']
}
</script>
<style scoped>
.select {
    -webkit-appearance: none;
    background: url('@/assets/img/arrow-down.png') 95% 50% no-repeat;
}
</style>