<template>
    <div class="flex flex-col items-end mt-4">
        <ul class="h-10 flex gap-2 text-sm font-medium text-[#718096]">
            <li v-if="!pagination.first" class="item">
                <button @click="$emit('previousPage')">
                    <svg class="mx-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 5L7.5 10L12.5 15" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>
            <li class="item"
            :class="pagination.number + 1 == 1 ? 'active' : ''"
            v-if="isShowFirstPage">
                <button @click="$emit('changePage', '1')">
                    1
                </button>
            </li>
            <li class="item" v-for="item in pages" :key="item.id"
            :class="pagination.number + 1 == item.id ? 'active' : ''">
                <button @click="$emit('changePage', item.name)">
                    {{item.name}}
                </button>
            </li>
            <li class="w-10 flex flex-col justify-center items-center"
            v-if="isShowLastPage && pagination.totalPages > 2">
                ...
            </li>
            <li class="item"
            :class="pagination.number == pagination.totalPages - 1 ? 'active' : ''">
                <button @click="$emit('changePage', String(pagination.totalPages))">
                    {{pagination.totalPages}}
                </button>
            </li>
            <li v-if="!pagination.last" class="item">
                <button @click="$emit('nextPage')">
                    <svg class="mx-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 5L12.5 10L7.5 15" stroke="#718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'PagePaginationComponent',
    props: {
        pagination: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pages: [],
            isShowFirstPage: true,
            isShowLastPage: true
        }
    },
    methods: {
        get_pages() {
            this.pages = []
            for(let i = 1; i < this.pagination.totalPages; i++) {
                if(i - this.pagination.number < 3 && i - this.pagination.number > -2) {
                    this.pages.push({
                        id: i,
                        name: String(i)
                    })
                }
            }

            // Проверка если 1 элемент 1 то скрыть button 1
            if(this.pages[0].id == 1) {
                this.isShowFirstPage = false
            } else this.isShowFirstPage = true

            // Проверка есть ли в pages последний элемент то скрываем последний button и кнопки
            this.pages.forEach((item) => {
                if(item.id == this.pagination.totalPages - 1) {
                    this.isShowLastPage = false
                } else this.isShowLastPage = true
            })
        }
    },
    watch: {
        pagination() {
            this.get_pages()
        }
    },
}
</script>
<style scoped>
    .item {
        width: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        border-radius: 8px;
    }
    .item:hover {
        border: 1px solid #F7BE00;
        color: #000;
    }
    .active {
        border: 1px solid #F7BE00;
        color: #000;
    }
</style>