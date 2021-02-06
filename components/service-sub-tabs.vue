<template>
  <div class="service-sub-tabs">
    <nuxt-link
      v-for="item in LinkList"
      :key="item.link"
      class="service-sub-tabs__item"
      :title="item.text"
      :to="'/' + ParentPage + item.link"
      :active-class="'service-sub-tabs__item--active'" exact>
      {{ item.text }}
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'service-sub-tabs',
    data: () => {
      return{
        LinkList: [
          {text: 'lorem ipsum', link: '/reviews'},
          {text: 'lorem ipsum2', link: '/photographer'},
          {text: 'lorem ipsum3', link: '/copywriter'},
          {text: 'lorem ipsum4', link: '/delivery'},
        ]
      }
    },
    props: {
      ParentPage: {
        request: true,
        type: String,
        default: 'service'
      }
    },
  }
</script>

<style lang="scss">
  .service-sub-tabs{
    &__item{
      text-decoration: none;
      display: inline-block;
      margin-top: 0.4rem;
      margin-right: 2rem;

      color: $color-main--darkgray;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.0rem;

      &--active{
        color: $color-main--black;

        border-bottom: 0.1rem solid $color-main--black;
      }
    }
  }
</style>
