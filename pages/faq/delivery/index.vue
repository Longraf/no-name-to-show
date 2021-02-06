<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать отзывы</h1>
      <reviews-tabs />
    </div>
    <div class="faq-accordion container__inner">
      <div class="faq-accordion__title text-color-black">Частые вопросы</div>
      <service-sub-tabs :parent-page="'faq'"/>
      <div class="faq-accordion__list">
        <h2>
          <svg-icon name="clock" style="width: 2rem; height: 2rem; margin-right: 1.6rem; margin-top: 1.6rem;"/>
          В разработке
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../../components/reviews-tabs";
  import ServiceSubTabs from "../../../components/service-sub-tabs";
  import Accordion from "../../../components/accordion";

  export default {
    name: "faq-delivery",
    head: () => {
      return {
        title: 'Ответы на вопросы'
      }
    },
    components: { ReviewsTabs, Accordion, ServiceSubTabs },
  }
</script>

<style lang="scss">
  @import 'assets/styles/modules/faq-accordion';
</style>
