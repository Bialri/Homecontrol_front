<template>
  <nav id="mainNav" class="navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3">
    <div class="container"><a class="navbar-brand d-flex align-items-center" href="/"><span>Homecontrol</span></a><button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
      <div id="navcol-1" class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" href="#/">Главная</a></li>
          <li class="nav-item"><a class="nav-link" href="#/control">Управление</a></li>
          <li class="nav-item"><a class="nav-link" href="#/scripts">Сценарии</a></li>
          <li class="nav-item"><a class="nav-link" href="#/signin">Вход</a></li>
          <li class="nav-item"><a class="nav-link" href="#/signup">Регистрация</a></li>
        </ul><a class="btn btn-primary shadow" role="button" href="#/signup">Регистрация</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent"
}
</script>

<style scoped>

</style>