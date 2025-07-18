<template>
    <div class="menu">
        <div class="container-md">
            <div class="logo-section">
                <Logo type="white" size="sm" />
                <img src="~/assets/img/close.svg" @click="closeMenu" alt="Close" class="close-icon">
            </div>
            <div class="menu-list">
                    <router-link to="/" :class="{ active: $route.path === '/' }" @click="closeMenu">Home page</router-link>
                    <router-link to="/categories" :class="{ active: $route.path === '/categories' }" @click="closeMenu">Categories</router-link>
                    <router-link to="/about" :class="{ active: $route.path === '/about' }" @click="closeMenu">About Us</router-link>
                    <router-link to="/contact" :class="{ active: $route.path === '/contact' }" @click="closeMenu">Contact Us</router-link>
                    <router-link to="/" @click="closeMenu">Line 4</router-link>
                    <router-link to="/" @click="closeMenu">Line 5</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from '~/components/common/Logo.vue'

const emit = defineEmits(['closeMenu'])

const closeMenu = () => {
    emit('closeMenu')
}
</script>

<style scoped>
.menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    background: rgba(16, 128, 229, .9);
}

.menu.active {
    opacity: 1;
    visibility: visible;
}

.logo-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
}

.close-icon {
    cursor: pointer;
}

.menu-list{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
   
}

.menu-list a {
    color: #FFF;
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    text-decoration: none;
}

.menu-list a.active {
    text-decoration: underline;
}


@media screen and (max-width: 768px) {
    .menu:deep(.logo-image) {
        max-width: 105px;
    }
}


</style>