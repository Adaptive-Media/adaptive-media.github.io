<template>
  <div class="category-card" @click="goToCategory">
    <img :src="category.imageUrl" alt="">
    <span>{{ category.name }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
})

const goToCategory = async () => {
    const selectedCategory = useState('selectedCategory')
    selectedCategory.value = {
        categoryId: props.category.id,
        categoryData: props.category
    }
    
    console.log('Setting selectedCategory:', selectedCategory.value)
    
    await navigateTo(`/categories/${props.category.name}`, {
        state: {
            categoryId: props.category.id,
            categoryData: props.category
        }
    })
}
</script>

<style scoped>
.category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid var(--grey-100);
    border-radius: var(--rounded-md);
    max-width: 296px;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    transition: box-shadow 0.3s ease;
}

.category-card:hover {
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);
}

.category-card:hover img {
    transform: scale(1.05);
}

.category-card img {
    max-height: 162px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.category-card span {
    background: var(--grey-100);
    width: 100%;
    padding: 24px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    color: var(--primary);
    text-align: center;
    height: 100%;
}

@media screen and (max-width: 768px) {
    .category-card {
        max-width: 100%;
    }
}

@media screen and (max-width: 576px) {
    .category-card img {
        max-height: 140px;
    }
}

@media screen and (max-width: 400px) {
    .category-card img {
        max-height: 180px;
    }

}
</style>