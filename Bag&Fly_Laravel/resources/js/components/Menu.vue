<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">JoyEvents</a>
      <a class="navbar-brand">{{ store.state.Userstore.user[0]?.data.nomHotel }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-item nav-link">Accueil</router-link>
           </li>
           <li class="nav-item">
           <router-link v-if="store.state.Userstore.user[0]?.type == 'client'" to="/client" class="nav-item nav-link">Events</router-link>
          </li> 
          <li class="nav-item">
           <router-link v-if="store.state.Userstore.user[0]?.type == 'hotel'" to="/hotel" class="nav-item nav-link">Salles</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-sm-2" type="search" placeholder="Search">
          <button v-if="store.state.Userstore.user[0] == null" style="margin-right: 5px;" class="btn btn-secondary my-2 my-sm-0"><router-link to="/register" class="nav-item nav-link nav-no-link-style">Register</router-link></button>
          <button v-if="store.state.Userstore.user[0] == null" class="btn btn-secondary my-2 my-sm-0"><router-link to="/login" class="nav-item nav-link nav-no-link-style">Login</router-link></button>
          <button v-else class="btn btn-secondary my-2 my-sm-0"><router-link to="/login" class="nav-item nav-link nav-no-link-style">Logout</router-link></button>
        </form>
      </div>
    </div>
  </nav>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import store from '../store';

onMounted(() => {
  console.log()
})
</script>
<style lang="scss" scoped>

</style>