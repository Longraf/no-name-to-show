<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать услуги</h1>
      <reviews-tabs />
      <service-sub-tabs />
    </div>

    <transition name="helper-popup">
      <service-order-reviews
        @hideModule="IsShowOrderReviews = false"
        v-if="IsShowOrderReviews" />
    </transition>

    <transition name="helper-popup">
      <div class="order-reviews-form container__inner" v-if="!IsShowOrderReviews">
        <p class="order-reviews-form__text main-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium officiis praesentium vitae.
        </p>
        <div class="order-reviews-form__price">от 888 ₽</div>
        <div class="order-reviews-form__btn btn-main btn--green" @click="IsShowOrderReviews = true">Создать новый заказ</div>
      </div>
    </transition>


    <div class="my-reviews">
      <h2>Ваши заказы</h2>
      <ServiceReviewsTable :isDone="false"/>
      <h2>Завершенные заказы</h2>
      <ServiceReviewsTable :isDone="true"/>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../../components/reviews-tabs";
  import ServiceSubTabs from "../../../components/service-sub-tabs";
  import ServiceReviewsTable from "../../../components/service-reviews-table";
  import ServiceOrderReviews from "../../../components/service-order-reviews"

  export default {
    name: "my-reviews",
    head: () => {
      return {
        title: 'Мои отзывы'
      }
    },
    data: () => {
      return{
        IsShowOrderReviews: false
      }
    },

    components: { ReviewsTabs, ServiceSubTabs, ServiceReviewsTable, ServiceOrderReviews },
  }
</script>

<style lang="scss">
  @import './assets/styles/modules/table-usual';
  @import './assets/styles/control-elements/link';

  .reviews-table{
    margin: 1.6rem 0 2.4rem;

    &__product-icon{
      width: 1.6rem;
      height: 1.6rem;

      margin-right: 0.8rem;
    }
  }

  .order-reviews-form{
    margin: 1.6rem 0 2.4rem;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 12rem 20rem;
    grid-gap: 2.4rem;
    align-items: center;

    @include tablet{
      grid-template-columns: 1fr;
      justify-items: center;
      grid-gap: 0.8rem;
    }

    &__price{
      font-weight: 500;
      font-size: 2.0rem;
      line-height: 3.2rem;

      color: $color-main--black;

      @include tablet{
        margin-top: 0.8rem;
      }
    }
  }

  .my-reviews {
    width: 100%;

    span,
    a {
      font-size: 1.4rem;
      line-height: 1.6rem;
    }
  }

  .my-reviews__container {
    margin-top: 1.6rem;
    padding: 3.2rem 4rem 4.5rem;

    background-color: $color-main--white;
    border-radius: 1rem;

    @include mobile {
      padding: 2rem 1.6rem 2.2rem;
    }
  }
</style>
