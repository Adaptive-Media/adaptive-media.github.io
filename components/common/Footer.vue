<template>
    <footer>
        <div class="footer__container">
            <div class="footer-column">
                <div>Adaptive Media SIA</div>
                <div>Cesu Street 19</div>
                <div>Valmiera, Latvia, LV-4201</div>
                <div>(+371) 22324246</div>
                <a href="https://uk.pickbest.org/product/lego-star-wars-10236-ewok-village-zestaw/B00EU7TW6W" target="_blank">info@pickbest.org</a>
            </div>
            <Logo type="white" class="footer-logo" size="md" />
            <div class="footer-column">
               <router-link to="/">Categories</router-link>
               <router-link to="/">About Us</router-link>
               <router-link to="/">Shipping Policy</router-link>
               <router-link to="/">Terms of Service</router-link>
               <router-link to="/">Privacy Policy</router-link>
               <router-link to="/">Return & Refund Policy</router-link>
              
            </div>
            <img src="~/assets/img/scrollBtn.svg" @click="scrollToTop" alt="scrollBtn" class="scroll-btn">
        </div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    </footer>
</template>

<script setup>
import Logo from '~/components/common/Logo.vue'

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>

<style scoped>
footer {
    background: var(--blue-400);
    border-radius: 64px 64px 0px 0px;
    padding: 64px 0 24px 0;
}



.footer__container{
    max-width: var(--container-md);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 48px;
    position: relative;
}

.footer__container img {
    position: absolute;
    top: 0;
    right: -120px;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.footer__container img:hover{
    opacity: 0.7;
}

.footer__container .footer-column{
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: var(--text-md);
    font-weight: var(--font-regular);
    color: white;
}

.footer__container .footer-column a {
    color: white;
    text-decoration: underline;
    font-family: 'Inter', sans-serif;

}

.footer__container .footer-column div {
    font-family: 'Inter', sans-serif;
}

footer div:last-child {
    font-size: 18px;
    color: white;
    text-align: center;
}


@media screen and (max-width: 1300px) {
    footer {
        padding-left: 40px;
        padding-right: 40px;
    }

    .footer__container img {
        right: -20px;
    }

    @media screen and (max-width: 1024px) {
        .footer__container img {
            display: none;
        }
        .footer__container .footer-column {
            font-family: var(--text-sm);
        }

        footer :deep(.logo-image) {
            max-width: 165px;
        }

        footer div:last-child {
            font-size: var(--text-sm);
        }
    }


    @media screen and (max-width: 768px) {
        .footer__container .footer-column {
            font-size: var(--text-xs);
        }
    }

    @media screen and (max-width: 600px) {
        .footer__container {
            flex-direction: column;
            align-items: center;
            gap: 64px;
        }

        .footer__container .footer-column {
            font-size: var(--text-md);
            text-align: center;
        }

        .footer__container {
            margin-bottom: 64px;
            font-size: 18px;
        }

        footer .footer-logo {
            order: 1;
        }

        footer :deep(.logo-image) {
            max-width: 265px;
        }


        .footer__container .footer-column {
            order: 2;
        }

        footer {
            padding-left: 16px;
            padding-right: 16px;
        }

    }
}

</style>