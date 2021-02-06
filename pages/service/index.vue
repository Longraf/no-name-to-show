<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать услуги</h1>
      <reviews-tabs />
    </div>
    <div class="service">
      <div
        class="service-item container__inner"
        v-for="item in ServiceItem"
        :key="item.IconName"
      >
        <div class="service-item__title-area">
          <svg-icon :name="item.IconName" class="service-item__icon"/>
          <h4 class="service-item__title">{{item.title}}</h4>
        </div>
        <p class="service-item__text">{{item.text}}</p>

        <div class="service-item__order-area">
          <div class="service-item__price">от {{item.price}} ₽</div>
          <nuxt-link class="btn-main btn--green service-item__order-btn" title="Ответы на вопросы" :to="item.link" :active-class="'is-active'">Заказать</nuxt-link>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../components/reviews-tabs";

  export default {
    name: "service",
    head: () => {
      return {
        title: 'Заказать услуги',
      }
    },
    data: () => {
      return {
        ServiceItem: [
          {
            IconName: 'service-review',
            title: 'Lorem ipsum',
            text: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
            price: '888',
            link: '/service/reviews'
          },
          {
            IconName: 'service-photo',
            title: 'Lorem ipsum2',
            text: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
            price: '8 888',
            link: '/service/photographer'
          },
          {
            IconName: 'service-copy',
            title: 'Lorem ipsum3',
            text: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
            price: '888',
            link: '/service/copywriter'
          },
          {
            IconName: 'service-delivery',
            title: 'Lorem ipsum4',
            text: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
            price: '8 888',
            link: '/service/delivery'
          },
        ]
      }
    },
    components: { ReviewsTabs },
  }
</script>

<style lang="scss">
  .service{

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem 4rem;

    @include tablet{
      grid-template-columns: 1fr;
      grid-gap: 1.6rem;
    }
  }

  .service-item{
    background-color: $color-main--white;

    border-radius: 10px;

    max-width: 44rem;

    &__icon{
      width: 2rem;
      height: 2rem;

      fill: $color-main--green
    }

    &__title-area{
      display: grid;
      grid-template-columns: 2rem 1fr;
      grid-gap: 1.2rem;

      margin-bottom: 1.2rem;
    }

    &__title{
      color: $color-main--black;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.0rem;
    }

    &__text{
      font-size: 1.4rem;

      margin-bottom: 1.6rem;
    }

    &__order-area{
      display: grid;
      grid-template-columns: 1fr 13rem;
    }

    &__price{
      font-weight: 500;
      font-size: 2.0rem;
      line-height: 3.2rem;
    }

    &__order-btn{

    }
  }
</style>
