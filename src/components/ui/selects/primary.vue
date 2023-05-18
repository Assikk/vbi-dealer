<template>
    <div class="flex flex-col gap-2 text-base text-Vgray">
        <label v-if="label">
            {{label}}
        </label>
        <div v-if="disabled" class="relative">
            <select class="select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0"
            :disabled="disabled"
            @onchange="$emit('change', $event.target.value)">
                <option selected hidden/>
                <option 
                :selected="active == item.value ? true : false" 
                v-for="(item, index) in list" 
                :key="index" 
                :value="item.value">
                    {{item.text}}
                </option>
            </select>
            <div class="rounded-xl absolute top-0 left-0 z-10 bg-Vgray w-full h-full"/>
        </div>
        <select v-else class="select p-4 rounded-xl border-[1px] border-[#E2E8F0] focus:border-[#194BFB] outline-0"
        :disabled="disabled"
        @onchange="$emit('change', $event.target.value)">
            <option selected hidden/>
            <option 
            :selected="active == item.value ? true : false" 
            v-for="(item, index) in list" 
            :key="index" 
            :value="item.value">
                {{item.text}}
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
    //         disabled: Boolean,
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