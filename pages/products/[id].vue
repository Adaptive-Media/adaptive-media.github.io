<template>
    <div class="container-md">
        <div v-if="product" class="path">
            <span @click="navigateTo('/categories')">Categories</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
            <span @click="handleCategoryNavigation">{{ product.categoryName || 'Category' }}</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
            <span>{{ product.title }}</span>
        </div>

        <div v-if="product" class="product-info">
            <div class="photos-container">
                <div class="active-photo">
                    <img :src="activeImage" alt="Product Image" class="main-image">
                </div>
                <div class="photos-list">
                    <div class="photo-item" :class="{ 'active': index === activeImageIndex }"
                        v-for="(image, index) in product.imageVariantUrls" :key="image"
                        @click="changeActiveImage(index)">
                        <img :src="image" alt="">
                    </div>
                </div>
            </div>
            <div class="product-details-container">
                <div class="product-title">{{ product.title }}</div>
                <div class="main-photo mobile">
                    <img :src="activeImage" alt="">
                </div>
                <div class="product-benefits">
                    <div class="item">
                        <img src="~/assets/img/star.svg" alt="">
                        <span>{{ product.rating }}</span>
                    </div>
                    <div class="item">
                        <img src="~/assets/img/reviews.svg" alt="">
                        <span>{{ product.reviewCount }}</span>
                    </div>
                    <div class="item">
                        <img src="~/assets/img/indicator.svg" alt="">
                        <span>Indicator</span>
                    </div>
                    <div class="item">
                        <img src="~/assets/img/price.svg" alt="">
                        <span>Price</span>
                    </div>
                    <div class="item adv-tooltip">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_157_1688)">
                                <path
                                    d="M6.5 12.5C8.0913 12.5 9.61742 11.8679 10.7426 10.7426C11.8679 9.61742 12.5 8.0913 12.5 6.5C12.5 4.9087 11.8679 3.38258 10.7426 2.25736C9.61742 1.13214 8.0913 0.5 6.5 0.5C4.9087 0.5 3.38258 1.13214 2.25736 2.25736C1.13214 3.38258 0.5 4.9087 0.5 6.5C0.5 8.0913 1.13214 9.61742 2.25736 10.7426C3.38258 11.8679 4.9087 12.5 6.5 12.5ZM5.5625 8.375H6.125V6.875H5.5625C5.25078 6.875 5 6.62422 5 6.3125C5 6.00078 5.25078 5.75 5.5625 5.75H6.6875C6.99922 5.75 7.25 6.00078 7.25 6.3125V8.375H7.4375C7.74922 8.375 8 8.62578 8 8.9375C8 9.24922 7.74922 9.5 7.4375 9.5H5.5625C5.25078 9.5 5 9.24922 5 8.9375C5 8.62578 5.25078 8.375 5.5625 8.375ZM6.5 3.5C6.69891 3.5 6.88968 3.57902 7.03033 3.71967C7.17098 3.86032 7.25 4.05109 7.25 4.25C7.25 4.44891 7.17098 4.63968 7.03033 4.78033C6.88968 4.92098 6.69891 5 6.5 5C6.30109 5 6.11032 4.92098 5.96967 4.78033C5.82902 4.63968 5.75 4.44891 5.75 4.25C5.75 4.05109 5.82902 3.86032 5.96967 3.71967C6.11032 3.57902 6.30109 3.5 6.5 3.5Z" />
                            </g>
                            <defs>
                                <clipPath id="clip0_157_1688">
                                    <rect width="12" height="13" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Advertising Disclosure</span>
                        <div class="tooltip-content">
                            <div class="tooltip-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-description">
                    <span>{{ displayedDescription }}</span>
                    <div v-if="needsShowMoreButton" class="show-more" @click="toggleDescription">
                        <span>{{ showMoreButtonText }}</span>
                        <img src="~/assets/img/more-arrow.svg" alt="">
                    </div>
                </div>

                <div class="product-compare-container">
                    <div class="compare-provider-info">
                        <div class="provider-img-container">
                            <img class="provider-img" v-if="product.provider === 'Amazon'"
                                src="~/assets/img/merchants/amazon.svg" alt="">
                            <img class="provider-img" v-if="product.provider === 'Ebay'"
                                src="~/assets/img/merchants/ebay.svg" alt="">
                        </div>

                        <div class="price-item mobile">
                            <div class="old-price">
                                <span>{{ formatPrice(product.priceBaseAmount, product.priceCurrency) }}</span>
                            </div>
                            <div class="new-price">
                                <span>{{ formatPrice(product.priceAmount, product.priceCurrency) }}</span>
                            </div>
                        </div>

                        <div class="additional-bonuses">
                            <div class="item">
                                <img src="data:image/svg+xml,%3Csvg width='15' height='17' viewBox='0 0 15 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_68_4364)'%3E%3Cpath d='M0.5 3V7.67187C0.5 8.20312 0.709375 8.7125 1.08438 9.0875L6.58438 14.5875C7.36563 15.3687 8.63125 15.3687 9.4125 14.5875L13.5844 10.4156C14.3656 9.63437 14.3656 8.36875 13.5844 7.5875L8.08438 2.0875C7.70938 1.7125 7.2 1.50312 6.66875 1.50312L2 1.5C1.17188 1.5 0.5 2.17187 0.5 3ZM4 4C4.26522 4 4.51957 4.10536 4.70711 4.29289C4.89464 4.48043 5 4.73478 5 5C5 5.26522 4.89464 5.51957 4.70711 5.70711C4.51957 5.89464 4.26522 6 4 6C3.73478 6 3.48043 5.89464 3.29289 5.70711C3.10536 5.51957 3 5.26522 3 5C3 4.73478 3.10536 4.48043 3.29289 4.29289C3.48043 4.10536 3.73478 4 4 4Z' fill='%238B96A5'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_68_4364'%3E%3Crect width='14' height='16' fill='white' transform='translate(0.5 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                                    alt="">
                                <span>Best Price</span>
                            </div>
                            <div class="item">
                                <img src="data:image/svg+xml,%3Csvg width='21' height='17' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_68_4368)'%3E%3Cpath d='M4 0.5C3.17188 0.5 2.5 1.17188 2.5 2V3.5H1C0.725 3.5 0.5 3.725 0.5 4C0.5 4.275 0.725 4.5 1 4.5H2.5H9C9.275 4.5 9.5 4.725 9.5 5C9.5 5.275 9.275 5.5 9 5.5H2.5H2C1.725 5.5 1.5 5.725 1.5 6C1.5 6.275 1.725 6.5 2 6.5H2.5H8C8.275 6.5 8.5 6.725 8.5 7C8.5 7.275 8.275 7.5 8 7.5H2.5H1C0.725 7.5 0.5 7.725 0.5 8C0.5 8.275 0.725 8.5 1 8.5H2.5H7C7.275 8.5 7.5 8.725 7.5 9C7.5 9.275 7.275 9.5 7 9.5H2.5V13.5C2.5 15.1562 3.84375 16.5 5.5 16.5C7.15625 16.5 8.5 15.1562 8.5 13.5H12.5C12.5 15.1562 13.8438 16.5 15.5 16.5C17.1562 16.5 18.5 15.1562 18.5 13.5H19.5C20.0531 13.5 20.5 13.0531 20.5 12.5C20.5 11.9469 20.0531 11.5 19.5 11.5V9.5V8.5V7.91563C19.5 7.38438 19.2906 6.875 18.9156 6.5L16.5 4.08437C16.125 3.70937 15.6156 3.5 15.0844 3.5H13.5V2C13.5 1.17188 12.8281 0.5 12 0.5H4ZM17.5 7.91563V8.5H13.5V5.5H15.0844L17.5 7.91563ZM5.5 12C5.89782 12 6.27936 12.158 6.56066 12.4393C6.84196 12.7206 7 13.1022 7 13.5C7 13.8978 6.84196 14.2794 6.56066 14.5607C6.27936 14.842 5.89782 15 5.5 15C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5C4 13.1022 4.15804 12.7206 4.43934 12.4393C4.72064 12.158 5.10218 12 5.5 12ZM14 13.5C14 13.1022 14.158 12.7206 14.4393 12.4393C14.7206 12.158 15.1022 12 15.5 12C15.8978 12 16.2794 12.158 16.5607 12.4393C16.842 12.7206 17 13.1022 17 13.5C17 13.8978 16.842 14.2794 16.5607 14.5607C16.2794 14.842 15.8978 15 15.5 15C15.1022 15 14.7206 14.842 14.4393 14.5607C14.158 14.2794 14 13.8978 14 13.5Z' fill='%238B96A5'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_68_4368'%3E%3Crect width='20' height='16' fill='white' transform='translate(0.5 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
                                    alt="">
                                <span>Free Shipping</span>
                            </div>
                        </div>
                    </div>
                    <div class="compare-price-info">
                        <div class="price-item">
                            <div class="old-price">
                                <span>{{ formatPrice(product.priceBaseAmount, product.priceCurrency) }}</span>
                            </div>
                            <div class="new-price">
                                <span>{{ formatPrice(product.priceAmount, product.priceCurrency) }}</span>
                            </div>
                        </div>
                        <a :href="product.productUrl" target="_blank" class="see-on-provider">See on {{ product.provider
                            }}</a>
                    </div>
                </div>

                <div class="additional-info-section mobile">
                    <div class="visible">
                        <div class="description-show" @click="displayDescriptionMobile = !displayDescriptionMobile">
                            <div>{{ displayDescriptionMobile ? 'Hide Description' : 'Show Description' }}</div>
                            <img src="~/assets/img/more-arrow.svg" alt=""
                                :style="{ transform: displayDescriptionMobile ? 'rotate(180deg)' : 'rotate(0deg)' }">
                        </div>
                        <div class="info" @click="showDetailsModal = true">
                            <img src="~/assets/img/info.svg" alt="">
                            <span>Info</span>
                        </div>
                    </div>

                    <div class="description-mobile" v-if="displayDescriptionMobile">
                        <span>{{ product.description }}</span>
                    </div>
                </div>

                <div class="price-range-container">
                    <div class="labels">
                        <div class="label">The lowest</div>
                        <div class="label">The highest</div>
                    </div>
                    <div class="slider">
                        <div class="slider-range">
                            <div class="slider-thumb">{{ formatPrice(product.priceRange.minPrice, product.priceCurrency)
                                }}</div>
                            <div class="slider-thumb">{{ formatPrice(product.priceRange.maxPrice, product.priceCurrency)
                                }}</div>
                        </div>
                    </div>
                </div>


            </div>


        </div>

        <div class="additional-info-container">
            <div class="tabs-container">
                <div class="tab" :class="{ 'active': activeTab === 'prices' }" @click="activeTab = 'prices'">Prices</div>
                <div class="tab" :class="{ 'active': activeTab === 'details' }" @click="activeTab = 'details'">Details
                </div>
                <div class="tab" :class="{ 'active': activeTab === 'description' }" @click="activeTab = 'description'">
                    Description</div>
            </div>
            <div class="product-section-details" v-if="activeTab === 'prices'">
                <div class="table-header">
                    <div class="header-item">Store</div>
                    <div class="header-item">Product</div>
                    <div class="header-item">Condition</div>
                    <div class="header-item">Shipping</div>
                    <div class="header-item">Price</div>
                    <div class="sort-selection" @click="sortByBestPrice">
                        <span>{{ sortDirection === 'asc' ? 'Sort by best price' : 'Sort by best price' }}</span>
                        <svg :style="{ transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)' }"
                            width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'rotate-180': sortDirection === 'desc' }">
                            <path
                                d="M10.59 0.794983L6 5.37498L1.41 0.794983L0 2.20498L6 8.20498L12 2.20498L10.59 0.794983Z"
                                fill="#313131" />
                        </svg>
                    </div>
                </div>
                <div class="compare-cards-container">
                    <CompareCard v-for="(comparePrice, index) in product.comparePrices"
                        :key="`${comparePrice.provider}-${index}`" :product="comparePrice" />
                </div>
            </div>
            <div class="product-section-details" v-if="activeTab === 'details'">
                <div class="details-container">
                    <div class="title">General Information</div>
                    <div class="details-item">
                        <span>Name</span>
                        <span>{{ product.title }}</span>
                    </div>
                    <div class="details-item">
                        <span>Brand</span>
                        <span>{{ product.brand }}</span>
                    </div>
                    <div class="details-item">
                        <span>Category</span>
                        <span>{{ product.categoryName }}</span>
                    </div>
                </div>
                <div class="details-container">
                    <div class="title">Color</div>
                    <div class="details-item">
                        <span>Color</span>
                        <span>{{ product.colorText }}</span>
                    </div>

                </div>
                <div class="details-container">
                    <div class="title">Size</div>
                    <div class="details-item">
                        <span>Size</span>
                        <span>{{ product.extraDataJson.Size.DisplayValue }}</span>
                    </div>
                    <div class="details-item">
                        <span>Width</span>
                        <span>{{ product.extraDataJson.ItemDimensions.Width.DisplayValue }} {{
                            product.extraDataJson.ItemDimensions.Width.Unit }}</span>
                    </div>
                    <div class="details-item">
                        <span>Height</span>
                        <span>{{ product.extraDataJson.ItemDimensions.Height.DisplayValue }} {{
                            product.extraDataJson.ItemDimensions.Height.Unit }}</span>
                    </div>
                    <div class="details-item">
                        <span>Length</span>
                        <span>{{ product.extraDataJson.ItemDimensions.Length.DisplayValue }} {{
                            product.extraDataJson.ItemDimensions.Length.Unit }}</span>
                    </div>
                    <div class="details-item">
                        <span>Weight</span>
                        <span>{{ parseFloat(product.extraDataJson.ItemDimensions.Weight.DisplayValue).toFixed(2) }} {{
                            product.extraDataJson.ItemDimensions.Weight.Unit }}</span>
                    </div>

                </div>
            </div>
            <div class="product-section-description" v-if="activeTab === 'description'">
                <div class="description-container">
                    <div class="description-title">{{ product.title }}</div>
                    <div class="description-text">{{ product.description }}</div>
                </div>
            </div>
        </div>

        <div class="related-products-container" v-if="relatedProducts.length > 0">
            <div class="title">Related <span>products</span></div>
            <div class="related-products-list">
                <div class="related-product-item" v-for="product in relatedProducts" :key="product.id">
                    <ProductCard :product="product" />
                </div>
            </div>
            <div class="related-pagination-container">
                <Pagination :total-products="totalRelatedProducts" :products-per-page="relatedProductsPerPage"
                    :current-page="currentRelatedPage" @page-change="handleRelatedPageChange" />
            </div>
        </div>

        <BestProposition />
        <div class="details-modal" :class="{ 'active': showDetailsModal }">
            <div class="white-container">
               
                <div class="list-item-container">
                    <div class="close-btn" @click="hideDetailsModal">
                        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.059 7.05935C16.6449 6.47341 16.6449 5.52185 16.059 4.93591C15.473 4.34998 14.5215 4.34998 13.9355 4.93591L8.99961 9.87654L4.05898 4.9406C3.47305 4.35466 2.52148 4.35466 1.93555 4.9406C1.34961 5.52654 1.34961 6.4781 1.93555 7.06404L6.87617 12L1.94023 16.9406C1.3543 17.5265 1.3543 18.4781 1.94023 19.064C2.52617 19.65 3.47773 19.65 4.06367 19.064L8.99961 14.1234L13.9402 19.0594C14.5262 19.6453 15.4777 19.6453 16.0637 19.0594C16.6496 18.4734 16.6496 17.5219 16.0637 16.9359L11.123 12L16.059 7.05935Z"
                                fill="#8B96A5" />
                        </svg>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div>{{ product.rating }}</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div>{{ product.reviewCount }} Reviews</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div>Indicator</div>
                    </div>
                    <div class="item">
                        <div class="icon"></div>
                        <div>Price</div>
                    </div>
                    <div class="item adv" :class="{ active: displayDisclaimer }" @click="displayDisclaimer = !displayDisclaimer">
                        <div>
                            <div class="icon"></div>
                            <div>Advertising Disclosure</div>
                        </div>
                        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6551 0.64282C12.7208 0.576571 12.8103 0.539307 12.9036 0.539307C12.9969 0.539307 13.0864 0.576571 13.1521 0.64282L13.894 1.38471C13.9616 1.44821 14 1.53687 14 1.62967C14 1.72247 13.9616 1.81113 13.894 1.87463L7.46193 8.30666C7.36358 8.40513 7.23016 8.46051 7.09099 8.46063L6.90901 8.46063C6.76984 8.46051 6.63642 8.40513 6.53807 8.30666L0.106047 1.87463C0.0383834 1.81113 9.01957e-07 1.72247 9.06013e-07 1.62967C9.10069e-07 1.53687 0.0383834 1.44821 0.106047 1.38471L0.847934 0.64282C0.913642 0.57657 1.00309 0.539306 1.0964 0.539306C1.18971 0.539306 1.27915 0.57657 1.34486 0.64282L7 6.29796L12.6551 0.64282Z" fill="#101856"/>
                        </svg>
                    </div>
                </div>
                <transition name="accordion">
                <div class="disclaimer-container" v-if="displayDisclaimer">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import CompareCard from '~/components/product/CompareCard.vue'
