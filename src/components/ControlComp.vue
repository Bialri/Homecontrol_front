<template>
  <chose-device @setDevice="showDevice" v-bind:devices="devices" />
  <button-list v-if="buttonShow"/>
  <slider-list @update="UpdateHostSlider" v-if="sliderShow" v-bind:sliders="sliders"/>
</template>

<script>
import ButtonList from "@/components/ButtonList.vue";
import ChoseDevice from "@/components/ChoseDevice.vue";
import SliderList from "@/components/SliderList.vue";

import axios from "axios";

export default {
  name: "ControlComp",
  components:{
    ButtonList,
    ChoseDevice,
    SliderList,
  },

  data(){
    return{
      buttonShow:false,
      sliderShow:false,
      deviceToCreate:'',
      sliders:[],
      devices:[],
    }
  },

  methods:{
    async getSliders(){
      let response = await axios.get('https://homecontrol.kardasov.ru/api/slider/');
      this.sliders = this.sliceIntoChunks(response.data,2);
    },

    sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    },

     UpdateHostSlider(pk,status){
       let req_body = {
         status: status
       }
       axios.patch('https://homecontrol.kardasov.ru/api/slider/'+pk+'/',req_body)
     },

    showDevice(name){
      switch (name){
        case "button":
          this.sliderShow = false;
          this.buttonShow = true;
          break;
        case 'slider':
          this.buttonShow = false;
          this.sliderShow = true;
          break;
      }
      this.deviceToCreate = name;
    },
    async getDevices(){
      let response = await axios.get('buttons/activedevices/');
      this.devices = response.data.data;
    },


  },

mounted() {
    this.getSliders();
    this.getDevices();
  }

}
</script>


<style scoped>

</style>