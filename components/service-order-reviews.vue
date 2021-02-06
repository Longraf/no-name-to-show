<template>
    <section class="order-reviews">
      <div class="order-reviews__orders">
        <div class="order-reviews__head order-reviews__row">
          <span>Ссылки на товар aliexpress</span>
          <span>Количество отзывов</span>
          <span>С фото</span>
          <span>Сумма</span>
        </div>

        <div class="order-reviews__list">
          <div class="order-reviews__item order-reviews__row is-wildberries">
            <div class="order-reviews__link">
              <p class="order-reviews__link-title">
                <span class="order-reviews__link-mobile-title">Ссылка на товар</span>
                <span>Ссылка на товар или выберите </span>
                <a href="#">товар из своих</a>
              </p>
              <svg-icon name="clock" class="order-reviews__link-loading-icon"/>
              <svg-icon name="wildberries" class="order-reviews__link-wildberries-icon"/>
              <input-text
                :type="'text'"
                :name="'url-1'"
                :id="'url-1'"
                :value="'aliexpress.ru'"
              />
            </div>

            <div class="order-reviews__reviews-number">
              <span class="order-reviews__mobile-title">Количество отзывов</span>
              <input-number
                :id="'order-reviews-number-1'"
                :name="'order-reviews-number-1'"
                :range="[1, 999]"
                v-model="OrderReviews[0]"
              />
            </div>

            <div class="order-reviews__reviews-photo">
              <span class="order-reviews__mobile-title">С фото</span>
              <input-checkbox
                :id="'order-reviews-photo-1'"
                :name="'order-reviews-photo-1'"
                :value="''"
              />
            </div>

            <div class="order-reviews__sum">
              <span class="order-reviews__mobile-title">Сумма</span>
              <span class="order-reviews__sum-value">{{OrderReviews[0] * OneReviewPrice}} ₽</span>
            </div>
          </div>

          <div class="order-reviews__item order-reviews__row is-loading">
            <div class="order-reviews__link">
              <p class="order-reviews__link-title">
                <span class="order-reviews__link-mobile-title">Ссылка на товар</span>
                <span>Ссылка на товар или выберите </span>
                <a href="#">товар из своих</a>
              </p>
              <svg-icon name="clock" class="order-reviews__link-loading-icon"/>
              <svg-icon name="wildberries" class="order-reviews__link-wildberries-icon"/>
              <input-text
                :type="'text'"
                :name="'url-2'"
                :id="'url-2'"
                :value="'aliexpress.ru'"
              />
            </div>

            <div class="order-reviews__reviews-number">
              <span class="order-reviews__mobile-title">Количество отзывов</span>
              <input-number
                :id="'order-reviews-number-2'"
                :name="'order-reviews-number-2'"
                :range="[0, 99]"
                v-model="OrderReviews[1]"
              />
            </div>

            <div class="order-reviews__reviews-photo">
              <span class="order-reviews__mobile-title">С фото</span>
              <input-checkbox
                :id="'order-reviews-photo-2'"
                :name="'order-reviews-photo-2'"
                :value="''"
              />
            </div>

            <div class="order-reviews__sum">
              <span class="order-reviews__mobile-title">Сумма</span>
              <span class="order-reviews__sum-value">0 ₽</span>
            </div>
          </div>

<!--          <div class="order-reviews__item order-reviews__row is-empty">-->
<!--            <div class="order-reviews__link">-->
<!--              <p class="order-reviews__link-title">-->
<!--                <span class="order-reviews__link-mobile-title">Ссылка на товар</span>-->
<!--                <span>Ссылка на товар или выберите </span>-->
<!--                <a href="#">товар из своих</a>-->
<!--              </p>-->
<!--              <svg-icon name="clock" class="order-reviews__link-loading-icon"/>-->
<!--              <svg-icon name="wildberries" class="order-reviews__link-wildberries-icon"/>-->
<!--              <input-text-->
<!--                :type="'text'"-->
<!--                :name="'url-3'"-->
<!--                :id="'url-3'"-->
<!--                value=""-->
<!--              />-->
<!--            </div>-->

