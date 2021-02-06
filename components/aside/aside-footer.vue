<template>
  <div class="sidebar-footer">
    <a href="mailto:aaa@mail.ru">lorem.ru</a>
    <a href="tel:+799999999999">+7-999-999-9-999</a>
    <p class="sidebar-footer__version">Ver X.X.X от 99.99.9999</p>
  </div>
</template>

<script>
  export default {
    name: "aside-footer"
  }
</script>

<style lang="scss">
  .sidebar-footer{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;

    overflow: hidden;

    margin-top: 1.2rem;

    a{
      font-size: 1.6rem;
      line-height: 2rem;
      font-weight: 500;
      text-decoration: none;
      color: $color-main--black;
      white-space: nowrap;

      @include laptop {
        font-size: 1.4rem;
      }

      &:not(:first-of-type){
        margin-top: 0.8rem;
      }
    }

    &__version{
      margin-top: 1.6rem;

      font-size: 1.2rem;
      line-height: 2rem;
      color: $color-main--darkgray;
      white-space: nowrap;

      @media (max-height: 540px) {
        margin-top: 0rem;
      }

      @include laptop {
        font-size: 1rem;
      }
    }
  }
</style>
