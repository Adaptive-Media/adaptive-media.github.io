<template>
    <div class="merchant-logo">
        <img :src="logoSrc" :alt="`${merchant} logo`">
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    merchant: {
        type: String,
        required: true
    }
})

const logos = import.meta.glob('~/assets/img/merchants/*.svg', { eager: true, import: 'default' })

const logoSrc = computed(() => {
  return logos[`/assets/img/merchants/${props.merchant}.svg`] || '/merchants/default.svg'
})

</script>

<style scoped>
.merchant-logo {
    border-radius: var(--rounded-md);
border: 1px solid var(--grey-100);
background: var(--color-white);
padding: 0 16px;
position: absolute;
right: 16px;
top: 16px;
height: 53px;
display: flex;
align-items: center;
overflow: hidden;
}

.merchant-logo img {
    max-height: 27px;
    max-width: 100%;
    object-fit: contain;
}

@media (max-width: 768px) {
    .merchant-logo {
        height: 40px;
        padding: 0 16px;
        display: flex;
        align-items: center;
    }
}
</style>