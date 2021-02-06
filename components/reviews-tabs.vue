<template>
  <div class="profile__tabs">
    <nuxt-link class="btn btn--small btn--gray-filled" title="Заказать отзывы" to="/service/" :active-class="'is-active'">Заказать услуги</nuxt-link>
    <nuxt-link class="btn btn--small btn--gray-filled" title="Ответы на вопросы" to="/faq/reviews" :active-class="'is-active'">Ответы на вопросы</nuxt-link>
  </div>

</template>

<script>
  export default {
    name: 'reviews-tabs',
  }
</script>

<style lang="scss">
  @import "../assets/styles/modules/user-profile";
</style>
