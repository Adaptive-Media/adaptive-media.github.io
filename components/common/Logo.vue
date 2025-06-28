<template>
    <router-link to="/" class="logo-link">
        <img :src="logo" :class="logoClass" alt="logo">
    </router-link>
</template>

<script setup>
import logoBlack from '~/assets/img/logo.svg'
import logoWhite from '~/assets/img/logo-white.svg'

const props = defineProps({
    type: {
        type: String,
        default: 'black',
        validator: (value) => {
            return ['black', 'white'].includes(value)
        }
    },
    size: {
        type: String,
        default: 'sm',
        validator: (value) => {
            return ['sm', 'md'].includes(value)
        }
    }
})

const logo = computed(() => props.type === 'black' ? logoBlack : logoWhite)
const logoClass = computed(() => `logo-image logo-image--${props.size}`)
</script>

<style scoped>
.logo-image {
    display: block;
}

.logo-image--sm {
    width: 165px;
}

.logo-image--md {
    width: 265px;
}
</style>