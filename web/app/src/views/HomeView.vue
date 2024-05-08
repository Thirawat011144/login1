<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="container">
      <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div class="col-md-3 mb-2 mb-md-0">
          <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          </a>
        </div>

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary "><router-link to="/"
                class="text-decoration-none">Home</router-link></a></li>
          <li><a href="#" class="nav-link px-2">Features</a></li>
          <li><a href="#" class="nav-link px-2">Pricing</a></li>
          <li><a href="#" class="nav-link px-2">FAQs</a></li>
          <li><a href="#" class="nav-link px-2">About</a></li>
        </ul>

        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary me-2"><router-link to="/login"
              class="text-decoration-none">Login</router-link></button>
          <button type="button" class="btn btn-primary"><router-link to="/register"
              class="text-white text-decoration-none">Register</router-link></button>
        </div>
      </header>


    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
