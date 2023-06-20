<template>
<div>
    <div class="container py-md-5">
      <div class="row">
        <div class="col-md-6 text-center"><img class="img-fluid w-90" src="@/assets/img/illustrations/circuit.svg" /></div>
        <div class="col-md-5 col-xl-4 text-center text-md-start">
          <h2 class="display-6 fw-bold mb-5"><span class="underline pb-1"><strong>Вход</strong><br /></span></h2>
          <form method="post" @submit.prevent="loginUser">
            <div class="mb-3"><input class="shadow form-control" type="email" name="email" placeholder="Электронная почта" v-model="login.email" /></div>
            <div class="mb-3"><input class="shadow form-control" type="password" name="password" placeholder="Пароль" v-model="login.password" /></div>
            <div class="mb-5"><button class="btn btn-primary shadow" type="submit">Войти</button></div>
            <p class="text-muted"><a href="forgotten-password.html">Забыли пароль?</a></p>
          </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  name: "SignInComp",
  data(){
    return {
      login:{
        email: '',
        password: ''
      }
    };
  },
  methods:{
    async loginUser() {
      let response = await axios.post('auth/login',this.login);
      let access_token = response.data.data.access;
      let refresh_token = response.data.data.refresh;
      axios.defaults.headers.common["Authorization"] = `Bearer ` + access_token
      localStorage.setItem('refresh',refresh_token);
      this.$router.push('/')

    }
  }
}
</script>

<style scoped>

</style>