<template>
  <div class="product-card">
    <div class="discount" v-if="product.discountPercentage">
        <div class="discount__text">
            -{{ product.discountPercentage }}%
        </div>
    </div>
    <MerchantLogo :merchant="product.merchant" />
    <div class="product-card__image">
      <img :src="product.imagePrimaryUrl" alt="">
    </div>
    <div class="product-card__text">
        <div class="product-card__text-title">
            {{ product.title.slice(0, 28) }}...
        </div>
        <div class="product-card__text-description">
            {{ product.description }}
        </div>

        <div class="product-card__text-price">
            <div class="price">
            <div class="new-price">{{ formatPrice(product.priceAmount, product.priceCurrency) }}</div>
            <div class="old-price">{{ formatPrice(product.priceBaseAmount, product.priceCurrency) }}</div>
            </div>
            <div class="shipping" v-if="product.shippingIsFree">
                <div class="shipping__icon">
                    <img src="~/assets/img/shipping.svg" alt="">
                </div>
                <div class="shipping__text">Free shipping</div>
            </div>
        </div>

        <Button @click="navigateTo(`/products/${product.id}`)" text="TO THE OFFER" type="primary" size="full" rounded="md" />

    </div>
       
  </div>
</template>

<script setup>
import Button from '~/components/common/Button.vue';
import MerchantLogo from '~/components/common/MerchatLogo.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

</script>

<style scoped>
.product-card {
    max-width: 404px;
    border-radius: var(--rounded-md);
    background: var(--color-white);
    border: 2px solid var(--grey-100);
    overflow: hidden;
    position: relative;
}

.discount{
    position: absolute;
    border-radius: var(--rounded-md);
    border: 1px solid var(--grey-100);
    background: var(--color-white);
    padding: 0 16px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: var(--blue-400);
    font-weight: var(--font-bold);
    font-size: var(--text-md);
    top: 16px;
    left: 16px;
}

.product-card .product-card__image{
    max-height: 272px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.product-card .product-card__image img {
    height: 272px;
}

.product-card .product-card__text {
    background: var(--grey-100);
    padding: 23px 24px 32px 24px;
    height: 100%;
}

.product-card .product-card__text-title {
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    color: var(--primary);
    margin-bottom: 16px;
}


.product-card__text-description{
    color: var(--grey-350);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    margin-bottom: 16px;
}

.product-card__text-price{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

}

.product-card__text-price .price{
    display: flex;
    align-items: center;
    gap: 8px;
}

.product-card__text-price .price .new-price{
    color: var(--blue-400);
    font-weight: var(--font-bold);
    font-size: var(--text-lg);
}

.product-card__text-price .price .old-price{
    color: var(--grey-400);
    font-weight: var(--font-regular);
    font-size: var(--text-md);
    text-decoration: line-through;
}

.shipping {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    color: var(--blue-400);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
}


.shipping__icon{
    height: 17px;
}

@media screen and (max-width: 768px) {
    .product-card__text-price .price .new-price {
        font-size: var(--text-md);
    }

    .product-card__text-price .price .old-price {
        font-size: var(--text-sm);
    }

    .discount {
        font-size: 18px;
        height: 40px;
        width: 65px;
    }

    .product-card {
        max-width: 496px;
        width: 100%;
    }
}
</style>