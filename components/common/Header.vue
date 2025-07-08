<template>
    <header>
        <form class="header__container container-md">
            <Logo type="black" size="sm" />
            <Search class="search-input" :class="{ 'search-expanded': showSearch }" @submit.prevent="search" />
            <div>
                <form @submit.prevent="search" class="mobile-search" ref="mobileSearchRef">
                    <input :class="{ expanded: showSearch }" type="text" v-model="query" placeholder="Search">
                    <button @click.stop.prevent="search">
                        <img src="~/assets/img/search.svg" alt="Search" class="search-icon">
                    </button>
                </form>
                <img @click="menu = !menu" @closeMenu="menu = false" class="header__menu" src="~/assets/img/menu.svg" alt="Burger Menu">
            </div>
        </form>
    </header>
    <Menu :class="{ active: menu }" @closeMenu="menu = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Logo from '~/components/common/Logo.vue'
import Search from '~/components/common/Search.vue'
import Menu from '~/components/common/Menu.vue'

const menu = ref(false)
const showSearch = ref(false)
const query = ref('')

const mobileSearchRef = ref(null)

const search = () => {
    if(showSearch.value) {
        console.log(query.value)
    } else {
        showSearch.value = true
    }
}

function handleClickOutside(e) {
    if (showSearch.value && mobileSearchRef.value && !mobileSearchRef.value.contains(e.target)) {
        showSearch.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
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

.mobile-search button {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 2;
}

.mobile-search {
    position: relative;    
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
}

.mobile-search input {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    transform: translateY(-50%);
    border: none;
    outline: none;
    border-radius: var(--rounded-md);
    border: 1px solid var(--grey-300);
    box-sizing: border-box;
    height: 40px;
    padding-left: 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: var(--text-sm);
    font-weight: 400;
    transition: width 0.3s ease;
    opacity: 0;
}

.mobile-search input.expanded {
    max-width: 250px;
    width: 100%;
    opacity: 1;
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

    .header__container div {
        width: 100%;
        justify-content: flex-end;
    }
}

@media screen and (max-width: 480px) {
    .mobile-search input.expanded {
        max-width: 160px;
    }
}

</style>