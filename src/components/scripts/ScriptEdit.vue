<template>
  <div class="mt-2 text-center">
    <ActionCard @delete="GetScriptActions" @update_script="UpdateScriptAction" :devices="devices" :script_action="script_action" v-for="script_action in script_actions"/>
    <div class="row">
      <div class="col"><button @click="OpenCloseModal" class="btn fw-bold mb-3 ms-3"><img src="@/assets/plus-icon.svg" style="width: 20px;height: 30px "></button></div>
      <div class="col"><button @click="UpdateAllActions" class="btn btn-primary text-center ">Сохранить</button></div>
    </div>

  </div>
  <CreateScriptAction @close="OpenCloseModal" :visible="visible" :script_id="script_id" :devices="devices" variant="primary"/>
  <h5 v-if="display_error">Ошибка загрузки</h5>
</template>

<script>
import axios from "axios";
import ActionCard from "@/components/scripts/ActionCard.vue";
import CreateScriptAction from "@/components/scripts/CreateScriptAction.vue";
import CreateScript from "@/components/scripts/CreateScript.vue";
export default {
  name: 'ScriptEdit',
  components: {
    CreateScript,
    ActionCard,
    CreateScriptAction
  },
  data(){
    return{
      script_actions:[],
      display_error: false,
      devices: [],
      visible: false,
    }
  },
  props:{
    script_id:Number,
  },
  methods:{
    async GetScriptActions(){
      await axios.get(`scripts/script_actions/${this.script_id}`)
          .then((response) => {
            this.script_actions = response.data.data
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    },
    async GetDevices(){
      await axios.get(`scripts/devices`)
          .then((response) => {
            this.devices = response.data.data
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    },
    OpenCloseModal() {
      this.visible = !this.visible
      this.GetScriptActions()
    },
    UpdateScriptAction(Script_action) {
      for (let i = 0; i < this.script_actions.length; i += 1) {
        if (this.script_actions[i].id === Script_action.id){
          this.script_actions[i] = Script_action
          console.log(this.script_actions)
        }
      }
    },
    async UpdateAllActions(){
      for (let i = 0; i < this.script_actions.length; i += 1) {
        let update_action = this.script_actions[i]
        let script_action_id = update_action.id
        delete update_action.id
        await axios.patch(`scripts/script_actions/${script_action_id}`,update_action)
            .then((response) => {
              this.display_error = false
            })
            .catch((error) => {
              this.display_error = true
            })
      }
      this.$emit('close')
      await this.GetScriptActions()
    }
  },
  mounted() {
    this.GetScriptActions()
    this.GetDevices()
  }
}
</script>

<style scoped>

</style>