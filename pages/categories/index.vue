<template>
    <div class="container-md">
      <div class="path">
            <span>Categories</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
      </div>
      <div class="title">Categories</div>
      <div class="categories-container">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
      <div class="pagination-container">
        <Pagination 
          :total-products="totalCategories"
          :products-per-page="categoriesPerPage"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>
      <BestProposition />
    </div>
</template>

<script setup>
import CategoryCard from '~/components/home/CategoryCard.vue'
import Pagination from '~/components/common/Pagination.vue'
import BestProposition from '~/components/common/BestProposition.vue'
const currentPage = ref(1)
const categoriesPerPage = ref(16)

const [categoriesResult, paginationResult] = await Promise.all([
  useFetch('/api/get-categories', {
    server: true, 
    key: 'get-categories',
    query: {
      limit: categoriesPerPage.value,
      offset: computed(() => (currentPage.value - 1) * categoriesPerPage.value),
    }
  }),
  useFetch('/api/pagination-categories', {
    server: true, 
    key: 'pagination-categories',
    query: {
      limit: categoriesPerPage,
      offset: computed(() => (currentPage.value - 1) * categoriesPerPage.value),
    }
  })
])

if (categoriesResult.error.value) {
  console.error('Categories error (SSR):', categoriesResult.error.value)
}

if (paginationResult.error.value) {
  console.error('Pagination error (SSR):', paginationResult.error.value)
}

const categories = computed(() => categoriesResult.data.value?.categories || [])
const totalCategories = computed(() => paginationResult.data.value?.totalCategoryCount || 32)
console.log(categories.value)
const handlePageChange = async (page) => {
  currentPage.value = page
  
  await categoriesResult.refresh()
}
</script>


<style scoped>
.path {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 24px;
}

.path span {
  cursor: pointer;
}

.title {
  color: var(--primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: 24px;
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 32px;
}

.pagination-container {
  margin-top: 32px;
  margin-bottom: 120px;
}

@media screen and (max-width: 1024px) {
  .categories-container {
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 16px;
  }
}

@media screen and (max-width: 768px) {
  .categories-container {
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .pagination-container {
    margin-top: 24px;
    margin-bottom: 64px;
  }
}

@media screen and (max-width: 576px) {
  .categories-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>