import ProductCard from '~/components/home/ProductCard.vue'
import Pagination from '~/components/common/Pagination.vue'
import BestProposition from '~/components/common/BestProposition.vue'
const route = useRoute()
const productId = route.params.id
const activeTab = ref('prices')
const sortDirection = ref('asc')
const relatedProducts = ref([])

const currentRelatedPage = ref(1)
const relatedProductsPerPage = ref(6)
const totalRelatedProducts = ref(0)

let isMobile = ref(false)
const displayDescriptionMobile = ref(false)
const displayDisclaimer = ref(false)
const showDetailsModal = ref(false)

const { data: productData, error } = await useFetch('/api/get-product', {
    server: true,
    key: `product-${productId}`,
    query: {
        productId: productId
    }
})

if (error.value) {
    console.error('Product loading error:', error.value)
}

const product = computed(() => productData.value)

const activeImageIndex = ref(0)
const activeImage = computed(() => {
    if (!product.value || !product.value.imageVariantUrls) return ''
    return product.value.imageVariantUrls[activeImageIndex.value] || product.value.imagePrimaryUrl
})

const changeActiveImage = (index) => {
    if (index === activeImageIndex.value) return

    const mainImage = document.querySelector('.main-image')
    if (mainImage) {
        mainImage.style.opacity = '0'
        setTimeout(() => {
            activeImageIndex.value = index
            mainImage.style.opacity = '1'
        }, 150)
    } else {
        activeImageIndex.value = index
    }
}

