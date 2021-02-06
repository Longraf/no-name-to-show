<template>
  <div class="container">
    <div class="container__head profile__head">
      <h1>Мой профиль</h1>
    </div>

    <profile-tabs />

    <div class="personal-balance" :class="loading">
      <div class="personal-balance__container">
        <h3 class="personal-balance__title">Мой кошелёк</h3>
        <p class="personal-balance__balance-current">299 ₽</p>
        <p class="personal-balance__balance-check">349 ₽ на проверке</p>
      </div>

      <div class="personal-balance__wrapper">
        <div class="personal-balance__container personal-balance__container--small">
          <img class="personal-balance__icon" src="../../../assets/images/user-balance/yandex-money-ico.png" alt="yandex-money-ico">
          <a href="#" class="link link--green" @click="ShowPopup()">Вывести</a>
        </div>
      </div>

      <h3 class="personal-balance__title personal-balance__title--history">История операций</h3>

      <div class="personal-balance__container personal-balance-history" v-if="BalanceHistory.length !== 0">
        <div class="personal-balance-history__table">
          <div class="personal-balance-history__table-row personal-balance-history__desktop-text">
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray"><p>Способ вывода</p></div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray"><p>Дата начала</p></div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray"><p>Сумма</p></div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray"><p>Дата окончания</p></div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray"><p>Статус</p></div>
          </div>
          <div
            class="personal-balance-history__table-row"
            v-for="item in BalanceHistory"
          >
            <div class="personal-balance-history__table-ceil">
              <p class="personal-balance-history__desktop-text">{{item.withdrawalMethod}}</p>
              <p class="personal-balance-history__mobile-text">
                <span>Способ вывода</span><span>{{item.withdrawalMethod}}</span>
              </p>
            </div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray">
              <p class="personal-balance-history__desktop-text">{{item.dateBegin}}</p>
              <p class="personal-balance-history__mobile-text">
                <span>Дата начала</span><span>{{item.dateBegin}}</span>
              </p>
            </div>
            <div class="personal-balance-history__table-ceil">
              <p class="personal-balance-history__desktop-text">{{item.sum}} ₽</p>
              <p class="personal-balance-history__mobile-text">
                <span>Сумма</span><span>{{item.sum}} ₽</span>
              </p>
            </div>
            <div class="personal-balance-history__table-ceil personal-balance-history__table-ceil--darkgray">
              <p class="personal-balance-history__desktop-text">{{item.dateEnd}}</p>
              <p class="personal-balance-history__mobile-text">
                <span>Дата окончания</span><span>{{item.dateEnd}}</span>
              </p>

            </div>
            <div class="personal-balance-history__table-ceil"
              :class="{'personal-balance-history__table-ceil--green': item.state === 'Выполнено'}"
            >
              <p class="personal-balance-history__desktop-text">{{item.state}}</p>
              <p class="personal-balance-history__mobile-text">
                <span>Статус</span><span>{{item.state}}</span>
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class="personal-balance__container personal-balance-history personal-balance-history--empty" v-else>
        <p class="personal-balance-history__text personal-balance-history__text--orange">У вас ещё нет транзакций</p>
      </div>

      <popup-withdrawal-balance :ref="'popup-withdrawal-balance'" />

    </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ProfileTabs from "../../../components/profile-tabs"
    import PopupWithdrawalBalance from '../../../components/popup-withdrawal-balance'

    export default {
        name: 'user-balance',
        head: () => {
            return {
                title: 'Баланс на site.ru'
            }
        },
        components: { ProfileTabs, PopupWithdrawalBalance },
        transition(to, from){
            if (!from){
                return;
            }

            if (from.path.includes('/user') && to.path.includes('/user')){
                return 'page-user-animation';
            }
        },
        async asyncData(ctx) {
            if (Object.keys(ctx.store.getters['user/User']).length === 0){
                await ctx.store.dispatch('user/GetUserData');

                return {
                    loading: 'page-loading',
                }
            } else {
                return {
                    loading: false,
                }
            }
        },
        data: () => {
            return {
                loading: false,
                BalanceHistory: [
                    {withdrawalMethod: 'Яндекс. Деньги', dateBegin: '22.09.2020', dateEnd: '...', sum: '349', state: 'В работе'},
                    {withdrawalMethod: 'На карту Сбербанка', dateBegin: '20.12.2020', dateEnd: '20.12.2020', sum: '249', state: 'Выполнено'},
                    {withdrawalMethod: 'По номеру телефона', dateBegin: '18.12.2020', dateEnd: '18.12.2020', sum: '249', state: 'Выполнено'},
                ],
            }
        },
        mounted() {
            setTimeout(() => {
                this.loading = 'page-loading page-loading--removing';

                setTimeout(() => {
                    this.loading = false;
                }, 350);
            }, process.env.NODE_ENV !== 'development' ? 1000 : 1000);
        },
        methods: {
            ShowPopup(link) {
                this.$refs['popup-withdrawal-balance'].open(link);
            },
        },
        computed: {
            ...mapGetters({
                User: 'user/User',
                company: 'user/Company',
                LoadingState: 'user/LoadingState',
            }),
        },

    }
</script>

<style lang="scss">

  @import "assets/styles/control-elements/link";

  .personal-balance {
    width: 100%;
    margin-top: 2.4rem;

    display: grid;
    grid-gap: 1.6rem;

    &__wrapper{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1.6rem;
      max-width: 100%;

      @include tablet{
        grid-template-columns: 1fr 1fr;

      }

    }

    &__title{
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 2.0rem;

      color: $color-main--darkgray;

      &--history{
        margin-top: 3.2rem;
        margin-bottom: 1.6rem;
      }
    }

    &__container{
      display: grid;
      grid-template-rows: auto 1fr;
      align-items: end;
      padding: 2.4rem 4rem;
      background: $color-main--white;
      border-radius: 1.0rem;

      @include tablet{
        padding: 2.4rem 1.6rem;
      }
    }

    &__balance-current{
      font-style: normal;
      font-weight: 600;
      font-size: 2.6rem;
      line-height: 2.0rem;

      color: $color-main--black;

      margin-top: 2.4rem;
      margin-bottom: 1.2rem;
    }

    &__balance-check{
      font-weight: normal;
      font-size: 1.4rem;
      line-height: 2.0rem;

      color: $color-main--darkgray;
    }

    &__icon{
      margin-bottom: 3rem;

      @include tablet{
        max-width: 11.4rem;
      }
    }
  }

  .personal-balance-history{
    &__text{
      font-size: 1.4rem;
      line-height: 2.0rem;
      text-align: center;
      &--orange{
        color: $color-main--orange;
      }
    }

    &__table{
      &-row{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        border-bottom: 0.1rem solid $color-main--lightgray;

        padding: 1.6rem 0;

        @include tablet{
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 1.2rem
        }

        &:first-child{
          padding-top: 0;
        }
      }

      &-ceil{

        p,span{
          @include font-size;
          font-weight: 500;

          color: $color-main--black;
        }

        span{
          display: block;
        }


        &--darkgray{
          p,span{
            color: $color-main--darkgray;
          }
        }

        &--green{
          p{
            color: $color-main--green;
          }

          span:last-child{
            color: $color-main--green;
          }
        }
      }
    }

    &__desktop-text{
      display: grid;
      @include tablet{
        display: none;
      }
    }

    &__mobile-text{
      display: none;
      @include tablet{
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      span:last-child{
        justify-self: flex-end;
      }
    }

  }
</style>
