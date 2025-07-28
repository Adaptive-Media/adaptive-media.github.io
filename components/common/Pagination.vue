<template>
  <div class="pagination" v-if="totalPages > 1">
    <!-- First page button -->
    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === 1"
      @click="goToPage(1)"
      title="First page"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Previous page button -->
    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
      title="Previous page"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <template v-for="item in paginationItems" :key="item.key">
      <button
        class="pagination__btn"
        :class="{ 'pagination__btn--active': currentPage === item.value }"
        @click="goToPage(item.value)"
      >
        {{ item.value }}
      </button>
    </template>

    <!-- Next page button -->
    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      title="Next page"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Last page button -->
    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
      title="Last page"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  totalProducts: {
    type: Number,
    required: true
  },
  productsPerPage: {
    type: Number,
    default: 8
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => Math.ceil(props.totalProducts / props.productsPerPage))

const paginationItems = computed(() => {
  const items = []
  const total = totalPages.value
  const current = props.currentPage
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      items.push({
        type: 'page',
        value: i,
        key: `page-${i}`
      })
    }
  } else {
    let start = Math.max(1, current - 2)
    let end = Math.min(total, current + 2)
    
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(total, start + 4)
      } else {
        start = Math.max(1, end - 4)
      }
    }
    
    for (let i = start; i <= end; i++) {
      items.push({
        type: 'page',
        value: i,
        key: `page-${i}`
      })
    }
  }
  
  return items
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
 border: 0.738px solid var(--grey-400);


  border-radius: 4px;
  background: var(--color-white);
  color: var(--primary);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}


.pagination__btn--active {
  background: var(--grey-100);
  border-color: var(--blue-400);
  color: var(--primary);
}

.pagination__btn--active:hover {
    background: var(--grey-100);
  border-color: var(--blue-400);
  color: var(--primary);
}

.pagination__btn:disabled {
  cursor: not-allowed;
}

.pagination__btn--arrow {
  padding: 0;
}

.pagination__btn--arrow svg {
  width: 16px;
  height: 16px;
}



@media (max-width: 768px) {
  .pagination {
    gap: 4px;
  }
  
  .pagination__btn {
    width: 40px;
    height: 40px;
    font-size: var(--text-sm);
  }
  

}
</style> 