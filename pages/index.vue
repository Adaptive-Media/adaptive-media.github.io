<template>
  <div>
    <div class="hero-container">
      <div class="hero-container__text">
        <div class="hero-container__text-inner">
          <div class="hero-container__title">
            Your Best Value
            <span>Proposition</span>
          </div>
          <img src="~/assets/img/home/underline.svg" alt="">
          <div class="hero-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <Button text="Get Started" type="primary" size="sm" rounded="md" />
        </div>
      </div>
    </div>

    <div class="container-md">
      <div class="category-container">
        <div class="category-container__title">
          <div class="category-container__title-text">
            Popular <span>Categories</span>
          </div>
          <div class="category-container__link">
            <span>Check all Categories</span>
            <img src="~/assets/img/arrow-right.svg" alt="">
          </div>
        </div>

        <div class="category-container__list">
          <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
        </div>
      </div>

      <div class="product-preview__container">
        <div class="category-container__title">
          <div class="category-container__title-text">
            Popular <span>Products</span>
          </div>
        </div>
        <div class="product-preview__list">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
      <div class="pagination-container">
        <Pagination 
          :total-products="totalProducts"
          :products-per-page="productsPerPage"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>

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
    </div>

   
  </div>

</template>

<script setup>
import Button from '~/components/common/Button.vue';
import CategoryCard from '~/components/home/CategoryCard.vue';
import ProductCard from '~/components/home/ProductCard.vue';
import Pagination from '~/components/common/Pagination.vue';
import PropositionCard from '~/components/home/PropositionCard.vue';

const currentPage = ref(1)
const productsPerPage = ref(6)

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

const [categoriesResult, productsResult, paginationResult] = await Promise.all([
  useFetch('/api/product-categories', {
    server: true, 
    key: 'product-categories',
    query: {
      limit: '8',
      offset: '0',
    }
  }),
  useFetch('/api/popular-products', {
    server: true, 
    key: 'popular-products',
    query: {
      categoryId: null,
      limit: productsPerPage,
      offset: computed(() => (currentPage.value - 1) * productsPerPage.value),
      sortBy: 'popular',
      filter: null,
    }
  }),
  useFetch('/api/pagination-data', {
    server: true, 
    key: 'pagination-data',
    query: {
      type: 'products',
    }
  })
])

if (categoriesResult.error.value) {
  console.error('Categories error (SSR):', categoriesResult.error.value)
}

if (productsResult.error.value) {
  console.error('Products error (SSR):', productsResult.error.value)
} 

console.log('Products (SSR):', productsResult.data.value)
console.log('Pagination (SSR):', paginationResult.data.value)

const categories = computed(() => categoriesResult.data.value?.categories || [])
const products = computed(() => productsResult.data.value || [])
const totalProducts = computed(() => paginationResult.data.value?.totalProductCount || 100)

const handlePageChange = async (page) => {
  currentPage.value = page
  
  await productsResult.refresh()
}
</script>

<style scoped>
.hero-container {
  padding-top: 102px;
  padding-bottom: 64px;
  background: url('~/assets/img/home/hero.png') no-repeat center center;
  border-radius: var(--rounded-md);
  padding: 102px 32px 64px 32px;
  overflow: hidden;
  max-width: var(--container-size);
  margin: 0 auto 80px auto;

}

.hero-container__text{
  max-width: 445px;
  position: relative;
}

.hero-container__text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 909px;
  height: 430px;
  border-radius: 909px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.00) 100%);
}

.hero-container__text-inner {
  position: relative;
  z-index: 1;
}

.hero-container__text .hero-container__title{
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-white);
  line-height: 100%;
}

.hero-container__text .hero-container__title span {
  font-size: 88px;
  margin-top: 16px;
  margin-bottom: 8px;
  line-height: 100%;
  display: flex;
}

.hero-container__description{
  margin-top: 18px;
  color: var(--grey-300);
  font-size: var(--text-sm);
  line-height: 144%;
  margin-bottom: 30px;
  font-weight: var(--font-medium);
}

.category-container{
  margin-bottom: 80px;
}

/* Category section */
.category-container__title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.category-container__title .category-container__title-text{
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--primary);
}

.category-container__title .category-container__title-text span {
  color: var(--blue-400);
}

.category-container__title .category-container__link{
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--blue-400);
  cursor: pointer;
  gap: 8px;
  display: flex;
}

.category-container__list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px
}

.product-preview__list{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}

.pagination-container {
  margin-top: 32px;
}

.pagination-container__text {
  margin-bottom: 24px;
}

.pagination-container__text-text {
  color: var(--grey-600);
  font-size: var(--text-sm);
  text-align: center;
}

.pagination-container{
  margin-bottom: 120px;
}

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


@media screen and (max-width: 1325px) {
  .hero-container{
    margin-left: 16px;
    margin-right: 16px;
  }
}

@media screen and (max-width: 1145px) {
  .product-preview__list {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-card {
    margin: 0 auto;
    /* max-width: 500px; */
    max-width: unset;
    width: 100%;
  }
  
}

@media screen and (max-width: 1024px) {
  .category-container__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 955px) {
  .proposition-container__list {
    grid-template-columns: repeat(1, 1fr);
  }

  .proposition-card {
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .hero-container {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    background-position: right;
    padding: 94px 16px 113px 16px;

  }

  .category-container__list {
    gap: 16px;
  }


  .hero-container__text .hero-container__title {
    font-size: 28px;
  }

  .hero-container__text .hero-container__title span {
    font-size: 60px;
    margin-top: 0;
  }

  .hero-container__description {
    font-size: var(--text-sm);
    margin: 16px 0 24px 0;
  }

  .hero-container__text-inner img {
    max-width: 308px;
  }

  .category-container__title .category-container__title-text {
    font-size: var(--text-lg);
  }

  .category-container__title .category-container__link {
    display: none;
  }

  .category-container__list {
    gap: 32px;
    grid-template-columns: repeat(2, 1fr);
  }

  .product-preview__list {
    grid-template-columns: repeat(1, 1fr);
  }

  .pagination-container {
    margin-top: 24px;
    margin-bottom: 64px;
  }


  .proposition-container__title-text {
    font-size: var(--text-lg);
  }

  .proposition-container__description {
    margin-bottom: 32px;
  }

  .pagination-container {
    font-size: var(--text-md);
  }

  .proposition-container__list {
    margin-bottom: 64px;
  }

  .hero-container, .category-container {
    margin-bottom: 40px;
  }

  .category-container__title {
    margin-bottom: 16px;
  }

  .category-container__list, .product-preview__list {
    gap: 16px;
  }
}

@media screen and (max-width: 576px) {
  .category-container__list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>