const isDescriptionExpanded = ref(false)
const maxDescriptionLength = 455

const displayedDescription = computed(() => {
    if (!product.value?.description) return ''

    const description = product.value.description
    if (description.length <= maxDescriptionLength || isDescriptionExpanded.value) {
        return description
    }

    return description.substring(0, maxDescriptionLength) + '...'
})

const showMoreButtonText = computed(() => {
    return isDescriptionExpanded.value ? 'Show Less' : 'Show more'
})

const needsShowMoreButton = computed(() => {
    return product.value?.description && product.value.description.length > maxDescriptionLength
})

const toggleDescription = () => {
    isDescriptionExpanded.value = !isDescriptionExpanded.value
}

const handleCategoryNavigation = async () => {
    if (product.value && product.value.categoryName) {
        await navigateTo(`/categories/${product.value.categoryName}`, {
            state: {
                categoryId: product.value.categoryCode || product.value.id,
                categoryData: {
                    id: product.value.categoryCode || product.value.id,
                    name: product.value.categoryName,
                }
            }
        })
    }
}

const sortByBestPrice = () => {
    if (sortDirection.value === 'asc') {
        product.value.comparePrices.sort((a, b) => a.price - b.price)
        sortDirection.value = 'desc'
    } else {
        product.value.comparePrices.sort((a, b) => b.price - a.price)
        sortDirection.value = 'asc'
    }
}


