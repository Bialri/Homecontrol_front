<template>
  <div class="container">
    <div class="row mt-3" v-for="script_chunk in scripts">
      <ScriptCard @update="GetScripts" :script="script" v-for="script in script_chunk"/>
      <div class="col" v-if="script_chunk.length === 1"></div>
    </div>
    <div class="container p-5"></div>

  </div>
  <CreateScript @close="OpenCloseModal" :visible="visible" variant="primary"/>
  <div class="text-end fixed-bottom m-lg-3">
    <button @click="OpenCloseModal" class="btn btn-primary">Добавить</button>
  </div>
</template>

<script>
import axios from "axios";
import CreateScript from "@/components/scripts/CreateScript.vue";
import ScriptCard from "@/components/scripts/ScriptCard.vue";

export default {
  name: "ScriptComp",
  components: {
    CreateScript,
    ScriptCard,
  },
  data() {
    return {
      scripts: [],
      visible: false,

    }
  },
  methods: {
    sliceIntoChunks(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
      }
      return res;
    },
    async GetScripts() {
      let result = await axios.get('scripts/script')
      this.scripts = this.sliceIntoChunks(result.data.data, 2)
    },
    OpenCloseModal() {
      this.visible = !this.visible
      this.GetScripts()
    },

  },
  mounted() {
    this.GetScripts()
  }
}
</script>

<style scoped>

</style>