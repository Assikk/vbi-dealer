<template>
    <div :class="styleClass">
        <p>
            {{hour}}:{{min}}:{{sec}}
        </p>
    </div>
</template>
<script>
export default {
    name: 'CounterComponent',
    props: {
        hours: {
            default: '00'
        },
        minuts: {
            default: '00'
        },
        seconds: {
            default: '00'
        },
        styleClass: {
            type: String
        }
    },
    data() {
        return {
            timer: null,
            sec: this.seconds,
            min: this.minuts,
            hour: this.hours
        }
    },
    methods: {
        start() {
            this.hour--
            this.hour = this.toStringNumber(this.hour)
            this.min = '59'
            this.sec = '59'
        },
        toStringNumber(str) {
            str = String(str)
            str = str.padStart(2, '0')
            return str
        },
        startTimer() {
            this.timer = setInterval(() => {
                if(this.sec !== '00') {
                    this.sec--
                }
                this.sec = this.toStringNumber(this.sec)
                if(this.sec == '00' && this.min !== '00') {
                    if(Number(this.min) > 0) {
                        this.min--
                    }
                    this.min = this.toStringNumber(this.min)
                    this.sec = '59'
                    if(this.min == '00' && this.hour !== '00') {
                        this.hour--
                        this.hour = this.toStringNumber(this.hour)
                        this.min = '59'
                    }
                }
            }, 1000)
        },
        stopTimer(timer) {
            clearTimeout(timer)
        }
    },
    mounted() {
        if(Number(this.hours) > 0 && this.minuts == '00' && this.seconds == '00') {
            this.start()
        }
        this.startTimer()
    },
    watch: {
        'sec'() {
            if(this.sec == '00' && this.min == '00' && this.hour == '00') {
                this.stopTimer(this.timer)
            }
        }
    }
}
</script>