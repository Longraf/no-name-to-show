<template>
  <div class="profile__tabs">
    <nuxt-link class="btn btn--small btn--gray-filled" title="Маркетплейсы" to="/user/balance" :active-class="'is-active'">Баланс</nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'profile-tabs',
  }
</script>

<style lang="scss">
  @import "../assets/styles/modules/user-profile";
</style>
