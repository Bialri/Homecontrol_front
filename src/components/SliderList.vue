<template>
  <div v-for="slider_set in sliders" :key="slider_set" class="container" style="margin-bottom: 10px;">
    <div class="row">
      <div v-for="slider in slider_set" :key="slider.id" class="col-5 text-center">
        <h3>{{slider.name}}</h3>
        <input class="form-range" @change="changeSlider(slider)" min="0" max="100" v-model="slider.status"  type="range" />
      </div>
      <div class="col"></div>
    </div>
  </div>
  <div v-if="sliders.length == 0" class="container" style="text-align: center;">
    <h1>Пока пустовато</h1>
  </div>
</template>
<script>
export default {
  name: "SliderList",

  props: {
    sliders: {
      type: Array
    }
  },

  methods:{
    changeSlider(slider){
      let pk = slider.id
      let status = slider.status
      this.$emit('update',pk,status)
    }


  }


}
</script>

<style scoped>

</style>