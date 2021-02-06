<template>
  <section class="container">
    <div class="container__head">
      <h1>Расчёт размера коробок по размеру упаковки товара, до 1 куб.м</h1>
    </div>
    <div class="package-calculator">
      <div class="container__inner package-calculator-helper">
        <p class="main-text text-color-darkgray">Рекомендации по параметрам коробок</p>
        <ul>
          <li class="text-color-darkgray">
            <span>Максимальный</span>
            размер: 60 × 40 × 40 см <br/>
            <span>Минимальный </span>
            размер: 15 × 10 × 10 см
          </li>
          <li class="text-color-darkgray">
            <span>Максимальный</span>
            вес одного товара : 10 кг <br/>
            <span>Минимальный </span>
            вес одного товара: 200 гр</li>
        </ul>
      </div>

      <div class="package-calculator-form container__inner">
        <fieldset class="package-calculator-form__wrapper">
          <p class="package-calculator-form__title text-color-darkgray">Характеристики товара</p>
          <div class="package-calculator-form__size-area">
            <input-text
              :class="{'input-text--error': !IsCorrectPackageSize }"
              :id="'package-width'"
              :name="'package-width'"
              :type="'number'"
              v-model.number="PackageWidth"
            />
            <span class="package-calculator-form__divisor">x</span>
            <input-text
              :class="{'input-text--error': !IsCorrectPackageSize}"
              :id="'package-height'"
              :name="'package-height'"
              :type="'number'"
              v-model.number="PackageHeight"
            />
            <span class="package-calculator-form__divisor">x</span>
            <input-text
              :class="{'input-text--error': !IsCorrectPackageSize }"
              :id="'package-length'"
              :name="'package-length'"
              :type="'number'"
              :decimal="true"
              v-model.number="PackageLength"
            />
            <span class="package-calculator-form__divisor">, см</span>
          </div>
        </fieldset>

        <fieldset class="package-calculator-form__wrapper">
          <div class="package-calculator-form__row">
            <input-text
              :class="{'input-text--error': PackageWeight === 0 || PackageWeight === '' }"
              :id="'package-weight'"
              :name="'package-weight'"
              :title="'Вес одного товара, гр'"
              :type="'number'"
              v-model.number="PackageWeight"
            />

            <input-text
              :class="{'input-text--error': PackageCount === 0 || PackageCount === ''}"
              :id="'package-count'"
              :name="'package-count'"
              :title="'Количество товаров, шт'"
              v-mask="'#####'"
              v-model.number="PackageCount"
            />
          </div>


          <div class="package-calculator-form__error-row"
               :class="{'package-calculator-form__error-row--active':
               !IsCorrectPackageSize || PackageWeight === 0 || PackageWeight === '' || PackageCount === 0 || PackageCount === ''}"
          >
            <p v-if="PackageSize > 96000">Превышен максимальный размер товара</p>
            <p v-if="PackageSize === 0">Размерность товара не может быть равна нулю или быть пустой</p>
            <p v-if="PackageWeight === 0 || PackageWeight === ''">Вес товара не может быть равен нулю или быть пустым</p>
            <p v-if="PackageCount === 0 || PackageCount === ''">Количество товара не может быть равно нулю или быть пустым</p>
          </div>
        </fieldset>
      </div>

      <div class="package-calculator-result package-calculator-result--success container__inner">
        <p class="main-title text-color-white">Результаты расчёта</p>

        <div class="package-calculator-result__content">
          <p class="package-calculator-result__sub-title">Информация о поставке</p>

          <ul class="package-calculator-result__wrapper">
            <li>
              <span>Объём одной коробки: </span>
              <span>{{ PackageSize / 1000000 }}  м³</span>
            </li>
            <li>
              <span>Вес одной коробки: </span>
              <span>{{ PackageWeight / 1000 }}  кг</span>
            </li>
            <li>
              <span>Общий объём поставки: </span>
              <span class="bold">{{( PackageAllSize / 1000000 ).toLocaleString().replace(/,/, '.')}}  м³</span>
            </li>
            <li>
              <span>Общий вес поставки: </span>
              <span class="bold">{{ PackageAllWeight.toLocaleString().replace(/,/, '.') }}  кг</span>
            </li>
          </ul>
        </div>

        <div class="package-calculator-result__content">
          <p class="package-calculator-result__sub-title">Рекомендуемые коробки</p>

          <ul class="package-calculator-result__inner"
              v-if="RecommendedPackages.length > 0"
              v-for="(RecommendedPackage, index) in RecommendedPackages"
              :key="`RecommendedPackage-${index}`"
          >
            <li>
              <span>Размер: </span>
              <span class="bold">
                {{ RecommendedPackage.sizes[0] + ' x ' + RecommendedPackage.sizes[1] + ' x ' + RecommendedPackage.sizes[2] + ' см'}}
              </span>
            </li>
            <li>
              <span>Коробки: </span>
              <span class="bold">
                {{ RecommendedPackage.boxCount }} шт
              </span>
            </li>
            <li>
              <span>Товар: </span>
              <span v-if="RecommendedPackage.prodInOneBox.max * RecommendedPackage.boxCount - PackageCount === 0">
                1 х {{ PackageCount }} шт
              </span>
              <span class="package-calculator-result__detail-info align-end" v-else-if="RecommendedPackage.boxCount === 1" >
                <span>1 х {{ PackageCount }} шт</span>
                <span>можно добавить {{RecommendedPackage.prodInOneBox.max * RecommendedPackage.boxCount - PackageCount }} шт</span>
              </span>
              <span class="package-calculator-result__detail-info align-end" v-else >
                <span>{{RecommendedPackage.boxCount -1}} х {{ RecommendedPackage.prodInOneBox.max }} шт</span>
                <span>1 х {{PackageCount - RecommendedPackage.prodInOneBox.max * (RecommendedPackage.boxCount - 1) }} шт</span>
                <span>можно добавить {{RecommendedPackage.prodInOneBox.max * RecommendedPackage.boxCount - PackageCount }} шт</span>
              </span>
            </li>
            <li>
              <span>Объём коробок: </span>
              <span class="package-calculator-result__detail-info">
                <span class="bold">{{( RecommendedPackage.size / Math.pow(10, 6) * RecommendedPackage.boxCount ).toLocaleString().replace(/,/, '.') }} м³</span>
                <span>{{RecommendedPackage.boxCount}} х {{( RecommendedPackage.size / Math.pow(10, 6)).toLocaleString().replace(/,/, '.') }} м³</span>

              </span>
            </li>
          </ul>

        </div>
      </div>

      <div class="package-calculator-btn-area" v-if="false">
        <div class="btn-main btn--green package-calculator-btn-area__btn">
          <svg-icon name="plus"/>
          Добавить товар
        </div>
        <span class="package-calculator-btn-area__text text-color-darkgray">В упаковке другого размера</span>
      </div>
    </div>
  </section>
