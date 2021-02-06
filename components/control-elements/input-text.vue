<template>
  <div class="input-text" :class="{'input-text--required': required}">
    <label :for="id">
      <span v-if="title" class="input-text__title">
        {{ title }}
        <slot name="title" />
      </span>

      <div class="input-text__wrapper">
        <input
          :type="type"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          :ref="`input-text__${id}`"
          @input="ChangeValue($event)"
          @change="ChangeValueLazy($event)"
        >
        <span class="input-text__line" />
      </div>
      <span class="input-text__footer" :class="{'input-text__footer--active': HelperText && HelperText.length > 0}">
        <span class="input-text__helper-text">{{ HelperText }}</span>
      </span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'input-text',
    props: {
      name: {
        required: true,
        type: String,
      },
      id: {
        required: true,
        type: String,
      },
      value: {
        required: true,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      HelperText: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      title: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      lazy: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      ChangeValue(event){
        let value = event.target.value;

        if (!this.lazy){
          this.$emit('input', value);
        }
      },
      ChangeValueLazy(event){
        let value = event.target.value;

        if (this.lazy){
          this.$emit('input', value);
        }
      },
    }
  }
</script>
