<template>
  <section class="container">
    <div class="container__head profile__head">
      <h1>Заказать отзывы</h1>
      <reviews-tabs />
    </div>
    <div class="reviews-payment">
      <div class="reviews-payment__title">Введите данные своей карты</div>

      <div class="reviews-payment__card">
        <div class="reviews-payment__card-side reviews-payment__card-front">
          <input-text
            :type="'text'"
            :name="'name'"
            :id="'name'"
            :placeholder="'Имя и фамилия'"
          />

          <input-text
            :type="'text'"
            :name="'card-number'"
            :id="'card-number'"
            :placeholder="'Номер карты'"
          />
        </div>

        <div class="reviews-payment__card-side reviews-payment__card-back">
          <input-text
            :type="'text'"
            :name="'date'"
            :id="'date'"
            :placeholder="'дата'"
          />

          <input-text
            :type="'text'"
            :name="'cvc'"
            :id="'cvc'"
            :placeholder="'CVC'"
          />
        </div>
      </div>

      <div class="reviews-total">
        <div class="reviews-total__sum">
          <span>Итого</span>
          <span>1 356 ₽</span>
        </div>

        <button class="reviews-total__btn btn-main btn--green" type="button">Оплатить</button>
      </div>
    </div>
  </section>
</template>

<script>
  import ReviewsTabs from "../../../components/reviews-tabs";
  import InputText from "../../../components/control-elements/input-text";

  export default {
    name: "reviews-payment",
    head: () => {
      return {
        title: 'Отзывы на товары'
      }
    },
    components: { ReviewsTabs, InputText },
  }
</script>

<style lang="scss">
  @import "../../../assets/styles/control-elements/input-text";

  .reviews-payment {
    width: 100%;
    margin-top: 1.6rem;
    padding: 3.2rem 4rem 2.7rem;

    background-color: $color-main--white;
    border-radius: 1rem;

    @include mobile {
      padding: 2rem 1.6rem 3.4rem;
    }
  }

  .reviews-payment__title {
    margin-bottom: 3.3rem;

    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $color-main--darkgray;

    @include mobile {
      margin-bottom: 2.3rem;
    }
  }

  .reviews-payment__card {
    position: relative;
    width: 45.8rem;
    height: 27.5rem;
    margin-bottom: 0.4rem;

    @include mobile {
      width: 100%;
      max-width: 45.8rem;
      margin-bottom: 2.4rem;
    }
  }

  .reviews-payment__card-side {
    position: absolute;

    width: 33.6rem;
    height: 18.3rem;
    padding: 2.6rem 2.6rem 1.2rem;

    background-color: $color-main--white;
    border: 0.1rem solid $color-main--middlegray;
    border-radius: 1.9rem;

    @include mobile {
      width: 95.24%;
      max-width: 28rem;

      padding: 2.6rem 2rem 1.2rem;
    }
  }

  .reviews-payment__card-front {
    top: 0;
    left: 0;
    z-index: 10;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    align-content: flex-end;

    .input-text {
      width: 100%;
    }
  }

  .reviews-payment__card-back {
    bottom: 0;
    right: 0;
    z-index: 5;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .input-text {
      width: 45%;
    }
  }
</style>
