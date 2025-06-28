<template>
  <button class="button" :class="buttonClass, roundedClass">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
    },
    rounded: {
        type: String,
        default: 'md',
        validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
    },
    type: {
        type: String,
    }
})

const buttonClass = computed(() => `button--${props.type} button--${props.size}`)
const roundedClass = computed(() => `rounded--${props.rounded}`)
</script>

<style scoped>
.button {
   background: var(--blue-400);
   border: 0;
   outline: 0;
   color: var(--color-white);
   font-size: var(--text-sm);
   font-weight: var(--font-bold);
   font-family: 'Barlow', sans-serif;
   transition: background 0.3s ease;
}

.button:hover {
    background: var(--blue-300);
    cursor: pointer;
}

.button--sm {
    width: 205px;
    height: 48px;
}

.button--full {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rounded--xs {
    border-radius: var(--rounded-xs);
}

.rounded--md {
    border-radius: var(--rounded-md);
}
</style>