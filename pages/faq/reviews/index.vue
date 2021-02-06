<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать отзывы</h1>
      <reviews-tabs />
    </div>
    <div class="faq-accordion container__inner">
      <div class="faq-accordion__title text-color-black">Lorem</div>
      <service-sub-tabs :parent-page="'faq'"/>
      <div class="faq-accordion__list">
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>
        <accordion>
          <template v-slot:accordion-head>Lorem ipsum dolor sit amet.</template>
          <template v-slot:accordion-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, consequatur ipsa?</template>
        </accordion>

      </div>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../../components/reviews-tabs";
  import ServiceSubTabs from "../../../components/service-sub-tabs";
  import Accordion from "../../../components/accordion";

  export default {
    name: "faq-reviews",
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