const [relatedProductsResult, relatedPaginationResult] = await Promise.all([
    useFetch('/api/related-products', {
        server: true,
        key: `related-products-${productId}`,
        query: {
            productId: productId,
            limit: relatedProductsPerPage.value,
            offset: computed(() => (currentRelatedPage.value - 1) * relatedProductsPerPage.value)
        }
    }),
    useFetch('/api/related-products-pagination', {
        server: true,
        key: `related-products-count-${productId}`,
        query: {
            productId: productId,
            type: 'related-products'
        }
    })
])

if (relatedProductsResult.error.value) {
    console.error('Related products loading error:', relatedProductsResult.error.value)
}

if (relatedPaginationResult.error.value) {
    console.error('Related products pagination error:', relatedPaginationResult.error.value)
}

relatedProducts.value = relatedProductsResult.data.value || []
totalRelatedProducts.value = relatedPaginationResult.data.value?.totalCount;
console.log(totalRelatedProducts.value)

const handleRelatedPageChange = async (page) => {
    currentRelatedPage.value = page
    await relatedProductsResult.refresh()
}

const hideDetailsModal = () => {
    showDetailsModal.value = !showDetailsModal.value
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
    color: var(--blue-800);
    font-weight: var(--font-medium);
}

.path span:last-child {
    color: var(--grey-400);
    cursor: default;
}

