<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <template v-for="item in paginationItems" :key="item.key">
      <button
        v-if="item.type === 'page'"
        class="pagination__btn"
        :class="{ 'pagination__btn--active': currentPage === item.value }"
        @click="goToPage(item.value)"
      >
        {{ item.value }}
      </button>
      
      <span 
        v-else-if="item.type === 'dots'"
        class="pagination__dots"
      >
        ...
      </span>
    </template>

    <button 
      class="pagination__btn pagination__btn--arrow" 
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      items.push({
        type: 'page',
        value: i,
        key: `page-${i}`
      })
    }
  } else {
    items.push({
      type: 'page',
      value: 1,
      key: 'page-1'
    })
    
    if (current <= 3) {
      for (let i = 2; i <= 3; i++) {
        items.push({
          type: 'page',
          value: i,
          key: `page-${i}`
        })
      }
      
      items.push({
        type: 'dots',
        key: 'dots-right'
      })
      
      items.push({
        type: 'page',
        value: total,
        key: `page-${total}`
      })
    } else if (current >= total - 2) {
      items.push({
        type: 'dots',
        key: 'dots-left'
      })
      
      for (let i = total - 2; i <= total; i++) {
        items.push({
          type: 'page',
          value: i,
          key: `page-${i}`
        })
      }
    } else {
      items.push({
        type: 'dots',
        key: 'dots-left'
      })
      
      items.push({
        type: 'page',
        value: current,
        key: `page-${current}`
      })
      
      items.push({
        type: 'dots',
        key: 'dots-right'
      })
      
      items.push({
        type: 'page',
        value: total,
        key: `page-${total}`
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

.pagination__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--grey-500);
  font-size: var(--text-md);
  font-weight: var(--font-medium);
  user-select: none;
}

/* Responsive */
@media (max-width: 768px) {
  .pagination {
    gap: 4px;
  }
  
  .pagination__btn {
    width: 40px;
    height: 40px;
    font-size: var(--text-sm);
  }
  
  .pagination__dots {
    width: 40px;
    height: 40px;
    font-size: var(--text-sm);
  }
}
</style> 