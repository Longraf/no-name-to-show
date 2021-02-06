<template>
  <transition name="mobile-menu">
    <div class="mobile-menu" v-if="MobileMenuState" @click="CloseMobileMenu($event)">
      <div class="mobile-menu__wrapper" ref="mobile-menu__wrapper">
        <div class="mobile-menu__head">
          <svg-icon name="aside-logo--big"/>
        </div>

        <div class="mobile-menu__content">
          <aside-navigation />
        </div>

        <aside-footer />
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import AsideNavigation from "./aside/aside-navigation";
  import AsideFooter from "./aside/aside-footer";

  export default {
    name: 'mobile-menu',
    components: { AsideFooter, AsideNavigation },
    computed: {
      ...mapGetters({
        MobileMenuState: 'MobileMenuState'
      }),
    },
    methods: {
      ...mapMutations({
        ToggleMobileMenu: 'ToggleMobileMenu',
      }),
      CloseMobileMenu(event){
        if (this.$refs['mobile-menu__wrapper'] && !this.$refs['mobile-menu__wrapper'].contains(event.target)){
          this.ToggleMobileMenu();
        }
      }
    },
  }
</script>

<style lang="scss">
  .mobile-menu{
    display: none;
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1002;

    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.4);
    scrollbar-color: $color-main--green transparent;

    &::-webkit-scrollbar {
      background-color: transparent;
    }

    @include tablet{
      display: block;
    }

    &__head{
      width: auto;
      height: 6.4rem;

      padding-left: calc(2rem + 0.8rem);

      display: flex;
      justify-content: flex-start;
      align-items: center;

      background-color: white;

      svg{
        width: 8rem;
        height: 2rem;
      }
    }

    &__content{
      width: 100%;
      height: auto;

      margin-top: 1.6rem;
      margin-bottom: 1.6rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex-grow: 1;
    }

    &__wrapper{
      width: 25rem;
      height: auto;

      min-height: 100vh;

      padding-top: 1rem;
      padding-left: 3.2rem;
      padding-bottom: 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      position: absolute;
      top: 0;
      left: 0;

      background-color: white;
    }
  }
</style>
