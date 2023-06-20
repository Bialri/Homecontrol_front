<template>
  <div @click.prevent="UpdateButton" class="col-2 m-lg-1 border rounded rounded-4 text-center bg-primary">
    <input v-model="name" class="form-control mt-2 border rounded rounded-4">
    <button @click="deleteButton" class="btn btn-danger mt-2 mb-2 border rounded rounded-4">Удалить</button>
  </div>
  <h4 v-if="display_error">error</h4>
</template>

<script>
import axios from "axios";

export default {
  name:'ButtonEdit',
  props:{
    button:Object
  },
  data(){
    return{
      name:this.button.name,
      display_error:false
    }
  },
  methods:{
    deleteButton(){
      axios.delete(`buttons/${this.button.id}/`)
          .then((response) => {
            this.$emit('update')
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    }
  },
  watch:{
    name:function (newVal){
      let req_body = {
        name: this.name
      }
      axios.patch(`buttons/${this.button.id}/`, req_body)
          .then((response) => {
            this.$emit('update')
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    }
  }
}
</script>

<style scoped>

</style>