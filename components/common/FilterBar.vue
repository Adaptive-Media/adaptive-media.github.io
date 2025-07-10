<template>
    <div class="filter-bar">
        <div class="filter-bar-container">
            <div class="close-btn" @click="closeFilter">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.059 3.05938C15.6449 2.47344 15.6449 1.52188 15.059 0.935938C14.473 0.35 13.5215 0.35 12.9355 0.935938L7.99961 5.87656L3.05898 0.940625C2.47305 0.354688 1.52148 0.354688 0.935547 0.940625C0.349609 1.52656 0.349609 2.47813 0.935547 3.06406L5.87617 8L0.940234 12.9406C0.354297 13.5266 0.354297 14.4781 0.940234 15.0641C1.52617 15.65 2.47773 15.65 3.06367 15.0641L7.99961 10.1234L12.9402 15.0594C13.5262 15.6453 14.4777 15.6453 15.0637 15.0594C15.6496 14.4734 15.6496 13.5219 15.0637 12.9359L10.123 8L15.059 3.05938Z" fill="#8B96A5"/>
                </svg>
            </div>

            <div class="filter-bar-item  sort">
                <div class="filter-bar-item-title">
                    <span>Sort</span>
                </div>
                <div class="filter-bar-item-content">
                    <div class="dropdown-item">
                        <div class="dropdown-header" @click="toggleDropdown('sortBy')">
                            <span>{{ getSelectedText('sortBy') || 'Sort By' }}</span>
                            <svg class="dropdown-arrow" :class="{ 'rotated': openDropdowns.sortBy }" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div v-show="openDropdowns.sortBy" class="dropdown-content">
                            <div 
                                v-for="option in dropdownOptions.sortBy" 
                                :key="option"
                                class="dropdown-option"
                                :class="{ 'selected': selectedOptions.sortBy === option }"
                                @click="selectOption('sortBy', option)"
                            >
                                {{ option }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-bar-item">
                <div class="filter-bar-item-title">
                    <span>General</span>
                </div>
                <div class="filter-bar-item-content">
                    <div class="dropdown-item">
                        <div class="dropdown-header" @click="toggleDropdown('petSupplies')">
                            <span>{{ getSelectedText('petSupplies') || 'Pet Supplies' }}</span>
                            <svg class="dropdown-arrow" :class="{ 'rotated': openDropdowns.petSupplies }" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div v-show="openDropdowns.petSupplies" class="dropdown-content">
                            <div 
                                v-for="option in dropdownOptions.petSupplies" 
                                :key="option"
                                class="dropdown-option"
                                :class="{ 'selected': selectedOptions.petSupplies === option }"
                                @click="selectOption('petSupplies', option)"
                            >
                                {{ option }}
                            </div>
                        </div>
                    </div>

                    <div class="dropdown-item">
                        <div class="dropdown-header" @click="toggleDropdown('kitchenGadgets')">
                            <span>{{ getSelectedText('kitchenGadgets') || 'Kitchen Gadgets' }}</span>
                            <svg class="dropdown-arrow" :class="{ 'rotated': openDropdowns.kitchenGadgets }" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div v-show="openDropdowns.kitchenGadgets" class="dropdown-content">
                            <div 
                                v-for="option in dropdownOptions.kitchenGadgets" 
                                :key="option"
                                class="dropdown-option"
                                :class="{ 'selected': selectedOptions.kitchenGadgets === option }"
                                @click="selectOption('kitchenGadgets', option)"
                            >
                                {{ option }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-bar-item">
                <div class="filter-bar-item-title">
                    <span>Price range</span>
                </div>
                <div class="filter-bar-item-content">
                    <div class="price-range">
                        <div class="range-slider">
                            <div class="range-track">
                                <div class="range-fill" :style="{ left: minPercent + '%', width: (maxPercent - minPercent) + '%' }"></div>
                            </div>
                            <input
                                type="range"
                                :min="priceRange.min"
                                :max="priceRange.max"
                                v-model="selectedPriceRange.min"
                                class="range-input range-min"
                                @input="updatePriceRange"
                            />
                            <input
                                type="range"
                                :min="priceRange.min"
                                :max="priceRange.max"
                                v-model="selectedPriceRange.max"
                                class="range-input range-max"
                                @input="updatePriceRange"
                            />
                        </div>
                        <div class="price-inputs">
                            <div class="price-input-group">
                                <label>Min</label>
                                <input 
                                    type="text" 
                                    v-model="formattedMinPrice"
                                    @input="updateMinPrice"
                                    class="price-input"
                                />
                            </div>
                            <div class="price-input-group">
                                <label>Max</label>
                                <input 
                                    type="text" 
                                    v-model="formattedMaxPrice"
                                    @input="updateMaxPrice"
                                    class="price-input"
                                />
                            </div>
                        </div>
                        <button class="apply-btn" @click="applyFilters">Apply</button>
                    </div>
                </div>
            </div>

            <div class="filter-bar-item">
                <div class="filter-bar-item-title">
                    <span>Pet type</span>
                </div>
                <div class="filter-bar-item-content">
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input 
                                type="checkbox" 
                                id="cat" 
                                v-model="petTypes.cat.selected"
                                class="checkbox-input"
                            />
                            <label for="cat" class="checkbox-label">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-text">Cat</span>
                                <span class="checkbox-count">({{ petTypes.cat.count }})</span>
                            </label>
                        </div>
                        <div class="checkbox-item">
                            <input 
                                type="checkbox" 
                                id="dog" 
                                v-model="petTypes.dog.selected"
                                class="checkbox-input"
                            />
                            <label for="dog" class="checkbox-label">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-text">Dog</span>
                                <span class="checkbox-count">({{ petTypes.dog.count }})</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-bar-item">
                <div class="filter-bar-item-title">
                    <span>Simple List</span>
                </div>
                <div class="filter-bar-item-content">
                    <div class="simple-list">
                        <div class="simple-list-item" v-for="item in simpleListItems" :key="item">
                            {{ item }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['apply-filters', 'close-filter'])

const openDropdowns = ref({
    petSupplies: false,
    kitchenGadgets: false,
    sortBy: false
})

const dropdownOptions = ref({
    petSupplies: ['Food', 'Toys', 'Accessories'],
    kitchenGadgets: ['Blenders', 'Cookware', 'Utensils'],
    sortBy: ['Newest', 'Oldest', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Rating: Low to High']
})

const selectedOptions = ref({
    petSupplies: null,
    kitchenGadgets: null,
    sortBy: null
})

const priceRange = ref({
    min: 0,
    max: 500
})

const selectedPriceRange = ref({
    min: 0,
    max: 500
})

const petTypes = ref({
    cat: {
        selected: true,
        count: 4
    },
    dog: {
        selected: false,
        count: 5
    }
})

const simpleListItems = ref([
    'Something in 3 words',
    'Something in 3 words',
    'Something in 3 words',
    'Something in 3 words',
    'Something in 3 words'
])

const formattedMinPrice = computed({
    get: () => `$${selectedPriceRange.value.min}`,
    set: (value) => {
        const num = parseInt(value.replace('$', '')) || 0
        selectedPriceRange.value.min = Math.max(priceRange.value.min, Math.min(num, selectedPriceRange.value.max))
    }
})

const formattedMaxPrice = computed({
    get: () => `$${selectedPriceRange.value.max}`,
    set: (value) => {
        const num = parseInt(value.replace('$', '')) || priceRange.value.max
        selectedPriceRange.value.max = Math.min(priceRange.value.max, Math.max(num, selectedPriceRange.value.min))
    }
})

const minPercent = computed(() => {
    return ((selectedPriceRange.value.min - priceRange.value.min) / (priceRange.value.max - priceRange.value.min)) * 100
})

const maxPercent = computed(() => {
    return ((selectedPriceRange.value.max - priceRange.value.min) / (priceRange.value.max - priceRange.value.min)) * 100
})

const toggleDropdown = (dropdown) => {
    openDropdowns.value[dropdown] = !openDropdowns.value[dropdown]
}

const selectOption = (dropdown, option) => {
    selectedOptions.value[dropdown] = option
    openDropdowns.value[dropdown] = false
}

const getSelectedText = (dropdown) => {
    return selectedOptions.value[dropdown]
}

const updatePriceRange = () => {
    if (selectedPriceRange.value.min > selectedPriceRange.value.max) {
        selectedPriceRange.value.min = selectedPriceRange.value.max
    }
    
    if (selectedPriceRange.value.max < selectedPriceRange.value.min) {
        selectedPriceRange.value.max = selectedPriceRange.value.min
    }

    selectedPriceRange.value.min = Math.max(priceRange.value.min, Math.min(selectedPriceRange.value.min, priceRange.value.max))
    selectedPriceRange.value.max = Math.min(priceRange.value.max, Math.max(selectedPriceRange.value.max, priceRange.value.min))
}

const updateMinPrice = (event) => {
    formattedMinPrice.value = event.target.value
}

const updateMaxPrice = (event) => {
    formattedMaxPrice.value = event.target.value
}

const applyFilters = () => {
    const filters = {
        general: {
            petSupplies: selectedOptions.value.petSupplies,
            kitchenGadgets: selectedOptions.value.kitchenGadgets
        },
        sortBy: selectedOptions.value.sortBy,
        priceRange: {
            min: selectedPriceRange.value.min,
            max: selectedPriceRange.value.max
        },
        petTypes: {
            cat: petTypes.value.cat.selected,
            dog: petTypes.value.dog.selected
        },
        simpleList: simpleListItems.value
    }
    
    emit('apply-filters', filters)
}

const closeFilter = () => {
    emit('close-filter')
}
</script>

<style scoped>
.filter-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 2;
    max-width: 310px;
    width: 100%;
    padding: 45px 24px 0 35px;
    display: flex;
    flex-direction: column;
    padding-top: 45px;
    background: var(--color-white);
}

.filter-bar-container {
    position: relative;
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    background: #f8f9fa;
    transform: scale(1.1);
}

.filter-bar-item {
    margin-bottom: 50px;
}

.filter-bar-item.sort {
    display: none;
}

.filter-bar-item-title {
    color: var(--primary);
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    margin-bottom: 15px;
}

.filter-bar-item-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.dropdown-item {
    border: 1px solid #8B96A5;
    border-radius: 6px;
    position: relative;
}

.dropdown-header {
    padding: 15px;
    color: var(--primary);
    font-weight: var(--font-medium);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dropdown-header:hover {
    background: #e9ecef;
}

.dropdown-arrow {
    transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

.dropdown-content {
    padding: 8px 0;
    background: white;
    border-top: 1px solid #ddd;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #8B96A5;
    border-radius: 6px;
    z-index: 3;
}

.dropdown-option {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s ease;
}

.dropdown-option:hover {
    background: #f8f9fa;
    color: #333;
}

.dropdown-option.selected {
    background: #007bff;
    color: white;
}

.dropdown-option.selected:hover {
    background: #0056b3;
    color: white;
}

.price-range {
    display: flex;
    flex-direction: column;
}

.range-slider {
    position: relative;
    height: 20px;
}

.range-track {
    position: absolute;
    width: 100%;
    height: 6px;
    background: #ddd;
    border-radius: 3px;
    top: 7px;
}

.range-fill {
    position: absolute;
    height: 6px;
    background: #333;
    border-radius: 3px;
    top: 0;
}

.range-input {
    position: absolute;
    width: 100%;
    height: 20px;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    top: 0;
}

.range-input.range-min {
    z-index: 2;
}

.range-input.range-max {
    z-index: 1;
}

.range-input::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
    border: none;
    pointer-events: all;
    -webkit-appearance: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.1s ease;
}

.range-input::-webkit-slider-thumb:hover {
    transform: scale(1.1);
}

.range-input::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
    border: none;
    pointer-events: all;
    -moz-appearance: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.1s ease;
}

.range-input::-moz-range-thumb:hover {
    transform: scale(1.1);
}

.price-inputs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 11px;
}

.price-input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 15px;
}