.title {
    color: var(--primary);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: 24px;
}

.loading {
    color: var(--grey-600);
    font-size: var(--text-lg);
    text-align: center;
    padding: 40px 0;
}

.product-container {
    margin-top: 32px;
}

@media screen and (max-width: 768px) {
    .title {
        font-size: var(--text-lg);
    }

    .path span {
        font-size: var(--text-sm);
    }

    .product-info {
        flex-direction: column;
        align-items: center;
    }

    .photos-container .active-photo {
        max-width: 100%;
        max-height: 300px;
    }

    .photos-container .photos-list {
        max-width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }

    .photos-list .photo-item {
        max-width: 60px;
        max-height: 60px;
        margin: 4px;
    }

    .product-details-container {
        max-width: 100%;
        margin-top: 24px;
    }

    .product-details-container .product-title {
        font-size: var(--text-lg);
        margin-bottom: 12px;
    }

    .product-benefits {
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 16px;
    }

    .product-benefits .item {
        font-size: var(--text-xxxs);
        padding: 3px 12px;
    }

    .product-description {
        font-size: var(--text-xs);
    }

    .show-more {
        font-size: var(--text-xs);
    }
}

.product-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.photos-container .active-photo {
    max-width: 405px;
    max-height: 405px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 24px;
}

.photos-container .active-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.main-image {
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    will-change: opacity;
}

.photos-container .photos-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 405px;
    gap: 8px;
}

