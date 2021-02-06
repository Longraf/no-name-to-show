<template>
  <transition name="ease-opacity">
    <div class="popup-withdrawal-balance" v-if="state" @click="close" ref="withdrawal-balance">
      <form class="popup-withdrawal-balance__wrapper" ref="pop-up-connect-marketplace__form" @submit.prevent>
        <button type="button" class="btn btn--transparent popup-withdrawal-balance__close-btn" @click.prevent="[state = false, $emit('close')]"
                title="Закрыть" :aria-label="'Кнопка закрытия окна подключения магазина '">
          <svg-icon class="popup-withdrawal-balance__close-ico" name="plus"/>
        </button>

        <h3 class="popup-withdrawal-balance__title">
          Выплата денег на банковскую карту
        </h3>
        <p class="popup-withdrawal-balance__text popup-withdrawal-balance__text--darkgray">Выплатим деньги в рублях. Карта должна быть выпущена российским банком
          Visa/ MasterCard/ Mir/ Maestro, иначе платеж не пройдет.
        </p>

        <div class="popup-withdrawal-balance__input-area">
          <input-text
            :id="'withdrawal-balance-card-number'"
            :name="'withdrawal-balance-card-number'"
            :title="'Номер карты'"
            :type="'text'"
            :required="true"
            v-model="CardNumber"
            :HelperText="$v.CardNumber.$error ? 'Введите номер карты' : ''"
            :class="{ 'input-text--error': $v.CardNumber.$error }"
          />
          <input-text
            :id="'withdrawal-balance-sum'"
            :name="'withdrawal-balance-sum'"
            :title="'Сумма'"
            :type="'text'"
            :required="true"
            v-model="Sum"
          />
        </div>

        <p class="popup-withdrawal-balance__text popup-withdrawal-balance__text--orange">Минимальная сумма для вывода — 299 ₽.</p>
        <p class="popup-withdrawal-balance__text popup-withdrawal-balance__text--orange">Комиссия — 3,5 %.</p>
        <button class="btn-main btn--green" @click="SubmitForm()">Вывести</button>

      </form>
    </div>
  </transition>
</template>

<script>
    import { mapActions } from 'vuex';
    import InputText from "./control-elements/input-text";
    import { required, between, minValue, numeric } from "vuelidate/lib/validators";

    export default {
        name: 'popup-withdrawal-balance',

        head: () => {
            return {
                title: 'Выплата денег на site.ru'
            }
        },
        components: { InputText },
        data: () => {
            return {
                state: false,
                CardNumber: '',
                Sum: '',
            }
        },
        methods: {
            ...mapActions({
            }),
            open(data){
                this.$emit('open');

                this.state = true;

                this.marketplace = data;

                document.body.style.overflow = 'hidden';
                document.body.style.height = '100vh';
            },
            close(event){
                if (event !== undefined && event !== null){
                    if (this.$refs['pop-up-connect-marketplace__inner'] && !this.$refs['pop-up-connect-marketplace__inner'].contains(event.target)){
                        this.$emit('close');

                        document.body.style.overflowY = 'auto';

                        this.state = false;
                    }
                }
            },
            SubmitForm(){
              console.log(this.$refs['pop-up-connect-marketplace__form']);
            }
        },
        validations(){
            return {
                CardNumber: {
                    required,
                    between: between(13, 19),
                    numeric
                },
                Sum: {
                    required,
                    minValue: minValue(299),
                    numeric
                }
            };
        }
    }
</script>

<style lang="scss">
  .popup-withdrawal-balance {
    width: 100vw;
    height: 100%;
    min-height: 100%;

    background-color: rgba(0, 0, 0, 0.3);

    margin-left: 0;
    padding-bottom: 3.2rem;

    z-index: 1002;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    overflow: auto;

    display: flex;
    align-self: flex-start;
    justify-content: center;

    @include mobile{
      padding-left: 0.8rem;
      padding-right: 0.8rem;
    }

    &__wrapper {
      width: 72rem;
      position: relative;

      padding: 4.8rem 4rem;
      margin-top: auto;
      margin-bottom: auto;

      background-color: $color-main--white;
      border-radius: 1rem;

      display: flex;
      align-self: flex-start;
      flex-direction: column;

      @include mobile {
        padding: 3.2rem 1.6rem;
      }
    }

    &__title{
      font-weight: 500;
      font-size: 2.0rem;

      margin-bottom: 2.4rem;

      @include mobile{
        margin-right: 6rem;
      }
    }

    &__text{
      font-size: 1.4rem;
      line-height: 2rem;

      &--orange{
        color: $color-main--orange;
      }

      &--darkgray{
        color: $color-main--darkgray;
      }
    }

    &__input-area{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 6rem;

      margin-top: 2.4rem;

      @include tablet{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 2.4rem;
      }
    }



    &__close {
      &-btn{
        padding: 0.6rem;
        margin-left: auto;

        position: absolute;
        top: 4.8rem;
        right: 4rem;

        @include tablet{
          top: 2.4rem;
          right: 1.6rem;
        }
      }
    }

    svg.popup-withdrawal-balance__close-ico{
      display: block;

      width: 2rem;
      height: 2rem;

      fill: $color-main--darkgray;

      cursor: pointer;

      margin-left: auto;

      transform: rotate(45deg);
    }

    .btn-main{
      width: 18.4rem;

      margin-top: 3.2rem;
    }
  }
</style>
