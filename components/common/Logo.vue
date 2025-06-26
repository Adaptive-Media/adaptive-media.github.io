<template>
    <router-link to="/" class="logo-link">
        <img :src="logo" :class="logoClass" alt="logo">
    </router-link>
</template>

<script>
    import logoBlack from '~/assets/img/logo.svg'
    import logoWhite from '~/assets/img/logo-white.svg'

    export default {
        name: 'Logo',
        props: {
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
        },
        computed: {
            logo() {
                return this.type === 'black' ? logoBlack : logoWhite
            },

            logoClass() {
                return `logo-image logo-image--${this.size}`
            }
        }
    }
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