<!--            <div class="order-reviews__reviews-number">-->
<!--              <span class="order-reviews__mobile-title">Количество отзывов</span>-->
<!--              <input-number-->
<!--                :id="'order-reviews-number-3'"-->
<!--                :name="'order-reviews-number-3'"-->
<!--                :range="[0, 99]"-->
<!--                v-model="OrderReviews[3]"-->
<!--              />-->
<!--            </div>-->

<!--            <div class="order-reviews__reviews-photo">-->
<!--              <span class="order-reviews__mobile-title">С фото</span>-->
<!--              <input-checkbox-->
<!--                :id="'order-reviews-photo-3'"-->
<!--                :name="'order-reviews-photo-3'"-->
<!--                value=""-->
<!--              />-->
<!--            </div>-->

<!--            <div class="order-reviews__sum">-->
<!--              <span class="order-reviews__mobile-title">Сумма</span>-->
<!--              <span class="order-reviews__sum-value">0 ₽</span>-->
<!--            </div>-->
<!--          </div>-->
        </div>

        <button class="order-reviews__add-btn btn-main btn--gray-outline" type="button">
          <svg-icon name="plus"/>
          Добавить товар
        </button>
      </div>

      <div class="reviews-total">
        <div class="reviews-total__promo-code">
          <span>Промокод</span>
          <svg-icon name="check" class="reviews-total__promo-code-check"/>
        </div>

        <div class="reviews-total__calculation">{{OrderReviewsSum}} х {{OneReviewPrice}} руб./шт</div>

        <div class="reviews-total__sum">
          <span class="text-color-darkgray">Скидка</span>
          <span class="text-color-red">{{ TotalDiscountSum }} ₽</span>
        </div>

        <div class="reviews-total__sum">
          <span class="text-color-darkgray">Итого</span>
          <span>{{ TotalPrice }} ₽</span>
        </div>

        <button class="reviews-total__btn btn-main btn--green" type="button" @click="hideModule()">Сохранить заказ</button>
      </div>
    </section>
</template>

<script>
  import ReviewsTabs from "./reviews-tabs";
  import InputText from "./control-elements/input-text";
  import InputNumber from './control-elements/input-number';
  import InputCheckbox from './control-elements/input-checkbox';

  export default {
    name: "service-order-reviews",
    head: () => {
      return {
        title: 'Заказать отзывы на товары'
      }
    },
    data: () => {
      return{
        OrderReviews: [0, 0, 0],
        OneReviewPrice: 349,
        Discount: 10,
      }
    },
    methods: {
      hideModule() {
        this.$emit('hideModule', {
          isSHow: true
        })
      }
    },
    computed: {
      OrderReviewsSum: function () {
        return this.OrderReviews.reduce((accum, current) => {
          return accum + current
        })
      },
      DiscountSum: function () {
        if (this.OrderReviewsSum === 0 ){
          return 0
        } else{
          return parseFloat( ((this.Discount / 100) * this.OneReviewPrice).toFixed(2) )
        }
      },
      TotalDiscountSum: function () {
        return parseFloat( ( this.DiscountSum * this.OrderReviewsSum ).toFixed(2) )
      },
      TotalPrice: function () {
        return this.OrderReviewsSum * this.OneReviewPrice - this.TotalDiscountSum
      }
    },
    components: { ReviewsTabs, InputText, InputNumber, InputCheckbox },
  }
</script>

