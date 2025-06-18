<template>
    <router-link to="/" class="logo-link" :style="{ '--logo-width': logoSize }">
        <img :src="logo" class="logo-image" alt="logo">
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

            logoSize() {
                switch (this.size) {
                    case 'sm':
                        return '165px'
                    case 'md':
                        return '265px'
                }
            }
        }
    }
</script>

<style scoped>
.logo-image {
    width: var(--logo-width);
}
</style>