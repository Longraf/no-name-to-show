<template>
  <div class="input-radio" :class="{ 'input-radio--disabled': disabled }">
  <label>
    <input type="radio"
           :title="title"
           :id="id"
           :name="name"
           :value="value"
           :checked="ModelValue === value"
           :disabled="disabled"
           @change="SelectValue($event)"
    >
      <span class="input-radio__wrapper">
      <span class="input-radio__new"/>
      <span class="input-radio__text">
        {{title}}
        <slot></slot>
      </span>
    </span>
  </label>
</div>
</template>

<script>
  export default {
    name: 'radiobutton',
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
        type: [String, Boolean, Number]
      },
      ModelValue: {
        type: [String, Boolean, Number],
      },
      text: {
        type: String,
      },
      title: {
        type: String,
      },
      disabled: {
        type: Boolean
      },
    },
    model: {
      prop: 'ModelValue',
      event: 'change'
    },
    methods: {
      SelectValue(event){
        this.$emit('change', event.target.value);
      },
    },
  }
</script>
