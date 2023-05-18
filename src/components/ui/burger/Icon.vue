<template>
    <button>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    </button>
</template>
<script>
export default {
    name: 'BurgerIconComponent'
}
</script>
<style scoped>
.line {
    display: block;
    margin-block: 7px;
    height: 2px;
    width: 25px;
    background-color: black;
}
</style>