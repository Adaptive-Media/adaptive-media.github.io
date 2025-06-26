<template>
    <header>
        <div class="header__container container-md">
            <Logo type="black" size="sm" />
            <Search class="search-input" />
            <div>
                <img src="~/assets/img/search.svg" alt="Search" class="search-icon">
                <img class="header__menu" src="~/assets/img/menu.svg" alt="Burger Menu">
            </div>
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

.search-icon {
    display: none;
}

.header__container div {
    display: flex;
    align-items: center;
    gap: 16px;
}

@media screen and (max-width: 1300px) {
    .header__container {
        padding-left: 16px;
        padding-right: 16px;
    }
}

@media screen and (max-width: 768px) {
    .search-icon {
        display: block;
    }

    .header__container:deep(.search__container) {
        display: none;
    }

    .header__container:deep(.logo-image) {
        max-width: 105px;
    }
}

</style>