<style lang="scss">
  @import "../assets/styles/control-elements/input-text";
  @import "../assets/styles/control-elements/input-number";

  .order-reviews {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1.6rem 0 2.4rem;
    padding: 3.2rem 4rem 2.7rem;

    background-color: $color-main--white;
    border-radius: 1rem;

    @include mobile {
      padding: 2rem 1.6rem 3.4rem;
    }

    &__orders {
      margin-bottom: 2.4rem;

      .order-reviews__add-btn {
        min-width: 231px;

        @include mobile {
          width: 100%;
          min-height: 4rem;
        }
      }
    }

    &__row {
      display: grid;
      grid-template-columns: 58.22% 15.6% 5.95% 9.52%;
      grid-column-gap: 3.57%;

      @include tablet {
        grid-template-columns: 60.22% 17.6% 7.95% 9.52%;
        grid-column-gap: 1.57%;
      }

      @include mobile {
        display: block;
      }
    }

    &__head {
      margin-bottom: 1.5rem;

      span {
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: $color-main--darkgray;

        @include mobile {
          display: none;

          &:first-child {
            display: block;
          }
        }
      }
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
      margin-bottom: 0.4rem;

      @include mobile {
        grid-row-gap: 1.7rem;
        margin-bottom: 1.6rem;
      }
    }

    &__item {
      align-items: flex-start;

      color: $color-main--black;

      @include mobile {
        padding-bottom: 1.8rem;
        border-bottom: 0.1rem solid $color-main--middlegray;
      }

      .input-text {
        input {
          padding-left: 2rem;
          color: $color-main--black;
        }
      }

      &.is-empty {
        .order-reviews__link-title {
          display: block;
        }

        .input-text {
          input {
            color: $color-main--darkgray;
          }
        }

        .order-reviews__reviews-number {
          pointer-events: none;
        }

        .input-number__control-button {
          color: $color-main--middlegray;
        }

        .input-number__input {
          color: $color-main--middlegray;
        }

        .order-reviews__reviews-photo {
          pointer-events: none;
        }

        .order-reviews__sum-value {
          color: $color-main--middlegray;
          pointer-events: none;
        }
      }

      &.is-loading {
        pointer-events: none;

        .order-reviews__link-loading-icon {
          display: block;
        }

        .input-text {
          input {
            color: $color-main--darkgray;
          }
        }

        .input-number__control-button {
          color: $color-main--middlegray;
        }

        .input-number__input {
          color: $color-main--middlegray;
        }

        .order-reviews__sum-value {
          color: $color-main--middlegray;
        }
      }

      &.is-wildberries {
        .order-reviews__link-wildberries-icon {
          display: block;
        }
      }
    }

    &__link {
      position: relative;
      padding-right: 9px;

      @include mobile {
        padding-right: 0;
      }
    }

    &__link-title {
      display: none;
      position: absolute;
      top: 1.1rem;
      left: 0;
      z-index: 5;
      pointer-events: none;

      span,
      a {
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: $color-main--middlegray;

        @include mobile {
          display: none;
        }
      }

      a {
        pointer-events: auto;
      }

      .order-reviews__link-mobile-title {
        display: none;

        @include mobile {
          display: block;
        }
      }
    }

    &__link-loading-icon {
      position: absolute;
      top: 1.1rem;
      left: 0;
      z-index: 5;

      display: none;
      width: 1.1rem;
      height: 1.1rem;

      fill: $color-main--middlegray;
    }

    &__link-wildberries-icon {
      position: absolute;
      top: 1.1rem;
      left: 0;
      z-index: 5;

      display: none;
      width: 1.4rem;
      height: 1.1rem;
    }

    &__sum {
      display: flex;
      align-items: center;
      min-height: 3.2rem;

      @include mobile {
        justify-content: space-between;
        min-height: 0;
      }
    }

    &__sum-value {
      font-size: 1.4rem;
      line-height: 2rem;
    }

    &__reviews-number {
      @include mobile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .input-number {
        @include mobile {
          width: 12rem;
        }
      }
    }

    &__reviews-photo {
      @include mobile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .input-checkbox__new {
        margin-right: 0;
      }
    }

    &__mobile-title {
      display: none;

      font-size: 1.2rem;
      line-height: 1.6rem;
      color: $color-main--darkgray;

      @include mobile {
        display: block;
      }
    }


  }


  .reviews-total {
    width: 20rem;
    margin-left: auto;

    @include mobile {
      width: auto;
      margin-left: 0;
    }

    &__btn {
      width: 100%;
      min-height: 4.8rem;
    }

    &__promo-code {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.4rem;
      padding-bottom: 0.9rem;

      border-bottom: 0.1rem solid #EFF1F9;

      span {
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: $color-main--middlegray;
      }
    }

    &__promo-code-check {
      width: 1.5rem;
      height: 1.6rem;
      fill: $color-main--green;
    }

    &__calculation {
      margin-bottom: 1.4rem;

      font-size: 1.4rem;
      line-height: 1.6rem;
      color: $color-main--darkgray;
      text-align: right;
    }

    &__sum {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;

      span {
        font-size: 1.4rem;
        line-height: 1.6rem;
      }
    }
  }
</style>
