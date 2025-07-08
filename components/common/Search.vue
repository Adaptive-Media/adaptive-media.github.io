<template>
    <form class="search__container" @submit.prevent="search">
        <input type="text" placeholder="Search" v-model="query">
        <button @click.stop.prevent="search" class="search__button">
            <img src="~/assets/img/search.svg" alt="search">
        </button>
    </form>
</template>

<script setup>
const query = ref('')

const search = () => {
    console.log(query.value)
}
</script>

<style scoped>
.search__container {
    max-width: 336px;
    width: 100%;
    position: relative;
}

.search__button {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
    margin: 0;
}

.search__container input {
    width: 100%;
    height: 100%;
    border-radius: var(--rounded-md);
    border: 1px solid var(--grey-300);
    box-sizing: border-box;
    height: 50px;
    padding-left: 16px;
    outline: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: var(--text-md);
    font-weight: 400;
}

.search__container input::placeholder {
    color: var(--grey-400);
}
</style>