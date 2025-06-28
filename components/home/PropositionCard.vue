<template>
  <div class="proposition-card">
    <div class="proposition-card__image">
      <img :src="getImage(id)" :alt="title" />
    </div>
    <div class="proposition-card__title">
      {{ title }}
    </div>
    <div class="proposition-card__description">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import Shipping from '~/assets/img/home/shipping.svg';
import Leaf from '~/assets/img/home/leaf.svg';
import Mark from '~/assets/img/home/mark.svg';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const getImage = (id) => {
  switch (id) {
    case 0:
      return Mark;
    case 1:
      return Shipping;
    case 2:
      return Leaf;
    default:
      return Shipping;
  }
}
</script>

<style scoped>
.proposition-card{
   max-width: 405px;
}

.proposition-card__image{
    max-width: 60px;
    margin: 0 auto 16px auto;
}

.proposition-card__title{
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--primary);
    text-align: center;
}

.proposition-card__description{
    font-size: var(--text-sm);
    color: var(--grey-350);
    text-align: center;
    font-weight: var(--font-medium);
    margin-top: 8px;
}

@media screen and (max-width: 768px) {
    .proposition-card__title {
        font-size: var(--text-md);
    }
}
</style>