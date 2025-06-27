<template>
    <div class="container-md">
    <h1>{{ categoryName }}</h1>
    
    <!-- Отладка: показываем все данные -->
    <div style="border: 1px solid red; padding: 10px; margin: 10px 0;">
      <h3>Debug Info:</h3>
      <p>categoryData: {{ categoryData }}</p>
      <p>selectedCategory: {{ selectedCategory }}</p>
    </div>
    
    <div v-if="categoryData && categoryData.categoryId">
      <h2>Data from state:</h2>
      <p>Название: {{ categoryData.categoryData?.name }}</p>
      <img v-if="categoryData.categoryData?.imageUrl" 
           :src="categoryData.categoryData.imageUrl" 
           alt=""
           style="max-width: 200px;">
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  
  async setup() {
    const route = useRoute()
    const router = useRouter()
    
    const categoryData = ref(null)
    
    onMounted(() => {
      if (history.state && history.state.categoryId) {
        categoryData.value = history.state
      }
    })
    
    const selectedCategory = useState('selectedCategory', () => null)
    
    return {
      categoryData,
      selectedCategory,
      categoryName: route.params.name
    }
  },
  
  methods: {
    async loadCategoryData() {
      try {
        const response = await $fetch(`/api/category/${this.categoryName}`)
        console.log('Category data loaded:', response)
      } catch (error) {
        console.error('Error loading category:', error)
      }
    }
  }
}
</script>
