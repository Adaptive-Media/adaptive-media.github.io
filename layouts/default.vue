<template>
    <div class="layout-container">
        <Header class="header" />
        <main class="main-content">
            <NuxtPage />
        </main>
        <Footer class="footer" />
    </div>
</template>

<script setup>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'

</script>

<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#__nuxt {
    height: 100%;
}

.layout-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    flex-shrink: 0;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.footer {
    flex-shrink: 0;
}
</style>