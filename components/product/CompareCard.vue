<template>
    <div>
        <div class="compare-card desktop">
            <div class="compare-card-img">
                <img src="~/assets/img/merchants/amazon.svg" v-if="product.provider === 'Amazon'" alt="">
                <img src="~/assets/img/merchants/ebay.svg" v-if="product.provider === 'ebay'" alt="">
            </div>
            <div class="title">
                {{ product.title.slice(0, 39) }}...
            </div>
            <div class="condition">
                {{ product.condition }}
            </div>
            <div class="shipping">
                {{ product.isFreeShipping === true ? 'Free' : formatPrice(product.isFreeShipping, product.currency) }}
            </div>
            <div class="price">
                <div class="old-price">
                    {{ formatPrice(product.basePrice, product.currency) }}
                </div>
                <div class="new-price">
                    {{ formatPrice(product.price, product.currency) }}
                </div>
            </div>
            <a :href="product.productUrl" target="_blank" class="see-on-provider">See on {{ product.provider.charAt(0).toUpperCase() + product.provider.slice(1) }}</a>
        </div>

        <div class="compare-card mobile">
            <div class="title-section">
                <div class="title">
                    {{ product.title.slice(0, 39) }}...
                </div>
                <div class="compare-card-img">
                    <img src="~/assets/img/merchants/amazon.svg" v-if="product.provider === 'Amazon'" alt="">
                    <img src="~/assets/img/merchants/ebay.svg" v-if="product.provider === 'ebay'" alt="">
                </div>
            </div>
            <div class="price-section">
                <div class="condition-section">
                    <span>Condition: {{ product.condition }}</span>
                    <span>Shipping: {{ product.isFreeShipping === true ? 'Free' : formatPrice(product.isFreeShipping, product.currency) }}</span>
                </div>
                <div class="price-section">
                    <div class="old-price">
                        {{ formatPrice(product.basePrice, product.currency) }}
                    </div>
                    <div class="new-price">{{ formatPrice(product.price, product.currency) }}</div>
                </div>
            </div>
            <a :href="product.productUrl" target="_blank" class="see-on-provider">See on {{ product.provider.charAt(0).toUpperCase() + product.provider.slice(1) }}</a>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

</script>


<style scoped>
.compare-card {
   display: grid;
   grid-template-columns: 1fr 380px 1fr 1fr 1fr 1fr;
   align-items: center;
   padding: 24px 0;
}

.compare-card:last-child {
    padding-bottom: 0;
}

.compare-card:first-child {
    padding-top: 32px;
}

.compare-card-img {
    border-radius: var(--rounded-md, 12px);
    border: 1px solid var(--grey-100);
    width: 128px;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.mobile {
    display: none;
}

.title {
    color: var(--primary);
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
}

.condition, .shipping {
    color: var(--primary);
    font-size: 16px;
}

.price {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    font-size: 24px;
    font-weight: 500;
}

.old-price {
    color: var(--grey-400);
    font-size: var(--text-sm);
    text-decoration: line-through;
}

.compare-card a {
    border-radius: var(--rounded-md, 12px);
    border: 2px solid var(--blue-400);
    padding: 14px 24px;
    color: var(--blue-400);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    text-decoration: none;
    text-align: center;
}


@media screen and (max-width: 1320px) {
    .compare-card {
        grid-template-columns: 1fr 200px 1fr 1fr 1fr 1fr;
    }
}

@media screen and (max-width: 1090px) {

    .compare-card {
        grid-template-columns: 1fr 200px 100px 100px 150px 1fr;
    }
}

@media screen and (max-width: 920px) {
    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

    .compare-card.mobile .title-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--primary);
        font-size: var(--text-md);
        margin-bottom: 16px;
    }

    .compare-card.mobile .price-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--text-sm);
        margin-bottom: 16px;
        gap: 8px;
    }

    .compare-card.mobile .price-section .condition-section{
        color: var(--grey-400);
        font-weight: var(--font-medium);
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .compare-card-img {
        height: 51px;
    }

    .compare-card.mobile .price-section .price-section .old-price {
        color: var(--grey-400);
        font-size: var(--text-sm);
        text-decoration: line-through;
    }

    .compare-card.mobile .price-section .price-section .new-price {
        color: var(--primary);
        font-size: var(--text-lg);
        font-weight: var(--font-medium);
    }

    .compare-card.mobile a {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--text-sm);
        font-weight: var(--font-bold);
        text-decoration: none;
    }

}
</style>