</template>

<script>
  import InputText from '../../../components/control-elements/input-text';
  import InputNumber from '../../../components/control-elements/input-number';

  import { mask } from 'vue-the-mask';

  export default {
    name: 'package-calculator',
    components: { InputText, InputNumber},
    directives: { mask },
    head: () => {
      return {
        title: 'Расчёт размера коробок по размеру'
      }
    },
    data: () => {
      return {
        PackageWidth: 16,
        PackageHeight: 8,
        PackageLength: 1,
        PackageWeight: 20,
        PackageCount: 90,
        DefaultSizes: [
          {
            sizes: [21.5, 15.0, 21.5],
            size: 6933.750,
          },
          {
            sizes: [60, 40, 40],
            size: 96000,
          },
          {
            sizes: [40, 40, 30],
            size: 48000,
          },
          {
            sizes: [27.0, 20.0, 19.5],
            size: 10530.000,
          },
          {
            sizes: [30.5, 22.0, 12.5],
            size: 8387.500,
          },
          {
            sizes: [30.5, 22.0, 25.0],
            size: 16775.000,
          },
          {
            sizes: [25.0, 25.0, 15.0],
            size: 9375.000,
          },
          {
            sizes: [34.0, 20.0, 20.0],
            size: 13600.000,
          },
          {
            sizes: [30.5, 20.5, 21.0],
            size: 13130.250,
          },
          {
            sizes: [38.0, 28.5, 9.5],
            size: 10288.500,
          },
          {
            sizes: [35.5, 24.0, 12.5],
            size: 10650.000,
          },
          {
            sizes: [38.0, 28.5, 9.5],
            size: 10288.500,
          },
          {
            sizes: [38.0, 22.8, 28.7],
            size: 24865.680,
          },
          {
            sizes: [36.5, 32.5, 37.5],
            size: 44484.375,
          },
        ],
        LocationOption: [
          [0, 1, 2],
          [0, 2, 1],
          [1, 0, 2],
          [1, 2, 0],
          [2, 0, 1],
          [2, 1, 0],
        ],
        packages: [],
        WallWidth: 0.5,
      }
    },
    mounted() {
      // Сортировка коробок по объёму
      this.DefaultSizes.sort((a,b) => a.size - b.size).reverse()
    },
    computed: {
      UserSizes(){
        let UserData = [Number(this.PackageWidth), Number(this.PackageHeight), Number(this.PackageLength)]
        return UserData.sort((a,b) => b - a)  // Сортирует от большего к меньшему значение
      },

      /* Массив DefaultSizes и UserSizes к этому моменту уже отсортированы от большего к меньшему
      * свойство фильтрует коробки которые меньше по габаритному размеру чем товар
      * */
      DefaultSizesFiltered(){
        return this.DefaultSizes
          .filter(item => item.sizes[0] >= this.UserSizes[0])
          .filter(item => item.sizes[1] >= this.UserSizes[1])
          .filter(item => item.sizes[2] >= this.UserSizes[2])
          .reverse()
      },

      PackageSize(){
        return parseInt(this.PackageWidth * this.PackageHeight * this.PackageLength); // Объём пользовательского товара
      },
      IsCorrectPackageSize(){
        return (this.PackageSize <= 96000 && this.PackageSize > 0)
      },
      PackageAllSize(){
        const AllSize = (this.PackageWidth * this.PackageHeight * this.PackageLength) * parseFloat(this.PackageCount);
        return !isNaN(AllSize) ? AllSize : 0;
      },
      PackageAllWeight(){
        const AllWeight = parseInt(this.PackageCount) * parseInt(this.PackageWeight) / 1000;
        return !isNaN(AllWeight) ? AllWeight : 0;
      },
      RecommendedPackages(){
        if (!this.PackageCount || this.PackageAllSize == 0){
          return []
        }
        let packages = this.DefaultSizesFiltered

        /* Количество товара влезающего в одну коробку */
        packages.map(el => Object.assign(el, {
          prodInOneBox: this.CalcPackageCount(el.sizes),
        }))

        /* Количество коробок что бы поместился весь товар */
        packages.map(el => Object.assign(el, {
          boxCount: Math.ceil(this.PackageCount / el.prodInOneBox.max),
        }))

        /* EmptyPlace Заполненность коробки в кэфициенте. умножение на  el.boxCount
        * т.к. приоритет если всё влезет в 1 коробку */
        packages.map(el => Object.assign(el, {
          EmptyPlace: ((el.size * el.boxCount) / this.PackageAllSize ) * el.boxCount,
        }))

        packages.sort((a,b) => b.EmptyPlace - a.EmptyPlace).reverse();
        // Сортировка по заполненности коробки от максимальной заполненности к наименьшей

        return packages;
      }
    },
    methods: {
      CalcPackageCount(boxSizes){
        let rezult = {
          index: '',
          itemCountInXYZ: [],
          max: 0,
        };

        this.LocationOption.forEach((item, index) => {
          let itemCountInXYZ = [];
          let max = 1; // 1 т.к. происходит не сложение а умножение 3-х плоскостей
          itemCountInXYZ.push( Math.floor((boxSizes[0] - this.WallWidth) / this.UserSizes[item[0]]) );
          itemCountInXYZ.push( Math.floor((boxSizes[1] - this.WallWidth) / this.UserSizes[item[1]]) );
          itemCountInXYZ.push( Math.floor((boxSizes[2] - this.WallWidth) / this.UserSizes[item[2]]) );

          itemCountInXYZ.forEach((item) => { max *= item })

          if (max > rezult.max){
            rezult.max = max;
            rezult.itemCountInXYZ = [this.UserSizes[item[0]], this.UserSizes[item[1]], this.UserSizes[item[2]]];
            rezult.index = index;
          }
        })

        return rezult
      },
    },
  }
