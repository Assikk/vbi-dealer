<template>
    <section>
        <div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-auto">
            <div class="bg-white rounded w-auto shadow-lg">
                <Datepicker v-model="date" inline auto-apply range/>
                <div class="flex items-center gap-4 p-2">
                    <button @click="change_calendar(false)">
                        Выход
                    </button>
                    <button @click="changePeriod">
                        Выбрать
                    </button>
                    <button @click="$emit('clear')">
                        Очистить
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import { ref } from 'vue';
import {mapMutations} from 'vuex'
export default {
    name: 'CalendarApplicationComponent',
    components: {
        Datepicker
    },
    setup() {
        const date = ref();
        
        return {
          date,
        }
    },
    methods: {
        ...mapMutations({
            change_calendar: 'Calendar/CHANGE_CALENDAR',
        }),
        changePeriod() {
            this.date[0] = moment(this.date[0]).format('YYYY-MM-DD');
            this.date[1] = moment(this.date[1]).format('YYYY-MM-DD');
            this.$emit('changePeriod', this.date)
        },
    }
}
</script>