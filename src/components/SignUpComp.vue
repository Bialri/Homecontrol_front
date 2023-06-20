<template>
  <div class="container py-md-5">
    <div class="row">
      <div class="col-md-6 text-center"><img class="img-fluid w-100" src="assets/img/illustrations/circuit.svg" /></div>
      <div class="col-md-5 col-xl-4 text-center text-md-start">
        <h2 class="display-6 fw-bold mb-5"><span class="underline pb-1"><strong>Регистрация</strong></span></h2>
        <form @submit.prevent="registerUser" >
          <div class="mb-3"><input v-model="register.username" class="shadow-sm form-control" type="text" name="username" placeholder="Имя пользователя" /></div>
          <div class="mb-3"><input v-model="register.email" class="shadow-sm form-control" type="email" name="email" placeholder="Электронная почта" /></div>
          <div class="mb-3"><input v-model="register.password" class="shadow-sm form-control" type="password" name="password" placeholder="Пароль" /></div>
          <div class="mb-3"><input class="shadow-sm form-control" type="password" name="password_repeat" placeholder="Повторите пароль" /></div>
          <div class="mb-5"><button class="btn btn-primary shadow" type="submit">Зарегистрироваться</button></div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpComp",

  data(){
    return{
      register:{
      username:'',
      email:'',
      password:''
      }
    }
  },
  methods:{
    async registerUser() {
      await axios.post('auth/register/',this.register);
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>

</style>