.photos-list .photo-item {
    max-width: 86px;
    max-height: 86px;
    overflow: hidden;
    border-radius: 10px;
    object-fit: contain;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    opacity: 0.7;
}

.photos-list .photo-item:hover {
    opacity: 1;
    transform: scale(1.05);
    border-color: var(--blue-400);
}

.photos-list .photo-item.active {
    opacity: 1;
    border-color: var(--blue-400);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.photos-list .photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}


.product-details-container {
    display: flex;
    flex-direction: column;
    max-width: 841px;
    width: 100%;
}

.product-details-container .product-title {
    color: var(--primary);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: 16px;
}

.product-benefits {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
}

.product-benefits .item {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: var(--rounded-md);
    background: var(--Light-Blue, #E6F7FF);
    padding: 4px 20px;
    font-family: 'Onest', sans-serif;
    font-size: var(--text-xxs);
    font-weight: var(--font-semibold);
    color: #1C1C1C;
}

.product-description {
    color: var(--primary);
    font-size: var(--text-sm);
    line-height: 144%;
    font-weight: var(--font-medium);
}

.show-more {
    display: flex;
    align-content: center;
    gap: 8px;
    color: var(--blue-400);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    margin-top: 8px;
    margin-bottom: 40px;
}


.show-more:hover {
    cursor: pointer;
}

.product-compare-container {
    display: flex;
    align-content: center;
    justify-content: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #D4DBFD;
    border-radius: var(--rounded-md);
    padding: 24px;
    transition: all 0.3s ease;
}

.product-compare-container:hover {
    cursor: pointer;
    border-radius: var(--rounded-md);
    border: 1px solid var(--blue-400);
    box-shadow: 4px 7px 14.8px 0px rgba(22, 35, 67, 0.25);
}

.product-compare-container .compare-provider-info {
    display: flex;
    flex-direction: column;
}


.product-compare-container .compare-provider-info .additional-bonuses {
    display: flex;
    align-items: center;
    gap: 16px;
}


.product-compare-container .provider-img-container {
    padding: 16px;
    border-radius: var(--rounded-md);
    background: #fff;
    border: 1px solid #E8ECFF;
    width: fit-content;
    max-width: 128px;
    width: 100%;
    margin-bottom: 16px;
}

.product-compare-container .provider-img-container img {
    width: 100%;
}

.additional-bonuses .item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--grey-400);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
}

.additional-info-section.mobile {
    display: none;
}

.compare-price-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.compare-price-info .price-item {
    color: var(--primary);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.compare-price-info .price-item .old-price {
    text-decoration: line-through;
    color: var(--grey-400);
    font-size: var(--text-lg);
}

.compare-price-info a {
    background: var(--blue-400);
    border-radius: var(--rounded-md);
    padding: 14px 24px;
    color: var(--white);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-align: center;
    text-decoration: none;
    color: #fff;
    transition: all 0.3s ease;
    max-width: 168px;
    width: 100%;
}

.compare-price-info a:hover {
    background: #59B1FF;
}

.price-range-container {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-bottom: 80px;
}

.price-range-container .labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--grey-400);
    font-size: var(--text-xss);
    font-weight: var(--font-medium);
    margin-bottom: 4px;
}

.price-range-container .slider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--grey-100);
    border-radius: var(--rounded-md);
    height: 8px;
    width: 100%;
    position: relative;
}

.details-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(49, 49, 49, 0.80);;
    z-index: 1000;
    display: flex;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    align-items: flex-end;
}

.details-modal.active {
    opacity: 1;
    visibility: visible;
}

.details-modal .white-container {
    position: relative;
    border-radius: 12px 12px 0px 0px;
    background: #FFF;
    padding: 24px 16px;
    width: 100%;
    gap: 8px;
    display: flex;
    flex-direction: column;
}
.details-modal .white-container .list-item-container {
    position: relative;
    background: #FFF;
    width: 100%;
    gap: 24px;
    display: flex;
    flex-direction: column;
}

.details-modal .white-container  span {
    color: var(--black, #313131);

font-size: var(--text-xxs);
font-weight: var(--font-medium);
line-height: 144%; /* 17.28px */
}

.details-modal .white-container .close-btn {
    position: absolute;
    top: -8px;
    right: 0;
}

.details-modal .white-container .item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #101856;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
}

.details-modal .white-container .item .icon {
    background-color: #101856;
    width: 17px;
    height: 17px;
    mask-size: contain !important;
}

.details-modal .white-container .item .icon:nth-child(1) {
    mask: url('~/assets/img/star.svg') no-repeat center center;
}

