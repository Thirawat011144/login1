<script setup>
import axios from 'axios';
import { ref } from 'vue';
import config from '../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const userName = ref('');
const password = ref('');
const router = useRouter();

const handleSignIn = async () => {
  try {
    const payload = {
      userName: userName.value,
      password: password.value,
    };
    // console.log("xxx",payload)
    const response = await axios.post(`${config.api_path}/api/login`, payload);

    if (response.data.message === "Success") {
      Swal.fire({
        title: "Sign In",
        text: "เข้าสู่ระบบแล้ว",
        icon: "success",
        timer: 2000,
      });
      localStorage.setItem(config.token_name, response.data.token);
      router.push('/home-view');
    }
    //  else  {
    //   Swal.fire({
    //     title: "Sign In",
    //     text: "ไม่พอข้อมูลในระบบ",
    //     icon: "warning",
    //     timer: 2000,
    //   });
    // }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "error",
      text: (error.message, "รหัสผ่านไม่ถูกต้อง"),
      icon: "error",
    });
  }
}
</script>

<template>

  <body>
    <main class="form-signin w-100 m-auto">
      <form>
        <h1 class="h3 mb-3 fw-normal">Login</h1>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="Username" v-model="userName">
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">Remember me</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="button" @click="handleSignIn">Sign in</button>
        <p class="mt-5 mb-3 text-body-secondary">ลงทะเบียนผู้ใช้ใหม่ <router-link to="/register"
            class="text-decoration-none">Click</router-link></p>
      </form>
    </main>
  </body>
</template>

<style scoped>
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
