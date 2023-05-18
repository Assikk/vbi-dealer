<template>
    <aside class="min-w-[250px] pt-11 pb-10 px-6 flex flex-col justify-between bg-[#FAFAFA]">
        <div>
            <div class="pb-8 border-b-[1px] border-[#E2E8F0]">
                <div class="w-[132px] h-[28px]">
                    <router-link to="/main">
                        <img src="@/assets/img/logo.webp" alt="Logo" class="w-full h-full">
                    </router-link>
                </div>
            </div>
            <div class="list pt-10 flex flex-col gap-3">
                <div v-for="link in links" :key="link.id" class="text">
                    <div class="flex items-center justify-between gap-2 px-4 py-[13px] rounded-xl cursor-pointer transition ease-linear"
                    :class="$route.path == link.link ? 'stroke-black bg-primary text-black' : 'stroke-Vgray hover:stroke-black hover:bg-primary hover:text-black'"
                    @click="changePage(link)">
                        <div class="flex items-center gap-3">
                            <svg width="20" height="20" fill="inherit" stroke="inherit">
                                <use :xlink:href="`#${link.svg}`"/>
                            </svg>
                            <p>
                                {{link.text}}
                            </p>
                        </div>
                        <svg fill="none" stroke="inherit" width="16" height="16"
                        v-if="link.child"
                        :class="activeLink == link.id ? 'rotate-180' : ''">
                            <use xlink:href="#arrowDown"/>
                        </svg>
                    </div>
                    <ul v-if="activeLink == link.id">
                        <li v-for="item in link.child" :key="item.id" class="px-3 py-2.5 ml-2.5 my-2 rounded-xl transition ease-linear"
                        :class="$route.path == item.link ? 'bg-primary text-black' : 'hover:bg-primary hover:text-black'">
                            <!-- <router-link :to="item.link">
                                <p>
                                    {{item.text}}
                                </p>
                            </router-link> -->
                            <p class="cursor-pointer" @click="test(item)">
                                {{item.text}}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <div class="list">
            <div v-for="link in links.slice(-2)" :key="link.id" class="text">
                <div class="flex items-center justify-between gap-2 px-4 py-[13px] rounded-xl cursor-pointer transition ease-linear"
                :class="$route.path == link.link ? 'stroke-black bg-primary text-black' : 'stroke-Vgray hover:stroke-black hover:bg-primary hover:text-black'"
                @click="changePage(link)">
                    <div class="flex items-center gap-3">
                        <svg class="fill-inherit w-5 h-5">
                            <use :xlink:href="`#${link.svg}`"></use>
                        </svg>
                        <p>
                            {{link.text}}
                        </p>
                    </div>
                    <svg v-if="!link.link" fill="none" class="stroke-inherit w-4 h-4"
                    :class="activeLink == link.id ? 'rotate-180' : ''">
                        <use xlink:href="#arrowDown"/>
                    </svg>
                </div>
                <ul v-if="activeLink == link.id">
                    <li v-for="item in link.child" :key="item.id" class="px-3 py-2.5 ml-2.5 my-2 rounded-xl transition ease-linear"
                    :class="$route.path == item.link ? 'bg-primary text-black' : 'hover:bg-primary hover:text-black'">
                        <router-link :to="item.link">
                            <p>
                                {{item.text}}
                            </p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div> -->
    </aside>
    <!-- <aside class="h-fit shadow rounded-xl">
        <div v-for="link in links" :key="link.id" class="block">
            <router-link :to="link.link" v-if="link.link" 
            class="flex items-center justify-between gap-4 p-5"
            :class="link.link == $route.path ? 'bg-light-yellow' : 'hover:bg-light-yellow'"
            @click="link.isActive = !link.isActive">
                <Link>
                    {{link.text}}
                </Link>
                <div v-if="link.child">
                    <img src="@/assets/img/arrow.svg" alt="" class="min-w-5 min-h-5"
                    :class="link.isActive ? 'rotate-180' : ''">
                </div>
            </router-link>
            <div v-else class="flex items-center justify-between gap-4 p-5 cursor-pointer"
            :class="link.isActive ? 'bg-light-yellow' : 'hover:bg-light-yellow'"
            @click="link.isActive = !link.isActive">
                <Link>
                    {{link.text}}
                </Link>
                <div v-if="link.child">
                    <img src="@/assets/img/arrow.svg" alt="" class="min-w-5 min-h-5"
                    :class="link.isActive ? 'rotate-180' : ''">
                </div>
            </div>
            <ul v-if="link.isActive">
                <li v-for="item in link.child" :key="item.id" class="px-5 py-[10px]"
                :class="item.link == $route.path ? 'bg-dim-yellow' : 'hover:bg-dim-yellow'">
                    <router-link :to="item.link">
                        <Link>
                            {{item.text}}
                        </Link>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside> -->
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'AsideComponent',
    props: {
        links: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeLink: null,
        }
    },
    computed: {
        ...mapState({
            privileges: state => state.privileges
        }),
    },
    methods: {
        ...mapMutations({
            change_search_number: 'searchNumber/CHANGE_SHOW'
        }),
        changePage(field) {
            if(field.link) {
                location.href = field.link
            } else if(field.text == 'Замена номера') {
                this.change_search_number(true)
            } else {
                if(this.activeLink == field.id) {
                    this.activeLink = null
                } else this.activeLink = field.id
            }
        },
        test(link) {
            // this.$router.push(link.link)
            location.href = link.link
        }
    },
}
</script>
<style scoped>
.shadow {
    box-shadow: 0 4px 4px rgb(156 156 156 / 25%);
}
.font {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
</style>