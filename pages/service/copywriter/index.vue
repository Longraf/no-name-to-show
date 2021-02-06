<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать услуги</h1>
      <reviews-tabs />
      <service-sub-tabs />
    </div>
    <div class="container__inner container__body service-copy">
      <h2>
        <svg-icon name="clock" style="width: 2rem; height: 2rem; margin-right: 1.6rem;"/>
        В разработке
      </h2>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../../components/reviews-tabs";
  import ServiceSubTabs from "../../../components/service-sub-tabs";

  export default {
    name: "service-copy",
    head: () => {
      return {
        title: 'Копирайтер от site.ru'
      }
    },
    components: { ReviewsTabs, ServiceSubTabs },
  }
</script>

<style lang="scss">

  .service-copy {
    width: 100%;
  }
</style>
