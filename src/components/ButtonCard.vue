<template>
  <div @click.prevent="UpdateButton" class="anim col-2"
       :class="{'anim_off':!button.status, 'anim_on':button.status}">
    <h4 class="text-center fw-bold text-light">{{ button.name }}</h4>
      <a v-if="!button.status" class="text-center text-light box" role="button">ON</a>
      <a v-else class="text-center text-light " role="button">OFF</a>
  </div>
  <h1 v-if="display_error">error</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "ButtonCard",
  props:{
    button:{}
  },
  data(){
    return{
      display_error:false
    }
  },
  methods:{
    UpdateButton(){
      let req_body = {
        status: !this.button.status
      }
      axios.patch(`buttons/${this.button.id}/`,req_body)
          .then((response) => {
            this.$emit('update')
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    },
  }
}
</script>

<style scoped>

.te{
  cursor: pointer;
}
.anim{
  padding: 15px 25px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999
}

.anim_off{
  background: red;
}
.anim_off:active{
  transition: 0.2s;
  background-color: green;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.anim_on{
  background: green;
}
.anim_on:active{
  transition: 0.2s;
  background-color: red;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>