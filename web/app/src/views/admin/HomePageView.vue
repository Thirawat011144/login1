<template>
  <div class="wrapper">
    <navbar></navbar>
    <sidebar></sidebar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
// import ListStudent from './ListStudent.vue'
import { RouterLink, RouterView } from 'vue-router';


export default {
  components: { Navbar, Sidebar },

}
</script>

<style></style>