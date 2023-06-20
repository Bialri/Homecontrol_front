<template>
  <div class="col rounded-5 border border-primary border-2 p-0 ms-2">
    <div class="bg-primary rounded-5 text-light p-3 text-center d-flex justify-content-center">
      <h4 v-if="!edit_flag">{{ update_script.name }}</h4>
      <input v-if="edit_flag" v-model="update_script.name" type="text" class="form-control w-50">
    </div>
    <div class="row text-center mt-2 d-flex justify-content-center">
      <h5 v-if="!edit_flag">{{ update_script.time }}</h5>
      <input v-model="update_script.time" v-if="edit_flag" type="time" class="form-control w-50">
    </div>
    <div class="row mt-1 text-center mb-1">
      <div class="col"><button @click="ExecuteScript" class="btn btn-success">Выполнить</button></div>
      <div class="col">
        <button v-if="!edit_flag" @click="edit_flag = !edit_flag" class="btn btn-primary">Редактировать</button>
        <button v-if="edit_flag" @click="deleteScript" class="btn btn-danger">Удалить сценарий</button>
      </div>
    </div>
    <ScriptEdit @close="UpdateScript" v-if="edit_flag" :script_id="script.id"/>
  </div>
</template>

<script>
import ScriptEdit from "@/components/scripts/ScriptEdit.vue";
import axios from "axios";
export default {
  name: "ScriptCard",
  components:{
    ScriptEdit
  },
  props: {
    script:{},

  },
  data(){
    return {
      display_error: false,
      update_script:{
        time: this.script.time,
        name: this.script.name
      },
      edit_flag: false
    }
  },
  methods:{
    async ExecuteScript(){
      await axios.post(`scripts/execute_script/${this.script.id}`)
          .then((response) => {
            this.display_error = false
          })
          .catch((error) => {
            this.display_error = true
          })
    },
    async deleteScript(){
      await axios.delete(`scripts/script/${this.script.id}`)
          .then((response) => {
            this.display_error = false
            this.$emit('update')
          })
          .catch((error) => {
            this.display_error = true
          })
    },
    async UpdateScript(){
      await axios.patch(`scripts/script/${this.script.id}`, this.update_script)
          .then((response) => {
            this.display_error = false
            this.edit_flag = ! this.edit_flag
            this.$emit('update')
          })
          .catch((error) => {
            this.display_error = true
          })
    }
  },

}
</script>

<style scoped>

</style>