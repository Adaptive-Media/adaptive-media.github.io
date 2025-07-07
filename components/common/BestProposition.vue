<template>
  <div class="proposition-container">
        <div class="proposition-container__title">
          <div class="proposition-container__title-text">
            Our <span>Best Value</span> Proposition
          </div>
          <div class="proposition-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div class="proposition-container__list">
          <PropositionCard 
            v-for="proposition in propositions" 
            :key="proposition.id" 
            :id="proposition.id" 
            :title="proposition.title" 
            :description="proposition.description" 
          />
        </div>
      </div>
</template>

<script setup>
import PropositionCard from '~/components/home/PropositionCard.vue';
const propositions = ref([
  {
    id: 0,
    title: 'Gratis verzending vanaf €50',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
  },
  {
    id: 1,
    title: 'Klanten geven ons een 9.4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
  },
  {
    id: 2,
    title: 'Veilig & Achteraf betalen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
  },
])
</script>


<style scoped>

.proposition-container__title-text{
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--primary);
  text-align: center;
  margin-bottom: 16px;
}

.proposition-container__title-text span {
  color: var(--blue-400);
}

.proposition-container__description{
  font-size: var(--text-sm);
  color: var(--primary);
  text-align: center;
  max-width: 620px;
  margin: 0 auto 48px auto;
}

.proposition-container__list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 110px;
}

@media screen and (max-width: 926px) {
  .proposition-container__list{
    grid-template-columns: repeat(1, 1fr);
  }

  .proposition-card{ 
    max-width: unset;
  }
}

@media screen and (max-width: 768px) {
    .proposition-container__title-text {
    font-size: var(--text-lg);
  }

  .proposition-container__description {
    margin-bottom: 32px;
  }
}


</style>
