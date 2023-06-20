<template>
  <navbar-component/>
  <div class="container" style="height: 80px"></div>
  <router-view></router-view>

</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default{
  components:{
    NavbarComponent,
  },
  data(){
    return{
    }

  },
  methods:{

  },
  mounted() {
  }

}
</script>


<style>
</style>
