<template>
    <div class="flex flex-col gap-2 text-sm">
        <label>
            {{label}}
        </label>
        <select class="select px-[10px] h-[44px] border-2 border-gray outline-0"
        @onchange="$emit('change', $event.target.value)">
            <option selected hidden/>
            <option 
            :selected="active === item.nameRu ? true : false" 
            v-for="(item, index) in list" 
            :key="index" 
            :value="item.index">
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