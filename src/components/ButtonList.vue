<template>
  <div v-if="!edit_flag"  class="container mb-4" v-for="button_set in buttons" :key="button_set">
    <div class="row mt-2 text-center">
      <ButtonCard @update="getButtons" v-for="button in button_set" :button="button"/>
    </div>
  </div>

  <div v-if="edit_flag"  class="container mb-4" v-for="button_set in buttons" :key="button_set">
    <div class="row mt-2 text-center">
      <ButtonEdit @update="getButtons" v-for="button in button_set" :button="button"/>
    </div>
  </div>

  <div v-if="buttons.length == 0" class="container" style="text-align: center;">
    <h1>Пока пустовато</h1>
  </div>

  <div class="text-end fixed-bottom m-lg-3">
    <button v-if="!edit_flag" @click="edit_flag = !edit_flag" class="btn btn-primary">Редактировать</button>
    <button v-if="edit_flag" @click="edit_flag = !edit_flag" class="btn btn-success">Сохранить</button>
  </div>
</template>

<script>
import ButtonCard from "@/components/ButtonCard.vue";
import ButtonEdit from "@/components/ButtonEdit.vue";
import axios from "axios";
export default {
  name: "ButtonList",
  components:{
    ButtonCard,
    ButtonEdit
  },
  data(){
    return{
      edit_flag:false,
      buttons:[],
    }
  },
  methods:{
    async getButtons(){
      let response = await axios.get('buttons/');
      this.buttons = this.sliceIntoChunks(response.data.data,4);
    },
    sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    },
  },
  mounted() {
    this.getButtons()
  }

}
</script>

<style scoped>
</style>