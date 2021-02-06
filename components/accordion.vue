<template>
  <div class="accordion">
    <div
      :class="{'accordion__head--active' : state}"
      class="accordion__head"
      @click="state ? CloseAccordion() : OpenAccordion()">
      <slot name="accordion-head"/>
      <div class="accordion__arrow">
        <svg-icon name="arrow-in-cirсle"/>
      </div>
    </div>

    <div class="accordion__content">
      <p>
        <slot name="accordion-content"/>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accordion",
    data: () => {
      return {
        AnimationTime: 500,
        state: false,
      }
    },
    methods: {
      OpenAccordion(){
        if (this.AccordionHead && this.AccordionContent){
          this.state = true;

          this.AccordionContent.style.transition = `max-height ease ${this.AnimationTime}ms`;
          this.AccordionContent.style.maxHeight = `${this.AccordionContent.scrollHeight / 10}rem`;
          this.AccordionHead.style.pointerEvents = 'none';

          setTimeout(() => {
            this.AccordionContent.style.overflow = 'unset';
            this.AccordionHead.style.pointerEvents = 'auto';
          }, this.AnimationTime);
        }
      },
      CloseAccordion(){
        if (this.AccordionHead && this.AccordionContent){
          this.state = false;

          this.AccordionContent.style.transition = `max-height ease ${this.AnimationTime}ms`;
          this.AccordionContent.style.maxHeight = '0';
          this.AccordionContent.style.overflow = 'hidden';
          this.AccordionHead.style.pointerEvents = 'none';

          setTimeout(() => {
            this.AccordionContent.removeAttribute('style');
            this.AccordionHead.style.pointerEvents = 'auto';
          }, this.AnimationTime);
        }
      },
    },
    computed: {
      AccordionHead(){
        return this.$el.querySelector('.accordion__head');
      },
      AccordionContent(){
        return this.$el.querySelector('.accordion__content');
      },
    },
  }
</script>

<style lang="scss">
  .accordion {
    border-bottom: 1px solid $color-main--lightgray;
  }

  .accordion__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;

    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $color-main--black;

    cursor: pointer;

    @include mobile {
      line-height: 2rem;
    }

    &--active{
      .accordion__arrow{
        transform: rotate(180deg);

        svg{
          fill: $color-main--red;
        }
      }
    }
  }

  .accordion__arrow {
    position: relative;
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 1rem;

    border: 0.1rem solid $color-main--lightgray;
    border-radius: 50%;

    transition: transform 0.5s, background-color 0.5s;


    svg {
      width: 100%;
      height: 100%;
      fill: $color-main--green;

      transition: transform 0.35s ease, fill 0.5s;
      transform: rotate(180deg);
    }
  }

  .accordion__content {
    max-height: 0;
    overflow: hidden;

    p {
      margin-bottom: 10px;

      font-size: 1.4rem;
      line-height: 2rem;
      color: $color-main--darkgray;
    }
  }
</style>
