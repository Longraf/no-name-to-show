<template>
  <div class="container">
    <div class="container__head profile__head">
      <h1>Мой профиль</h1>
    </div>

    <profile-tabs />

    <div class="personal-info" :class="loading">
      <!-- TODO Добавить проверку на наличие данных поля Company, после включения этого поля. -->
      <form ref="personalInfoForm" @submit.prevent v-if="Object.keys(User).length !== 0">
        <fieldset class="personal-info__card">
          <input-text
            :type="'text'"
            :title="'Телефон'"
            :name="'phone'"
            :id="'phone'"
            :disabled="true"
            :required="true"
            :lazy="true"
            v-model="phone"
            v-mask="'+7 (###) ###-##-##'"
          />

          <input-suggestion
            :class="{ 'input-text--warning': $v.name.$error }"
            :helper-text="$v.name.$error ? 'Заполните обязательное поле' : ''"
            :title="'Имя'"
            :name="'name'"
            :id="'name'"
            :options="suggestions.NamesList"
            :required="true"
            :lazy="true"
            :ref="'suggestion-name'"
            :inputClass="'input-text--required'"
            v-model="name"
            @input-suggestion="ChangeName($event)"
          />

          <input-text
            :class="{ 'input-text--warning': $v.email.$error }"
            :helper-text="$v.email.$error ? 'Укажите корректный Email' : ''"
            :type="'email'"
            :title="'E-mail'"
            :name="'email'"
            :id="'email'"
            :required="true"
            :lazy="true"
            v-model="email"
          />

          <input-text
            :type="'text'"
            :title="'Компания/бренд'"
            :name="'brand'"
            :id="'brand'"
            :lazy="true"
            v-model="brand"
          />

          <input-text
            :type="'text'"
            :title="'Сайт'"
            :name="'url'"
            :id="'url'"
            :lazy="true"
            v-model="url"
          />
        </fieldset>

        <!--
        <div class="personal-info__card">
          <h2>Реквизиты</h2>

          <input-text
            :type="'text'"
            :title="'Название компании'"
            :name="'company-name'"
            :id="'company-name'"
            :lazy="true"
            v-model.lazy="CompanyName"
          />

          <input-text
            :type="'number'"
            :title="'ИНН'"
            :name="'inn'"
            :id="'inn'"
            :lazy="true"
            v-model.lazy="inn"
          />

          <input-text
            :type="'number'"
            :title="'ОГРН'"
            :name="'ogrn'"
            :id="'ogrn'"
            :lazy="true"
            v-model.lazy="ogrn"
          />

          <input-text
            :type="'number'"
            :title="'КПП (для ООО)'"
            :name="'kpp'"
            :id="'kpp'"
            :lazy="true"
            v-model.lazy="kpp"
          />

          <input-text
            :type="'text'"
            :title="'Юридический адрес'"
            :name="'legal-address'"
            :id="'legal-address'"
            :lazy="true"
            v-model.lazy="LegalAddress"
          />

          <input-text
            :type="'text'"
            :title="'Почтовый адрес'"
            :name="'postal-address'"
            :id="'postal-address'"
            :lazy="true"
            v-model.lazy="PostalAddress"
          />

          <input-text
            :type="'number'"
            :title="'Расчётный счёт'"
            :name="'payment-account'"
            :id="'payment-account'"
            :lazy="true"
            v-model.lazy="PaymentAccount"
          />

          <input-text
            :type="'number'"
            :title="'Корреспондентский счёт'"
            :name="'correspondent-account'"
            :id="'correspondent-account'"
            :lazy="true"
            v-model.lazy="CorrespondentAccount"
          />

          <input-text
            :type="'number'"
            :title="'БИК банка'"
            :name="'bic'"
            :id="'bic'"
            :lazy="true"
            v-model.lazy="bic"
          />
        </div>
        -->
      </form>

      <div class="error" v-else>
        <div class="error__content">
          <div class="error__content-text">
            Ой... Не удалось получить данные пользователя. Возвращайтесь и продавайте свои товары с нами!
          </div>
          <nuxt-link class="error__btn btn-main btn--green" to="/products">Добавить новый товар</nuxt-link>
        </div>
        <div class="error__image">
          <svg-icon name="404"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { required, email, minLength } from "vuelidate/lib/validators";

  import { mask } from 'vue-the-mask';

  import InputSuggestion from '../../components/control-elements/input-suggestion';
  import InputText from "../../components/control-elements/input-text";
  import ProfileTabs from "../../components/profile-tabs"

  export default {
    name: 'user',
    head: () => {
      return {
        title: 'Личные данные, профиль'
      }
    },
    components: { InputText, InputSuggestion, ProfileTabs },
    directives: { mask },
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
        suggestions: {
          NamesList: [],
        },
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
      ...mapActions({
        UpdateUserData: 'user/UpdateUserData',
        UpdateCompanyData: 'user/UpdateCompanyData',
      }),
      ChangeName(value) {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
        const token = 'e1f82ee43480183d9bd804b2fd1c6ab1106a2316';

        this.$axios.post(url, {
          query: value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
        }).then(response => {
          this.suggestions.NamesList = response.data.suggestions.map(el => el.data.name).filter(el => el !== null);
        });
      },
    },
    computed: {
      ...mapGetters({
        User: 'user/User',
        company: 'user/Company',
        LoadingState: 'user/LoadingState',
      }),
      name: {
        get() {
          return this.User.name;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              name: value
            }
          });

          this.$v.name.$touch();
        },
      },
      brand: {
        get() {
          return this.User.brand;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              brand: value
            }
          });
        },
      },
      phone: {
        get() {
          return this.User.phone;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              phone: value
            }
          });
        },
      },
      url: {
        get() {
          return this.User.url;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              url: value
            }
          });
        },
      },
      email: {
        get() {
          return this.User.email;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              email: value
            }
          });

          this.$v.email.$touch();
        },
      },

      CompanyName: {
        get() {
          return this.company.companyName;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              CompanyName: value
            }
          });
        },
      },
      inn: {
        get() {
          return this.company.inn;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              inn: value
            }
          });
        },
      },
      ogrn: {
        get() {
          return this.company.ogrn;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              ogrn: value
            }
          });
        },
      },
      kpp: {
        get() {
          return this.company.kpp;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              kpp: value
            }
          });
        },
      },
      LegalAddress: {
        get() {
          return this.company.legalAddress;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              LegalAddress: value
            }
          });
        },
      },
      PostalAddress: {
        get() {
          return this.company.postalAddress;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              PostalAddress: value
            }
          });
        },
      },
      PaymentAccount: {
        get() {
          return this.company.paymentAccount;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              PaymentAccount: value
            }
          });
        },
      },
      CorrespondentAccount: {
        get() {
          return this.company.correspondentAccount;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              CorrespondentAccount: value
            }
          });
        },
      },
      bic: {
        get() {
          return this.company.bic;
        },
        set(value) {
          this.UpdateCompanyData({
            bic: {
              CompanyName: value
            }
          });
        },
      },
    },
    validations(){
      return {
        email: {
          required,
          email
        },
        name: {
          required,
          minLength: minLength(3),
        }
      };
    }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/control-elements/input-text";

  .personal-info {
    width: 100%;
    height: auto;

    &__card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 8rem;
      grid-row-gap: 1rem;
      margin-bottom: 1.6rem;
      padding: 2.4rem 4rem;
      background-color: $color-main--white;
      border-radius: 10px;

      @include mobile {
        grid-template-columns: 1fr;
        grid-row-gap: 0.5rem;
        padding: 2.4rem 1.3rem 0.7rem;
      }

      h2 {
        grid-column: 1 / 3;
        margin-bottom: 1.4rem;

        font-weight: 700;
        font-size: 1.4rem;
        line-height: 2rem;
        color: $color-main--darkgray;

        @include mobile {
          grid-column: auto;
          margin-bottom: 1.9rem;
        }
      }
    }

    &__form-button {
      min-width: 19.8rem;
      min-height: 4.4rem;
      margin-top: 2.5rem;
      margin-left: auto;

      font-size: 1.4rem;
      line-height: 2rem;

      @include mobile {
        width: 100%;
        margin-left: 0;
      }
    }

    .input-text input:disabled{
      color: $color-main--darkgray;
    }

    &.page-loading{
      .input-text{
        opacity: 1;
        @extend %skeleton-animate;
      }
    }

    &.page-loading--removing{
      .input-text{
        @extend %skeleton-animate--removing;
      }
    }
  }
</style>
