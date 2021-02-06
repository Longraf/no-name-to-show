<template>
  <div class="table-usual reviews-table container__inner">
    <div class="table-usual__row table-usual__head">
      <span class="table-usual__ceil" v-for="title in ReviewsTitles">{{ title }}</span>
    </div>

    <div class="table-usual__list">
      <div
        v-for="(item, index) in ReviewsList"
        v-if="ShowSettings(item.state)"
        class="table-usual__item table-usual__row"
      >
        <div class="table-usual__ceil">
          <span class="table-usual__mobile-title">{{ ReviewsTitles[0] }}</span>
          <span class="table-usual__ceil-text main-text main-text--500">{{ item.dateBegin }}</span>
        </div>

        <div class="table-usual__ceil">
          <span class="table-usual__mobile-title">{{ ReviewsTitles[1] }}</span>
          <a :href="item.product.link" class="link">
            <svg-icon :name="item.product.iconName" class="reviews-table__product-icon"/>
            <span>{{ item.product.text }}</span>
          </a>
        </div>

        <div class="table-usual__ceil">
          <span class="table-usual__mobile-title">{{ ReviewsTitles[2] }}</span>
          <span class="table-usual__ceil-text table-usual__ceil-text--black">{{ item.reviewsNumber }}/{{ item.reviewsCount }}</span>
        </div>

        <div class="table-usual__ceil">
          <span class="table-usual__mobile-title">{{ ReviewsTitles[3] }}</span>
          <span
            :class="'text-color-' + stateColor(item.state)"
            class="table-usual__status-in-work main-text main-text--500">{{ item.state }}</span>
        </div>

        <div class="table-usual__ceil">
          <span class="table-usual__mobile-title">{{ ReviewsTitles[4] }}</span>
          <span class="table-usual__ceil-text main-text main-text--500">{{ item.dateEnd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "service-reviews-table",
    data: () => {
      return {
        ReviewsTitles: ['Дата заказа', 'Товар', 'Количество отзывов', 'Статус', 'Дата окончания'],
        ReviewsList: [
          {
            dateBegin: '22.09.2020',
            dateEnd: '22.09.2020',
            product: {link: '#', text: 'Ссылка на AliExpress\'', iconName: 'aliexpress-icon'},
            reviewsNumber: 1,
            reviewsCount: 15,
            state: 'В работе'
          },{
            dateBegin: '20.09.2020',
            dateEnd: '...',
            product: {link: '#', text: 'Ссылка на AliExpress\'', iconName: 'aliexpress-icon'},
            reviewsNumber: 0,
            reviewsCount: 15,
            state: 'В обработке'
          },{
            dateBegin: '18.12.2020',
            dateEnd: '18.12.2020',
            product: {link: '#', text: 'Ссылка на AliExpress', iconName: 'aliexpress-icon'},
            reviewsNumber: 14,
            reviewsCount: 15,
            state: 'В работе'
          },{
            dateBegin: '22.09.2020',
            dateEnd: '22.09.2020',
            product: {link: '#', text: 'Ссылка на AliExpress\'', iconName: 'aliexpress-icon'},
            reviewsNumber: 5,
            reviewsCount: 5,
            state: 'Выполнено'
          },
        ]
      }
    },
    props: {
      isDone: {
        type: Boolean
      },
    },
    methods: {
      stateColor(state) {
        switch (state) {
          case 'В работе': return 'orange'
            break;
          case 'В обработке': return 'darkgray'
            break;
          case 'Выполнено': return 'green'
            break;
          default: return 'black'
        }
      },
      ShowSettings(setting) {
        if (this.isDone ) {
          return setting === 'Выполнено'

        } else {
          return setting !== 'Выполнено'
        }
      }
    },
  }
</script>

<style lang="scss">
  @import './assets/styles/modules/table-usual';
</style>
