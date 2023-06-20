<template>
  <div v-if="OpenClose" class="modal fade show" style="display: block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
       tabindex="-1" aria-labelledby="exampleModalLable" aria-modal="true" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить Действие</h5>
          <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <label class="form-label">Тип устройства</label>
            <select v-model="device_type" class="form-select">
              <option :value="device.id" v-for="device in devices">{{device.name}}</option>
            </select>
            <label class="form-label">Действие</label>
            <select v-model="ScriptAction.action_id" class="form-select">
              <option :value="action.id" v-for="action in actions">{{action.name}}</option>
            </select>
            <label class="form-label">Задержка</label>
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
            </div>
            <label class="form-label">Устройство</label>
            <select v-model="ScriptAction.device_id" class="form-select">
              <option :value="device.id" v-for="device in devices_buttons">{{device.name}}</option>
            </select>

          </form>
          <h5 v-if="display_error" class="text-center text-danger">Произошла ошибка</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="OpenCloseFun()" :class="'btn btn-'+variant" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-success" @click="AddAction">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateScriptAction",
  props:{
    visible:Boolean,
    variant:String,
    script_id: Number,
    devices: Array
  },
  data(){
    return{
      OpenClose: this.visible,
      ScriptAction:{
        device_id:0,
        latency: 0,
        action_id: 0,
        script_id: this.script_id
      },
      latency_min:0,
      latency_sec:0,
      device_type:0,
      actions:[],
      devices_buttons: [],
      display_error: false,
      time_options_sec: [0,5,10,15,20,25,30,35,40,45,50,55,60],
      time_options_min: []
    }
  },
  methods:{
    OpenCloseFun() {
      this.OpenClose = !this.OpenClose;
      this.$emit('close')
    },
    async AddAction(){
      this.ScriptAction.latency = this.latency_sec + (this.latency_min * 60)
      await axios.post('scripts/script_actions', this.ScriptAction)
          .then((response) => {
            this.ScriptAction.device_id = 0
            this.ScriptAction.latency = 0
            this.ScriptAction.action_id = 0
            this.display_error = false
            this.latency_min = 0
            this.latency_sec = 0
            this.OpenCloseFun()
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
  },
  watch:{
    visible: function (newVal){
      this.OpenClose = newVal
    },
    device_type: async function (newVal){
      await axios.get(`scripts/actions/${newVal}`)
          .then((response) => {
            this.actions = response.data.data
          })
          .catch((error) => {
          })
      await axios.get(`buttons/`)
          .then((response) => {
            this.devices_buttons = response.data.data
          })
          .catch((error) => {
          })
    }
  },
  mounted() {
    this.fill_time_options()
  }
}
</script>

<style scoped>

</style>