<template>
<div class="row text-center d-flex justify-content-center mb-4">
  <hr style="width: 90%">
  <h5 class="fw-bold">{{ action.name + " " + device.name}}</h5>
  <h6>Задержка</h6>
  <div class="row d-flex justify-content-center">
    <div class="col-5">
      <div class="input-group">
        <select v-model="latency_min" class="form-select">
          <option v-for="option in time_options_min" :value="option">{{option}}</option>
        </select>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon1">Мин</span>
        </div>
      </div>
    </div>

    <div class="col-5">
      <div class="input-group">
        <select v-model="latency_sec" class="form-select">
          <option v-for="option in time_options_sec" :value="option">{{option}}</option>
        </select>
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon1">Сек</span>
        </div>
      </div>
    </div>
  <button @click="DeleteScriptAction" class="btn btn-danger mt-3" style="width: 90%">Удалить</button>

  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActionCard",
  props:{
    script_action:{},
    devices:[]
  },
  data(){
    return{
      display_error: false,
      action:{},
      device:{},
      latency_sec: 0,
      latency_min: 0,
      time_options_sec: [0,5,10,15,20,25,30,35,40,45,50,55,60],
      time_options_min: []
    }
  },
  methods:{
    async GetActionAndDevice(){
      await axios.get(`scripts/actions/by_id/${this.script_action.action_id}`)
          .then((response) => {
            this.action = response.data.data
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
      for (let i = 0; i < this.devices.length; i += 1) {
        if (this.devices[i].id === this.action.device_type){
          this.device = this.devices[i]
          break
        }
      }

    },
    async DeleteScriptAction(){
      await axios.delete(`scripts/script_actions/${this.script_action.id}`)
          .then((response) => {
            this.$emit('delete')
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    },
    fill_time_options(){
      for (let i=0; i <= 60; i+=1){
        this.time_options_min.push(i.toString())
      }
    },
    div(val,by){
      return (val - val % by) / by
    },
    setLatency(){
      this.latency_sec = this.script_action.latency % 60
      this.latency_min = this.div(this.script_action.latency, 60)
    }
  },
  mounted() {
    this.setLatency()
    this.GetActionAndDevice()
    this.fill_time_options()

  },
  watch:{
    latency_min: function (newVal){
      this.script_action.latency = this.latency_sec + (this.latency_min * 60)
      this.$emit('update_script',this.script_action)
    },
    latency_sec: function (newVal){
      this.script_action.latency = this.latency_sec + (this.latency_min * 60)
      this.$emit('update_script',this.script_action)
    }
  }
}
</script>

<style scoped>

</style>