<template>
    <span class="text-base font-extrabold text-Vblack">{{minute}}:{{sec}}</span>
</template>
<script>
export default {
    name: 'TimerComponent',
    data() {
        return {
            minute: 2,
            sec: '00',
        }
    },
    methods: {
        timer() {
            setInterval(() => {
                if(this.minute >= 1 && this.sec == '00') {
                    this.minute--
                    this.sec = 60
                }
                if(this.minute == 0 || this.sec !== 0) {
                    if(this.sec > 0) {
                        this.sec --
                    } else {
                        this.sec = 0
                    }
                }
                if(this.sec < 10) {
                    this.sec = '0' + this.sec
                }
            }, 1000)
        },
    },
    mounted() {
        this.timer()
    },
}
</script>