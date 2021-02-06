<template>
    <section class="container">
      <div class="container__head">
        <h1>База знаний по маркетплейсам</h1>
      </div>
      <div class="wiki">
        <div class="wiki__content">
          <div class="wiki__content-wrapper">
            <h2>— Lorem ipsum dolor sit amet, consectetur adipisicing.</h2>
            <ul>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
            </ul>
          </div>

          <div class="wiki__content-wrapper">
            <h2>— Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
            <ul>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
              <li><a href="https://www.google.com/" target="_blank">Lorem ipsum dolor sit amet.</a></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
</template>

<script>
    export default {
      name: "wiki",
      middleware: ['auth'],
      head: () => {
        return {
          title: 'База знаний по маркетплейсам на site.ru'
        }
      },
    }
</script>

<style lang="scss">
  .wiki{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    position: relative;

    &__content{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__content-wrapper{
      width: 100%;
      height: auto;

      padding: 2.4rem 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      background-color: $color-main--white;
      border-radius: 1rem;

      &:not(:first-of-type){
        margin-top: 3.2rem;
      }

      h2{
        margin-bottom: 1.6rem;

        font-size: 1.6rem;
        color: $black-main;

        font-weight: 600;

        @include mobile{
          font-size: 1.4rem;
        }
      }

      ul{
        padding-left: 2.2rem;
      }

      li{
        &:not(:first-of-type){
          margin-top: 1.2rem;

          @include mobile{
            margin-top: 0.8rem;
          }
        }
      }

      a{
        &:hover{
          text-decoration: none;
        }
      }

      li, a{
        font-size: 1.4rem;
        color: $black-main;
        word-break: break-word;
      }
    }
  }
</style>