</script>

<style lang="scss">
  @import "assets/styles/control-elements/input-text";

  .package-calculator{
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 20rem 24rem;
    grid-template-areas: "helper rezult"
    "form rezult"
    "btn-area rezult";
    grid-column-gap: 4rem;
    align-items: flex-start;

    @include tablet{
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-gap: 1.6rem;
      grid-template-areas:
        "helper"
        "form"
        "btn-area"
        "rezult";
    }
  }

  .package-calculator-helper{
    @import "./assets/styles/modules/unordered-list";

    ul{
      margin-top: 1.6rem;

      grid-gap: 1.6rem;

      li{
        line-height: 2rem;
        span{
          font-size: 1.4rem;
          line-height: 2rem;
          font-weight: 500;
        }

      }
    }

    grid-area: helper;
  }

  .package-calculator-form{
    width: 100%;
    height: auto;

    display: grid;
    grid-area: form;
    grid-template-columns: 1fr;
    grid-row-gap: 1.6rem;
    align-content: flex-start;

    &__wrapper{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__row{
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      max-width: 40rem;
      grid-gap: 4rem
    }

    &__size-area{
      display: grid;
      grid-template-columns: 5.2rem 0.8rem 5.2rem 0.8rem 5.2rem 3.2rem;
      grid-gap: 0.8rem;

      .input-text input{
        padding: 0.2rem 0;
      }
    }

    &__divisor{
      margin-top: 0.2rem;
      height: 2rem;
      font-size: 1.4rem;
      display: block;
    }

    &__error-row{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      p{
        display: block;
        color: $color-main--red;
        font-size: 1.2rem;

        opacity: 0;
        transition: opacity ease 0.35s;
      }

      &--active{
        p{
          opacity: 1;
        }
      }
    }

    &__title{
      margin-bottom: 1.6rem;
      font-size: 1.4rem;
    }
  }

  .package-calculator-btn-area{
    grid-area: btn-area;
    display: grid;
    grid-template-columns: 22rem auto;
    align-items: center;
    grid-gap: 1.6rem;

    margin-top: 3.2rem;

    &__text{
      font-size: 1.2rem;
    }
  }

  .package-calculator-result{
    width: auto;
    height: auto;

    display: grid;
    grid-area: rezult;
    grid-template-columns: 1fr;
    grid-row-gap: 1.6rem;
    align-items: flex-start;
    align-content: flex-start;

    &__sub-title{
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.0rem;
      color: white;
    }

    &__wrapper{
      width: auto;
      height: auto;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 0.8rem;


    }

    li{
      display: flex;
      justify-content: space-between;
      color: white;
      font-weight: normal;
      font-size: 1.2rem;
      line-height: 1.6rem;

      span{
        color: white;
        font-weight: normal;
        font-size: 1.2rem;
        line-height: 1.6rem;
      }

      span.bold{
        font-weight: bold;
      }
    }

    &__content{
      width: auto;
      height: auto;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }

    &__inner{
      width: auto;
      height: auto;

      padding: 1.2rem;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1.2rem;

      border: 0.1rem solid rgba(255, 255, 255, 0.3);
      border-radius: 1rem;
    }

    &__detail-info{
      display: flex;
      flex-direction: column;

      span{
        text-align: right;
      }
    }

    &--success{
      background-color: $color-main--green;
    }

    &__bold{
      font-weight: bold;
    }
  }
</style>

