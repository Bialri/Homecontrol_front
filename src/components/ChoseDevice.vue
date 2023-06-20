<template>
  <div class="container p-0" style="margin-bottom: 10px;margin-top: 20px;">
    <button v-for="device in devices" :key="device.id" @click="setDevice(device.name)" class="btn btn-primary me-2" type="button" style="border-radius: 15px;">{{device.name}}</button>
  </div>
</template>

<script>

export default {
  name: "ChoseDevice",
  props:{
   devices:{ type:Array},
  },

  methods:{


    setDevice(name){
      this.$emit('setDevice',name);
    }

  },

}
</script>

<style scoped>

</style>