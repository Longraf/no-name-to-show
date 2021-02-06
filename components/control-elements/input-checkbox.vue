<template>
  <div class="input-checkbox ">
    <input type="checkbox"
           :name="name"
           :id="id"
           :value="ModelValue"
           v-model="model"
           :disabled="disabled"
    >
    <label :for="id" class="input-checkbox__wrapper" :class="{'input-checkbox__wrapper--disabled' : disabled}">
      <span class="input-checkbox__new">
        <svg-icon class="input-checkbox__default-ico" name="check"/>
        <svg-icon class="input-checkbox__error-ico" name="plus-thin"/>
      </span>
      <span class="input-checkbox__text">{{ text }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'input-checkbox',
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
        type: [String, Boolean, Number, Array]
      },
      ModelValue: {
        type: [String, Boolean, Number],
      },
      text: {
        type: String,
      },
      disabled: {
        type: Boolean
      },
    },
    computed: {
      model: {
        get(){
          return this.value;
        },
        set(value){
          this.$emit('input', value);
        }
      }
    }
  }
</script>