.price-input-group label {
    font-size: 14px;
    color: #666;
    font-weight: 500;
}

.price-input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    color: #666;
    max-width: 120px;
    width: 100%;
}

.price-input:focus {
    outline: none;
    border-color: #007bff;
}

.apply-btn {
    border: 1px solid var(--blue-400);
    width: 100%;
    border-radius: 6px;
    height: 45px;
    color: var(--blue-400);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    transition: all 0.3s ease;
    cursor: pointer;
}

.apply-btn:hover {
    background: var(--blue-400);
    color: var(--color-white);
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.checkbox-item {
    display: flex;
    align-items: center;
}

.checkbox-input {
    display: none;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 18px;
    cursor: pointer;
    width: 100%;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--primary);
}

.checkbox-custom {
    width: 24px;
    height: 24px;
    border: 2px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom {
    background: #007bff;
    border-color: #007bff;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
}

.checkbox-count {
    margin-left: auto;
    color: #8B96A5;
}

.simple-list {
    display: flex;
    flex-direction: column;
}

.simple-list-item {
    color: var(--primary);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    text-decoration-line: underline;
    margin-bottom: 8px;
    cursor: pointer;
}

.simple-list-item:hover {
    color: #333;
}

@media (min-width: 1920px) {
    .close-btn {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .filter-bar {
        position: fixed;
        overflow-y: scroll;
    }

    .filter-bar-item.sort {
        display: block;
    }
}


@media screen and (max-width: 600px) {
    .filter-bar {
        max-width: unset;
        width: 100%;
        height: 100%;
        z-index: 1000;
        padding: 20px;
    }
}
</style>