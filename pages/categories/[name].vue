<template>
    <div class="container-md">
      <div class="path">
            <span @click="navigateTo('/categories')">Categories</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
            <span>{{ categoryName }}</span>
      </div>
      <div class="title">{{ categoryName }}</div>
      <div class="filter-container">
        <div class="filter-container__leftside">
          <img src="~/assets/img/filter.svg" alt="Filter">
          <div class="selected-sorted">
            <span>Sort by average rating</span>
            <img src="~/assets/img/arrow-sort.svg" alt="Arrow">
          </div>
        </div>
        <div class="filter-container__rightside">
          <div class="filter-container__rightside-item">
            <img src="~/assets/img/disclaimer.svg" alt="Disclaimer">
            <span>Disclaimer</span>
          </div>
          <div class="filter-container__rightside-item">Last updated on 12.05.2025</div>
        </div>
      </div>
      
            <div class="products-container">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      
      <div class="pagination-container">
        <Pagination 
          :total-products="totalProducts"
          :products-per-page="productsPerPage"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>
      <BestProposition />
    </div>
</template>

<script setup>
import ProductCard from '~/components/home/ProductCard.vue';
import Pagination from '~/components/common/Pagination.vue';
import BestProposition from '~/components/common/BestProposition.vue';

const route = useRoute()
const categoryName = route.params.name;

const currentPage = ref(1)
const productsPerPage = ref(12);
const categoryData = ref(null);



const categoryId = computed(() => {
  return categoryData.value?.categoryId
})

const [productsResult, paginationResult] = await Promise.all([
  useFetch('/api/get-productsList', {
    server: true, 
    key: `products-${categoryName}`,
    query: {
      categoryId: categoryId.value,
      sortBy: "popular",
      limit: productsPerPage.value.toString(),
      offset: computed(() => ((currentPage.value - 1) * productsPerPage.value).toString()),
      filter: JSON.stringify({
        filter1: null,
        filter2: null
      })
    }
  }),
  useFetch('/api/pagination-category', {
    server: true, 
    key: `pagination-${categoryName}`,
    query: {
      categoryName: categoryName
    }
  })
])

if (productsResult.error.value) {
  console.error('Products error (SSR):', productsResult.error.value)
}

if (paginationResult.error.value) {
  console.error('Pagination error (SSR):', paginationResult.error.value)
}

const products = computed(() => productsResult.data.value || [])
const totalProducts = computed(() => paginationResult.data.value?.totalProductCount || 100)

const handlePageChange = async (page) => {
  currentPage.value = page
  
  await productsResult.refresh()
}

onMounted(() => {
  if (history.state && history.state.categoryId) {
    categoryData.value = history.state
  }
})

watch(categoryData, async (newCategoryData) => {
  if (newCategoryData && newCategoryData.categoryId) {
    await productsResult.refresh()
  }
}, { deep: true })

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
  color: var(--blue-800);
  font-weight: var(--font-medium);
}

.path span:last-child {
  color: var(--grey-400);
}

.title {
  color: var(--primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: 24px;
}

.filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1C1C1C;
  font-weight: var(--font-semibold);
  margin-bottom: 16px;
}

.filter-container__leftside {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter-container__leftside .selected-sorted {
  background: #E6F7FF;
  border-radius: 12px;
  padding: 4px 20px;
  gap: 8px;
  display: flex;
  align-items: center;
}


.filter-container__rightside {
  display: flex;
  align-items: center;
  gap: 4px;
}

.filter-container__rightside-item {
  background: #E6F7FF;
  border-radius: 12px;
  padding: 4px 20px;
  gap: 4px;
  display: flex;
  align-items: center;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 32px;
}

.pagination-container {
  margin-top: 32px;
  margin-bottom: 120px;
}

@media screen and (max-width: 1145px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-card{
    max-width: unset;
  }
}

@media screen and (max-width: 768px) {
  .products-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }

  .pagination-container {
    margin-top: 24px;
    margin-bottom: 64px;
  }

  .title {
    color: var(--primary);
    font-size: var(--text-md);
  }
  .filter-container__leftside .selected-sorted {
    display: none;
  }

  .filter-container__rightside-item{
    font-size: var(--text-xxs);
  }
}
</style>
