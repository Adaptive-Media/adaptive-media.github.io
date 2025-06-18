<template>
    <header>
        <div class="header__container container-md">
            <Logo type="black" size="sm" />
            <Search />
            <img class="header__menu" src="~/assets/img/menu.svg" alt="Burger Menu">
        </div>
    </header>
</template>

<script setup>
import Logo from '~/components/common/Logo.vue'
import Search from '~/components/common/Search.vue'
</script>

<style scoped>
.header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--container-size);
    margin: 0 auto;
    padding: 24px 0;
}

.header__menu {
    cursor: pointer;
}

</style>