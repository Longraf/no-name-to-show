<template>
  <section class="container">
    <div class="container__head">
      <h1>Инструменты</h1>
    </div>
    <div class="tools">
      <nuxt-link class="tools-container" to="/tools/package-calculator">
        <p class="tools-container__title">Расчёт коробок</p>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  export default {
    name: "tools",
    head: () => {
      return {
        title: 'Инструменты site.ru'
      }
    },
  }

</script>

<style lang="scss">
  .tools{
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 4rem;
    grid-row-gap: 2.4rem;

    @include mobile{
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .tools-container{
    width: 100%;
    height: fit-content;

    padding: 2.4rem 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: white;
    border-radius: 1rem;

    text-decoration: none;

    &__title{
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
      color: $color-main--black;
    }

    &__nav-list{
      width: 100%;
      height: auto;

      margin-top: 1.6rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      li{
        &:not(:last-of-type){
          margin-bottom: 0.8rem;
        }
      }

      a{
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;
        text-decoration: none;

        transition: color ease 0.35s;

        &:hover{
          color: $color-main--green;
        }
      }
    }

    &--disabled{
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      cursor: default;

      p{
        margin-right: 1.2rem;

        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;
      }
      svg{
        width: 1.6rem;
        height: 1.6rem;

        fill: #CCCFE3;
      }
    }
  }
</style>
