<template>
<div class="flex flex-col sm:flex-row gap-8 items-end sm:items-center justify-end">
    <Text>
        Общее количество: {{totalAmounts}}
    </Text>
    <div class="flex items-center gap-2">
        <Text>
            Показывать по
        </Text>
        <Select :list="list"
        :active="active"
        @change="$emit('pagination', $event.target.value)"/>
    </div>
</div>
</template>
<script>
import Select from '@/components/ui/selects/default.vue'
import Text from '@/components/ui/texts/ExtraBold-Vgray-Base.vue'
export default {
    name: 'PaginationComponent',
    components: {
        Select,
        Text
    },
    props: ['list', 'active', 'totalAmounts'],
}
</script>