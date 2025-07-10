<template>
  <div class="container">
    <Transition name="filter-slide">
      <FilterBar 
        v-if="showFilter" 
        class="filter-bar-animated"
        @apply-filters="handleApplyFilters"
        @close-filter="closeFilter"
      />
    </Transition>
    <div class="container-md">
      <div class="path">
            <span @click="navigateTo('/categories')">Categories</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
            <span>{{ categoryName }}</span>
      </div>
      <div class="title">{{ categoryName }}</div>
      <div class="filter-container">
        <div class="filter-container__leftside">
          <div 
            @click="toggleFilter"
            class="filter-icon"
            :class="{ 'active': showFilter }"
          >
            <img 
              v-if="!showFilter"
              src="~/assets/img/filter.svg" 
              alt="Filter"
            >
            <svg 
              v-else
              width="28" 
              height="25" 
              viewBox="0 0 28 25" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_138_599)">
                <path d="M0.682568 1.57344C0.991942 0.917187 1.64819 0.5 2.37476 0.5H22.6248C23.3513 0.5 24.0076 0.917187 24.3169 1.57344C24.6263 2.22969 24.5326 3.00313 24.0732 3.56563L19.081 9.66875C15.3216 10.4422 12.4998 13.7656 12.4998 17.75C12.4998 19.0344 12.7951 20.2531 13.3201 21.3359C13.2451 21.2984 13.1701 21.2516 13.0998 21.2L10.0998 18.95C9.72007 18.6688 9.49975 18.2234 9.49975 17.75V14.0422L0.92163 3.56094C0.466943 3.00313 0.368505 2.225 0.682568 1.57344ZM20.7498 11C22.54 11 24.2569 11.7112 25.5227 12.977C26.7886 14.2429 27.4998 15.9598 27.4998 17.75C27.4998 19.5402 26.7886 21.2571 25.5227 22.523C24.2569 23.7888 22.54 24.5 20.7498 24.5C18.9595 24.5 17.2427 23.7888 15.9768 22.523C14.7109 21.2571 13.9998 19.5402 13.9998 17.75C13.9998 15.9598 14.7109 14.2429 15.9768 12.977C17.2427 11.7112 18.9595 11 20.7498 11ZM23.5294 16.0297C23.8201 15.7391 23.8201 15.2609 23.5294 14.9703C23.2388 14.6797 22.7607 14.6797 22.4701 14.9703L20.7498 16.6906L19.0294 14.9703C18.7388 14.6797 18.2607 14.6797 17.9701 14.9703C17.6794 15.2609 17.6794 15.7391 17.9701 16.0297L19.6904 17.75L17.9701 19.4703C17.6794 19.7609 17.6794 20.2391 17.9701 20.5297C18.2607 20.8203 18.7388 20.8203 19.0294 20.5297L20.7498 18.8094L22.4701 20.5297C22.7607 20.8203 23.2388 20.8203 23.5294 20.5297C23.8201 20.2391 23.8201 19.7609 23.5294 19.4703L21.8091 17.75L23.5294 16.0297Z" fill="#1080E5"/>
              </g>
              <defs>
                <clipPath id="clip0_138_599">
                  <rect width="27" height="24" fill="white" transform="translate(0.5 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="selected-sorted" @click="toggleSortDropdown">
            <span>{{ selectedSort || 'Sort by average rating' }}</span>
            <img 
              src="~/assets/img/arrow-sort.svg" 
              alt="Arrow"
              :class="{ 'rotated': showSortDropdown }"
            >
            <div v-show="showSortDropdown" class="sort-dropdown">
              <div 
                v-for="option in sortOptions" 
                :key="option"
                class="sort-option"
                :class="{ 'selected': selectedSort === option }"
                @click.stop="selectSort(option)"
              >
                {{ option }}
              </div>
            </div>
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
  </div>
</template>

<script setup>
import ProductCard from '~/components/home/ProductCard.vue';
import Pagination from '~/components/common/Pagination.vue';
import BestProposition from '~/components/common/BestProposition.vue';
import FilterBar from '~/components/common/FilterBar.vue';

const route = useRoute()
const categoryName = route.params.name;

const currentPage = ref(1)
const productsPerPage = ref(12);
const categoryData = ref(null);
const showFilter = ref(false);
const showSortDropdown = ref(false);
const selectedSort = ref('Sort by average rating');
const sortOptions = ref([
  'Sort by average rating',
  'Newest',
  'Oldest', 
  'Price: Low to High',
  'Price: High to Low',
  'Rating: High to Low',
  'Rating: Low to High'
]);



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

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const handleApplyFilters = (filters) => {
  console.log('Applied filters:', filters)
}

const closeFilter = () => {
  showFilter.value = false
}

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value
}

const selectSort = (option) => {
  selectedSort.value = option
  showSortDropdown.value = false
  console.log('Selected sort:', option)
}

onMounted(() => {
  if (history.state && history.state.categoryId) {
    categoryData.value = history.state
  }
  
  document.addEventListener('click', (event) => {
    const sortDropdown = document.querySelector('.selected-sorted')
    if (sortDropdown && !sortDropdown.contains(event.target)) {
      showSortDropdown.value = false
    }
  })
})

watch(categoryData, async (newCategoryData) => {
  if (newCategoryData && newCategoryData.categoryId) {
    await productsResult.refresh()
  }
}, { deep: true })

</script>

<style scoped>
.container {
  position: relative;
}

.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: all 0.3s ease;
}

.filter-slide-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.filter-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.filter-icon {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-icon:hover {
  background: #E6F7FF;
  transform: scale(1.1);
}

.filter-icon.active {
  background: #E6F7FF;
}

.filter-icon img,
.filter-icon svg {
  transition: all 0.3s ease;
}
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
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.filter-container__leftside .selected-sorted:hover {
  background: #d1f0ff;
}

.filter-container__leftside .selected-sorted img {
  transition: transform 0.3s ease;
}

.filter-container__leftside .selected-sorted img.rotated {
  transform: rotate(180deg);
}

.sort-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.sort-option {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.sort-option:hover {
  background: #f8f9fa;
  color: #333;
}

.sort-option.selected {
  background: #007bff;
  color: white;
}

.sort-option.selected:hover {
  background: #0056b3;
  color: white;
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
