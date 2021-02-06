<template>
  <div class="input-file">
    <input
      type="file"
      :name="name"
      :id="id"
      @change="onChange($event)"
    >
    <label :for="id" class="input-file__label">
      <span class="input-file__img-wrapper"  v-if="image">
        <div class="input-file__clear" @click.prevent="clearInputFile($event)">
          <svg-icon name="plus-thin"/>
        </div>

        <img class="input-file__img" :src="image"/>
      </span>

      <div class="input-file__empty" v-else></div>

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
        },
        data: () => {
            return{
                image: '',
            }
        },
        methods: {
            onChange(event){
                if (event.target.files.length !== 0){
                    this.$emit('change', event.target.files);
                    this.createImage(event.target.files[0])
                } else {
                    this.$el.querySelector('input').value = '';
                    this.image = null;
                    this.$emit('change', undefined);
                }
            },

            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.image= e.target.result;
                };
                reader.readAsDataURL(file);
            },

            clearInputFile(e) {
                this.$el.querySelector('input').value = '';
                this.image = null;
                this.$emit('change', undefined);
            }
        },
    }
</script>