.details-modal .white-container .item:nth-child(3) .icon {
    mask: url('~/assets/img/reviews.svg') no-repeat center center;
}

.details-modal .white-container .item:nth-child(4) .icon {
    mask: url('~/assets/img/indicator.svg') no-repeat center center;
}

.details-modal .white-container .item:nth-child(5) .icon {
    mask: url('~/assets/img/price.svg') no-repeat center center;
}

.details-modal .white-container .item:nth-child(6) .icon {
    mask: url('~/assets/img/info.svg') no-repeat center center;
}

.details-modal .white-container .item.adv {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.details-modal .white-container .item.adv div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.details-modal .white-container .item.active .icon {
    background: var(--blue-400);
}
.details-modal .white-container .item.active {
    color: var(--blue-400);
}
.details-modal .white-container .item.active svg * {
    fill: var(--blue-400);
}

.details-modal .white-container .item svg {
    transition: transform 0.3s ease;
}

.details-modal .white-container .item.active svg {
    transform: rotate(180deg);
}


.price-range-container .slider .slider-range {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 80%;
    background: var(--grey-400);
    border-radius: var(--rounded-md);
    display: flex;
}

.price-range-container .slider .slider-range .slider-thumb {
    left: -24px;
    position: absolute;
    bottom: -24px;
    width: fit-content;
    color: var(--primary);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
}

.price-range-container .slider .slider-range .slider-thumb:last-child {
    right: -24px;
    left: unset;
}

.compare-provider-info .price-item.mobile {
    display: none;
}


.additional-info-container {
    padding: 24px;
    border-radius: var(--rounded-md);
    border: 1px solid #D4DBFD;
    border-bottom: 1px solid var(--grey-100);
    margin-bottom: 120px;
}

.tabs-container {
    display: flex;
    align-items: center;
    gap: 64px;
    font-size: var(--text-lg);
    color: var(--grey-400);
    font-weight: var(--font-medium);
    transition: .3s;
    border-bottom: 1px solid var(--grey-100);
}

.tabs-container .tab {
    padding-bottom: 16px;
    transition: .3s;
    border-bottom: 3px solid transparent;
}

.tabs-container .tab:hover {
    cursor: pointer;
    color: var(--blue-400);
}

.tabs-container .tab.active {
    color: var(--blue-400);
    border-bottom: 3px solid var(--blue-400);
}

.product-section-details {
    display: flex;
    flex-direction: column;
}

.product-section-details .table-header {
    display: grid;
    grid-template-columns: 1fr 375px 1fr 1fr 1fr 1fr;
    padding: 24px 0;
    color: var(--grey-400);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    border-bottom: 1px solid rgba(153, 153, 153, 0.2);
}

.product-section-details .table-header .sort-selection {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: var(--rounded-md);
    background: #E6F7FF;
    padding: 4px 20px;
    color: #1C1C1C;
    font-size: var(--text-xxs);
    font-weight: var(--font-semibold);
    justify-content: space-between;
    width: fit-content;
    cursor: pointer;
    transition: all 0.3s ease;
}

.product-section-details .table-header .sort-selection:hover {
    background: #CCE7FF;
    transform: translateY(-1px);
}

.rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.product-section-details .table-header .sort-selection svg {
    transition: transform 0.3s ease;
}


.product-section-details .details-container:not(:last-child) {
    padding-top: 24px;
    margin-bottom: 24px;
}

.product-section-details .details-container .title {
    color: var(--primary);
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    margin-bottom: 16px;
}

.product-section-details .details-container .details-item {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 16px 0;
    border-top: .5px solid rgba(139, 150, 165, 0.2);
    border-bottom: .5px solid rgba(139, 150, 165, 0.2);
}

.product-section-details .details-container .details-item span:first-child {
    width: 100px;
    color: var(--primary);
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
}


.description-container {
    padding-top: 24px;
}

.description-container .description-title {
    color: var(--primary);
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(139, 150, 165, 0.2);
}

.description-container .description-text {
    padding-top: 16px;
    font-size: var(--text-sm);
    line-height: 144%;
    font-weight: var(--font-medium);
}

.related-products-container {
    margin-top: 80px;
}

.related-products-container .title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--primary);
    margin-bottom: 32px;
}

.main-photo.mobile {
    display: none;
}

.related-products-container .title span {
    color: var(--blue-400);
}

.related-products-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 32px;
}


.related-pagination-container {
    margin-bottom: 120px;
}

.adv-tooltip {
    position: relative;
    cursor: pointer;
}

.adv-tooltip .tooltip-content {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    opacity: 0;
    font-size: var(--text-xxs);
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 270px;
    margin-top: 8px;
}

.adv-tooltip .tooltip-content::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #333;
}

