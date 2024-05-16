<script setup>
import axios from "axios";
import { ref } from 'vue';
import config from "../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
import 'bootstrap';

const router = useRouter();

const name = ref('')
const surename = ref('')
const userName = ref('');
const password = ref('');
const company = ref('');
const selectedYear = ref(null);
const selectedBranch = ref(null)
const phoneNumber = ref('')




const selectItem = (item) => {
  selectedYear.value = item;
};

const selectItemTwo = (item) => {
  selectedBranch.value = item
}


const handleSignUp = async () => {
  try {
    const payload = {
      name: name.value,
      surename: surename.value,
      userName: userName.value,
      password: password.value,
      company: company.value,
      selectedYear: selectedYear.value,
      selectedBranch: selectedBranch.value,
      phoneNumber: phoneNumber.value
    };
    console.log(payload)
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

    <!-- <main class="form-signin w-100 m-auto">
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

      
    </main> -->

    <div class="container register">
      <div class="row">
        <div class="col-md-3 register-left">
          <!-- <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" /> -->
          <img src="../../assets/power.svg" alt="" style="filter: invert(100%);" />
          <h3>Welcome</h3>
          <p>To the cooperative education system</p>
          <!-- <input type="submit" name="" value="Login" /><br /> -->
        </div>
        <div class="col-md-9 register-right">
          <!-- <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                aria-selected="true">Employee</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                aria-selected="false">Hirer</a>
            </li>
          </ul> -->
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <h3 class="register-heading">Register New User</h3>
              <div class="row register-form">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="ชื่อ" value="" v-model="name" />
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="นามสกุล" value="" v-model="surename" />
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" value="" v-model="userName" />
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" value="" v-model="password">
                  </div>
                  <!-- <div class="form-group">
                    <div class="maxl">
                      <label class="radio inline">
                        <input type="radio" name="gender" value="male" checked>
                        <span> Male </span>
                      </label>
                      <label class="radio inline">
                        <input type="radio" name="gender" value="female">
                        <span>Female </span>
                      </label>
                    </div>
                  </div> -->
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="email" class="form-control" placeholder="ชื่อสถานประกอบการ" value=""
                      v-model="company" />
                  </div>
                  <!--  -->
                  <div class="form-group">
                    <div class="maxl">
                      <div class="dropdown">
                        <button v-if="selectedYear === null"
                          class="btn btn-white dropdown-toggle border me-1 text-secondary" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          ชั้นปี
                        </button>
                        <button v-else class="btn btn-white dropdown-toggle border me-1" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          {{ selectedYear }}
                        </button>
                        <ul class="dropdown-menu">
                          <li @click="selectItem('ปวช 2')"><a class="dropdown-item" href="#">ปวช 2</a></li>
                          <li @click="selectItem('ป.ตรี ปี2')"><a class="dropdown-item" href="#">ป.ตรี ปี2 </a></li>
                          <li @click="selectItem('ป.ตรี ปี4')"><a class="dropdown-item" href="#">ป.ตรี ปี4</a></li>
                        </ul>
                        <button v-if="selectedBranch === null"
                          class="btn btn-white dropdown-toggle  border text-secondary" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          สาขา
                        </button>
                        <button v-else class="btn btn-white dropdown-toggle  border " type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          {{ selectedBranch }}
                        </button>
                        <ul class="dropdown-menu">
                          <li @click="selectItemTwo('คอม')"><a class="dropdown-item" href="#">คอม</a></li>
                          <li @click="selectItemTwo('ช่างยนต์')"><a class="dropdown-item" href="#">ช่างยนต์ </a></li>
                          <li @click="selectItemTwo('การโรงแรม')"><a class="dropdown-item" href="#">การโรงแรม</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!--  -->
                  <div class="form-group">
                    <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control"
                      placeholder="Your Phone *" value="" v-model="phoneNumber" />
                  </div>
                  <!-- <div class="form-group">
                    <select class="form-control">
                      <option class="hidden" selected disabled>Please select your Sequrity Question</option>
                      <option>What is your Birthdate?</option>
                      <option>What is Your old Phone Number</option>
                      <option>What is your Pet Name?</option>
                    </select>
                  </div> -->
                  <!-- <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter Your Answer *" value="" />
                  </div> -->
                  <!-- <input type="submit" class="btnRegister" value="Register" /> -->
                </div>
              </div>
            </div>
            <!-- <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <h3 class="register-heading">Apply as a Hirer</h3>
              <div class="row register-form">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="First Name *" value="" />
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Last Name *" value="" />
                  </div> -->
            <!-- <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email *" value="" />
                  </div>
                  <div class="form-group">
                    <input type="text" maxlength="10" minlength="10" class="form-control" placeholder="Phone *"
                      value="" />
                  </div>


                </div> -->
            <!-- <div class="col-md-6">
                  <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password *" value="" />
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" placeholder="Confirm Password *" value="" />
                  </div> -->
            <!-- <div class="form-group">
                    <select class="form-control">
                      <option class="hidden" selected disabled>Please select your Sequrity Question</option>
                      <option>What is your Birthdate?</option>
                      <option>What is Your old Phone Number</option>
                      <option>What is your Pet Name?</option>
                    </select>
                  </div> -->
            <!-- <div class="form-group">
                    <input type="text" class="form-control" placeholder="`Answer *" value="" />
                  </div> -->
            <div class="col-md-8">
              <div class="form-group">
                <button @click="handleSignUp" type="submit" class="btnRegister mb-3" value="Register">Register</button>
              </div>
            </div>
            <!-- </div> -->
            <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>

    </div>

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




.register {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  margin-top: 3%;
  padding: 3%;
}

.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}

.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}

.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}

.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}

@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-20px);
  }
}

@keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-20px);
  }
}

.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}

.register .register-form {
  padding: 10%;
  margin-top: 10%;
}

.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}

.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}

.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}

.register .nav-tabs .nav-link:hover {
  border: none;
}

.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}

.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>