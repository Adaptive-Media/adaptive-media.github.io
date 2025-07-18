<template>
    <div class="layout-container">
        <Header class="header" />
        <main class="main-content">
            <NuxtPage />
        </main>
        <Footer class="footer" />
        <div @click="scrollToTop" alt="scrollBtn" class="scroll-btn" :class="{ 'visible': isVisible, 'over-footer': isOverFooter }"></div>
    </div>
</template>

<script setup>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const isVisible = ref(false)
const isOverFooter = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        isVisible.value = window.scrollY > 100
        
        const footer = document.querySelector('footer')
        if (footer) {
            const footerRect = footer.getBoundingClientRect()
            const buttonBottom = window.innerHeight - 30 - 50 
            isOverFooter.value = footerRect.top < buttonBottom
        }
    })
})
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

.scroll-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
    width: 80px;
    height: 80px;
    background: var(--blue-400);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-mask-size: contain;
    -webkit-mask-image: url('~/assets/img/scrollBtn.svg');
    mask-image: url('~/assets/img/scrollBtn.svg');
    mask-size: contain;
    transition: background-color 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.scroll-btn.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-btn:hover {
    background: var(--blue-800);
}

.scroll-btn.over-footer {
    background: var(--color-white);
}

.scroll-btn.over-footer:hover {
    background: var(--grey-100);
}

@media screen and (max-width: 768px) {
    .scroll-btn {
        display: none;
    }
}
</style>