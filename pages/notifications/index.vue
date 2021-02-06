<template>
  <section class="container">
    <div class="container__head">
      <h1>Оповещения</h1>
    </div>
    <div class="notifications" v-if="this.NotificationsList.length > 0">
      <div class="notifications__item" v-for="notification in NotificationsList" :key="notification.id">
        <div class="notifications__item-block">
          <div class="notifications__item-block-number">{{ notification.title }}</div>
          <div class="notifications__item-block-text">{{ notification.text }}</div>
        </div>

        <nuxt-link
          type="button"
          class="btn-main btn--green notifications__item-add"
          v-if="notification.type === 'create-product'"
          :to='`/products/${notification.options.id}`'
        >
          Страница товара
        </nuxt-link>

        <button type="button" class="notifications__item-del" @click="RemoveNotification(notification.id)"/>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'notifications',
    layout: 'default',
    async mounted() {
      if (this.NotificationsList.length === 0){
        await this.GetNotificationsList();
      }
    },
    methods: {
      ...mapActions({
        CreateNotification: 'notifications/CreateNotification',
        GetNotificationsList: 'notifications/GetNotificationsList',
        RemoveNotification: 'notifications/RemoveNotification',
      }),
    },
    computed: {
      ...mapGetters({
        NotificationsList: 'notifications/NotificationsList'
      })
    }
  }
</script>
