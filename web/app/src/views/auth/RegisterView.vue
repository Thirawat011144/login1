<script setup>
import axios from "axios";
import { ref } from 'vue';
import config from "../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'

const userName = ref('');
const password = ref('');
const router = useRouter();

const handleSignUp = async () => {
  try {
    const payload = {
      userName: userName.value,
      password: password.value
    };
    const response = await axios.post(`${config.api_path}/api/register`, payload);
    if (response.data.message === "Success") {
      Swal.fire({
        title: "Sign Up",
        text: "สมัครบัญชีเรียบร้อยแล้ว",
        icon: "success",
        timer: 2000
      })
      router.push('/login')
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "error",
      text: error.response.data.message || "เกิดข้อผิดพลาด",
      icon: "error",
    });
  }
}
</script>


<template>

  <body>
    <main class="form-signin w-100 m-auto">
      <form>

        <h1 class="h3 mb-3 fw-normal">Register</h1>

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
          <label class="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="button" @click="handleSignUp">Sign in</button>
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