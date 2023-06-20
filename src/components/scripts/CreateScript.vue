<template>
  <div v-if="OpenClose" class="modal fade show" style="display: block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
       tabindex="-1" aria-labelledby="exampleModalLable" aria-modal="true" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить Сценарий</h5>
          <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <label class="form-label">Название</label>
            <input v-model="Script.name" class="form-control" type="text" />
            <label class="form-label">Время исполнения</label>
            <input v-model="Script.time" class="form-control" type="time" />
          </form>
          <h5 v-if="display_error" class="text-center text-danger">Произошла ошибка</h5>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="OpenCloseFun()" :class="'btn btn-'+variant" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-success" @click="AddScript">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateScript",
  props:{
    visible:Boolean,
    variant:String,
  },
  data(){
    return{
      OpenClose: this.visible,
      Script:{
        name:'',
        time:''
      },
      display_error: false
    }
  },
  methods:{
    OpenCloseFun() {
      this.OpenClose = !this.OpenClose;
      this.$emit('close')
    },
    async AddScript(){
      await axios.post('scripts/script', this.Script)
          .then((response) => {

            this.display_error = false
            this.OpenCloseFun()
          })
          .catch((error) => {
            this.display_error = true
          })
    }
  },
  watch:{
    visible: function (newVal){
      this.OpenClose = newVal
    }
  }
}
</script>

<style scoped>

</style>