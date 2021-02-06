<template>
  <nav class="sidebar-navigation">
    <ul>

      <li class="sidebar-item sidebar-item--active" @click="ToggleSidebarItem($event)">
        <div class="sidebar-item__container">
          <nuxt-link to="/tools" :active-class="'sidebar-item__link--active'" class='sidebar-item__link' exact>
            <svg-icon name="aside-icon--work" class="sidebar-item__main-icon"/>
            <span>Инструменты</span>
          </nuxt-link>
          <button type="button" aria-label="toggle-tools-list" class="sidebar-item__toggle-btn">
            <svg-icon name="arrow-small" class="sidebar-item__toggle-icon"/>
          </button>
        </div>
        <div class="sidebar-item__wrapper">
          <ul>
            <li>
              <nuxt-link to="/tools/package-calculator" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>Расчёт коробок</nuxt-link>
            </li>
          </ul>
        </div>
      </li>

      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/wiki" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--question" class="sidebar-item__main-icon"/>
            <span>База знаний</span>
          </nuxt-link>
        </div>
      </li>

      <li class="sidebar-item sidebar-item--active" @click="ToggleSidebarItem($event)">
        <div class="sidebar-item__container">
          <p class='sidebar-item__link'>
            <svg-icon name="aside-icon--service" class="sidebar-item__main-icon"/>
            <span>Заказать услуги</span>
          </p>
          <button type="button" aria-label="toggle-tools-list" class="sidebar-item__toggle-btn">
            <svg-icon name="arrow-small" class="sidebar-item__toggle-icon"/>
          </button>
        </div>
        <div class="sidebar-item__wrapper">
          <ul>
            <li>
              <nuxt-link to="/service" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
                Услуги
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/faq/reviews" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
                Ответы на вопросы
              </nuxt-link>
            </li>

          </ul>
        </div>
      </li>

      <li class="sidebar-item sidebar-item--mobile">
        <div class="sidebar-item__container">
          <button type="button" class='btn-main btn--transparent sidebar-item__link' @click="LogoutUser">
            <svg-icon name="header--logout" class="sidebar-item__main-icon"/>
            <span>Выход</span>
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'aside-navigation',
    methods: {
      ...mapActions({
        LogoutUser: 'user/LogoutUser'
      }),
      ToggleSidebarItem(event){
        const elem = event.target;
        const RootElem = event.currentTarget;
        const HiddenWrapper = RootElem.querySelector('.sidebar-item__wrapper');
        const HiddenWrapperContent = HiddenWrapper.querySelector('ul');
        const HiddenWrapperMarginTop = 12;

        if (elem.classList.contains('sidebar-item__toggle-btn')){
          if (RootElem.classList.contains('sidebar-item--active')){
            HiddenWrapper.style.maxHeight = `${0}px`;
            HiddenWrapper.style.marginTop = `${0}px`;
          } else {
            HiddenWrapper.style.maxHeight = `${HiddenWrapperContent.clientHeight}px`;
            HiddenWrapper.style.marginTop = `${HiddenWrapperMarginTop}px`;
          }

          RootElem.classList.toggle('sidebar-item--active');
        }
      }
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
        UserRoadMapData: 'user/road-map/UserRoadMapData'
      }),
    }
  }
</script>

<style lang="scss">
  .sidebar-navigation{
    width: 100%;
    height: auto;

    ul{
      width: 100%;
      height: auto;
    }
  }

  .sidebar-item{
    width: 100%;
    min-height: 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    position: relative;
    transition: height ease 0s 0.35s;

    span{
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      color: inherit;
      white-space: break-spaces;
    }

    p{
      cursor: default;
    }

    &:not(:first-of-type){
      margin-top: 2.4rem;

      @media (max-height: 540px) {
        margin-top: 1.2rem;
      }

      @media (max-height: 420px) {
        margin-top: 0.4rem;
      }

    }

    &__link{
      width: auto;
      height: inherit;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      font-size: 1.6rem;
      line-height: 2.4rem;
      font-weight: 500;
      color: $color-main--darkgray;
      text-decoration: none;
      white-space: nowrap;

      transition: color ease 0.35s;

      @include laptop {
        font-size: 1.4rem;
        line-height: 2rem;
      }

      svg{
        width: 1.6rem;
        height: 1.6rem;

        fill: $color-main--middlegray;
      }

      span{
        padding-top: 0.3rem;
      }

      &:hover{
        color: $color-main--black;

        .sidebar-item__main-icon{
          fill: $color-main--black;
        }
      }

      &:after{
        content: '';

        width: 0.6rem;
        height: 2.4rem;

        display: block;

        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;

        z-index: 2;

        border-radius: 4px 0 0 4px;
        background-color: $color-main--red;

        opacity: 0;

        transition: opacity ease 0.35s;
      }

      &--active{
        color: $color-main--red!important;
        transition: color ease 0.35s;

        .sidebar-item__main-icon{
          fill: $color-main--red!important;
        }

        &:hover{
          svg{
            fill: $color-main--red;
          }
          a{
            color: $black-main;
          }
        }

        &:after{
          opacity: 1!important;
        }

      }

      &--disabled{
        cursor: default;
        pointer-events: none;

        &:hover{
          color: $color-main--darkgray;

          .sidebar-item__main-icon{
            fill: $color-main--middlegray;
          }
        }
      }
    }

    &__link.btn-main{
      padding-left: 0;
      padding-right: 0;
    }

    &__container{
      width: 100%;
      min-height: inherit;

      padding-right: 4.8rem;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      position: relative;
    }

    &__main-icon{
      width: 2.4rem;
      height: 2.4rem;

      min-width: 2.4rem;
      min-height: 2.4rem;

      fill: $color-main--darkgray;

      margin-right: 0.8rem;

      transition: fill ease 0.35s;

      @include laptop {
        width: 2rem;
        height: 2rem;

        min-width: 2rem;
        min-height: 2rem;
      }
    }

    &__info-icon{
      margin-left: 1.2rem;
    }

    &__toggle-btn{
      width: 2.4rem;
      height: 2.4rem;

      margin-left: 1rem;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: transparent;
      border: none;
      outline: none;
      z-index: 3;

      &:hover{
        .sidebar-item__toggle-icon{
          fill: $color-main--red;
        }
      }
    }

    &__toggle-icon{
      width: 1.2rem;
      height: 0.75rem;

      fill: $color-main--darkgray;

      transform: rotate(-90deg);

      pointer-events: none;

      transition: transform ease 0.35s, fill ease 0.35s;
    }

    &__wrapper{
      width: 100%;
      height: auto;

      max-height: 0;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      overflow: hidden;

      position: relative;

      transition: max-height ease 0.35s, margin-top ease 0.35s;

      ul{
        width: 100%;
        height: auto;

        padding-left: calc(2.4rem + 0.8rem);

        @include laptop {
          padding-left: calc(2rem + 0.8rem);
        }
      }

      li{
        width: 100%;
        height: auto;

        position: relative;

        &:not(:first-of-type){
          margin-top: 0.8rem;
        }
      }

      a{
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;

        @include laptop {
          line-height: 2.4rem;
        }
      }
    }

    &--active{
      .sidebar-item__toggle-icon{
        transform: rotate(90deg);
      }

      .sidebar-item__wrapper{
        max-height: 120px;
        margin-top: 12px;
      }
    }

    &--mobile{
      display: none;

      .btn--transparent{
        svg{
          margin-right: 0.8rem;
        }

        span{
          padding-top: 0;
          padding-bottom: 0.1rem;
        }
      }

      @include mobile{
        display: block;
      }
    }
  }
</style>