.adv-tooltip:hover .tooltip-content {
    opacity: 1;
    visibility: visible;
}

.adv-tooltip svg {
    fill: black;
    transition: all 0.3s ease;
}

.adv-tooltip:hover svg {
    fill: white;
}

.adv-tooltip:hover {
    color: white;
    background: var(--blue-400);
}

.adv-tooltip .tooltip-text {
    font-size: 10px;
    line-height: 1.4;
    color: white;
    text-align: left;
    max-width: 235px;
    text-align: center;
}


@media screen and (max-width: 1320px) {
    .photos-container {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }

    .product-info {
        gap: 20px;
    }

    .compare-card,
    .product-section-details .table-header {
        grid-template-columns: 1fr 200px 1fr 1fr 1fr 1fr;
    }
}

@media screen and (max-width: 1140px) {
    .photos-container .active-photo {
        max-width: 370px;
        max-height: 370px;
    }

    .product-details-container .product-title {
        font-size: 32px;
    }
}

@media screen and (max-width: 1090px) {

    .product-section-details .table-header {
        grid-template-columns: 1fr 200px 100px 100px 150px 1fr;
    }
}


@media screen and (max-width: 1030px) {
    .related-products-list {
        grid-template-columns: repeat(2, 1fr);
    }

    .related-products-list .product-card {
        max-width: unset;
        width: 100;
    }

    .product-benefits {
        display: none;
    }
}

@media screen and (max-width: 920px) {
    .additional-info-container {
        border: 0;
        padding: 0;
    }

    .product-section-details .table-header {
        display: none;
    }

    .main-photo.mobile {
        display: block;
        border-radius: 10px;
        overflow: hidden;
        max-width: 500px;
        margin: 0 auto;
        margin-bottom: 16px;
    }

    .product-description {
        display: none;
    }

    .main-photo.mobile img {
        width: 100%;
        height: 100%;
    }

    .photos-container {
        display: none;
    }

    .product-compare-container .provider-img-container {
        display: none;
    }

    .product-compare-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .compare-provider-info .price-item.mobile {
        display: block;
        color: var(--primary);
        font-size: var(--text-3xl);
        font-weight: var(--font-bold);
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
    }

    .compare-provider-info .price-item.mobile .old-price {
        color: var(--grey-400);
        font-size: var(--text-sm);
        text-decoration: line-through;
    }

    .compare-provider-info .price-item.mobile .new-price {
        color: var(--primary);
        font-size: var(--text-lg);
        font-weight: var(--font-bold);
    }

    .compare-price-info .price-item {
        display: none;
    }

    .product-compare-container .compare-provider-info {
        order: 2;
        align-items: center;
        flex-direction: column-reverse;
    }

    .compare-price-info a {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: var(--text-sm);
        font-weight: var(--font-bold);
        text-decoration: none;
    }

    .compare-price-info {
        width: 100%;
    }

    .product-compare-container .compare-provider-info .additional-bonuses {
        margin-bottom: 8px;
    }

    .compare-provider-info .price-item.mobile {
        margin-bottom: 0;
    }

    .product-compare-container {
        padding: 16px;
    }

    .additional-info-section.mobile {
        display: block;
        width: 100%;
        margin-top: 16px;
        margin-bottom: 24px;
    }

    .additional-info-section.mobile .visible {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .description-show,
    .info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--blue-400);
        font-size: var(--text-sm);
        font-weight: var(--font-bold);
    }

    .description-show img {
        transition: transform 0.3s ease;
    }

    .description-mobile {
        margin-top: 16px;
        border-radius: var(--rounded-md);
        color: var(--primary);
        font-size: var(--text-sm);
        font-weight: var(--font-medium);
        line-height: 1.5;
    }
}


@media screen and (max-width: 820px) {
    .path {
        display: none;
    }

    .related-products-list {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media screen and (max-width: 600px) {
    .additional-info-container {
        margin-bottom: 40px;
    }

    .related-products-container .title {
        font-size: var(--text-lg);
    }

    .related-products-container {
        margin-top: 0;
    }

    .tabs-container {
        gap: unset;
        justify-content: space-between;
        font-size: 20px;
    }

    .product-details-container .product-title {
        font-size: 20px;
        margin-bottom: 16px;
    }

    .related-pagination-container {
        margin-bottom: 64px;
    }

    .price-range-container {
        margin-top: 0;
    }

    .price-range-container .labels {
        font-size: 12px;
    }

    .price-range-container .slider .slider-range {
        width: 60%;
    }

    .price-range-container {
        margin-bottom: 60px;
    }
}
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
}
.accordion-enter-to, .accordion-leave-from {
  max-height: 500px;
}
</style>
