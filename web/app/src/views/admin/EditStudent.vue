<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router'

// import 'bootstrap';

const route = useRoute();
const router = useRouter();
// console.log(route.params.id)

// const selectYear = ref('')
const previousRoute = ref(null);

const selectItem = (item) => {
    user.value.selectedYear = item;
};

const selectItemTwo = (item) => {
    user.value.selectedBranch = item
}
const user = ref({
    name: '',
    surename: '',
    userName: '',
    company: '',
    selectedBranch: '',
    selectedYear: '',
    phoneNumber: '',
    studentID: ''
})



const fetch = async () => {
    try {
        const response = await axios.get(`${config.api_path}/api/fetch/data/value/${route.params.id}`);
        console.log(response.data);
        user.value.name = response.data.name
        user.value.surename = response.data.surename
        user.value.userName = response.data.userName
        user.value.company = response.data.company
        user.value.selectedBranch = response.data.branch
        user.value.selectedYear = response.data.year
        user.value.phoneNumber = response.data.phoneNumber
        user.value.studentID = response.data.idStudent



    } catch (error) {
        Swal.fire({
            title: "error",
            text: error.response.data.message || "เกิดข้อผิดพลาด",
            icon: "error",
        });
    }
}


const updateUserData = async () => {
    const payload = {
        name: user.value.name,
        surename: user.value.surename,
        userName: user.value.userName,
        company: user.value.company,
        branch: user.value.selectedBranch,
        year: user.value.selectedYear,
        phoneNumber: user.value.phoneNumber,
        idStudent: user.value.studentID
    };

    try {
        const response = await axios.put(`${config.api_path}/api/update/data/${route.params.id}`, payload);
        console.log(response.data.message);
        if (response.data.message === 'Success') {
            Swal.fire({
                title: "สำเร็จ",
                text: "แก้ไขข้อมูลผู้ใช้สำเร็จ",
                icon: "success",
            });
            // นำผู้ใช้ไปยังหน้า edit-student พร้อมกับ id ของผู้ใช้
            // route.push(`/admin-index/edit-student/${route.params.id}`);
            // router.push('/admin-index/list-student')

            if (payload.year === 'ปวช 2') {
                // นำผู้ใช้กลับไปยังคอมโพเนนต์ที่ทำการอัปเดตเป็นปวช 2
                router.push({ name: 'list-student' });
            } else if (payload.year === 'ป.ตรี ปี2') {
                // นำผู้ใช้ไปยังคอมโพเนนต์ที่ทำการอัปเดตเป็นป.ตรี ปี2
                router.push({ name: 'list-student-two' });
            } else {
                // หากฟิลด์ year ไม่ได้ถูกอัปเดต นำผู้ใช้ไปยังหน้าหลัก
                router.push('/admin-index/list-student');
            }


        }
    } catch (error) {
        Swal.fire({
            title: "ข้อผิดพลาด",
            text: error.response?.data?.message || "เกิดข้อผิดพลาด",
            icon: "error",
        });
        console.log(error)
    }
};


onMounted(() => fetch());
</script>


<template>

    <body>
        <div class="container register me-0 mt-0  ">
            <section class="row content">
                <div class="col-md-3 register-left">
                    <img src="../../assets/power.svg" alt="" style="filter: invert(100%);" />
                    <h3>Welcome</h3>
                    <p>To the cooperative education system</p>
                </div>
                <div class="col-md-9 register-right ">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 class="register-heading">Register New User</h3>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="ชื่อ" value=""
                                            v-model="user.name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="นามสกุล" value=""
                                            v-model="user.surename" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username" value=""
                                            v-model="user.userName" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password" value="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="ชื่อสถานประกอบการ"
                                            value="" v-model="user.company" />
                                    </div>
                                    <!--  -->
                                    <div class="form-group">
                                        <div class="maxl">
                                            <div class="dropdown">
                                                <!-- <button v-if="user.selectedYear === null"
                                                    class="btn btn-white dropdown-toggle border me-1 text-secondary"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    ชั้นปี
                                                </button> -->
                                                <button v-if="user.selectedYear"
                                                    class="btn btn-white dropdown-toggle border me-1" type="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    {{ user.selectedYear }}
                                                </button>
                                                <!-- <button v-else class="btn btn-white dropdown-toggle border me-1"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {{ selectYear }}
                                                </button> -->
                                                <ul class="dropdown-menu">
                                                    <li @click="selectItem('ปวช 2')"><a class="dropdown-item"
                                                            href="#">ปวช 2</a></li>
                                                    <li @click="selectItem('ป.ตรี ปี2')"><a class="dropdown-item"
                                                            href="#">ป.ตรี ปี2 </a></li>
                                                    <li @click="selectItem('ป.ตรี ปี4')"><a class="dropdown-item"
                                                            href="#">ป.ตรี ปี4</a></li>
                                                </ul>
                                                <!-- <button v-if="user.selectedBranch === null"
                                                    class="btn btn-white dropdown-toggle  border text-secondary"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    สาขา
                                                </button> -->
                                                <button v-if="user.selectedBranch"
                                                    class="btn btn-white dropdown-toggle  border " type="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    {{ user.selectedBranch }}
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li @click="selectItemTwo('คอม')"><a class="dropdown-item"
                                                            href="#">คอม</a></li>
                                                    <li @click="selectItemTwo('ช่างยนต์')"><a class="dropdown-item"
                                                            href="#">ช่างยนต์</a></li>
                                                    <li @click="selectItemTwo('การโรงแรม')"><a class="dropdown-item"
                                                            href="#">การโรงแรม</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" minlength="10" maxlength="10" name="txtEmpPhone"
                                            class="form-control" placeholder="Your Phone *" value=""
                                            v-model="user.phoneNumber" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="txtEmpPhone" class="form-control"
                                            placeholder="Your Student ID" value="" v-model="user.studentID" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <button type="submit" class="btnRegister mb-3" value="Register"
                                @click="updateUserData">Update</button>
                        </div>
                    </div>
                </div>
            </section>
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
    /* height: 100vh; */
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



<!-- 
    <script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../config";
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';

const route = useRoute();

const user = ref({
    name: '',
    surename: '',
    userName: '',
    company: '',
    selectedBranch: '',
    selectedYear: '',
    phoneNumber: '',
    studentID: ''
});

const fetchUserData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/api/fetch/data/value/${route.params.id}`);
        console.log(response.data);
        user.value.name = response.data.name;
        user.value.surename = response.data.surename;
        user.value.userName = response.data.userName;
        user.value.company = response.data.company;
        user.value.selectedBranch = response.data.branch;
        user.value.selectedYear = response.data.year;
        user.value.phoneNumber = response.data.phoneNumber;
        user.value.studentID = response.data.idStudent;
    } catch (error) {
        Swal.fire({
            title: "ข้อผิดพลาด",
            text: error.response?.data?.message || "เกิดข้อผิดพลาด",
            icon: "error",
        });
    }
};

const updateUserData = async () => {
    try {
        await axios.put(`${config.api_path}/api/update/data/${route.params.id}`, {
            name: user.value.name,
            surename: user.value.surename,
            userName: user.value.userName,
            company: user.value.company,
            branch: user.value.selectedBranch,
            year: user.value.selectedYear,
            phoneNumber: user.value.phoneNumber,
            idStudent: user.value.studentID
        });
        Swal.fire({
            title: "สำเร็จ",
            text: "แก้ไขข้อมูลผู้ใช้สำเร็จ",
            icon: "success",
        });
    } catch (error) {
        Swal.fire({
            title: "ข้อผิดพลาด",
            text: error.response?.data?.message || "เกิดข้อผิดพลาด",
            icon: "error",
        });
    }
};

onMounted(() => fetchUserData());
</script>

<template>
    <body>
        <div class="container register me-0 mt-0 content-wrapper">
            <section class="row content">
                <div class="col-md-3 register-left">
                    <img src="../../assets/power.svg" alt="" style="filter: invert(100%);" />
                    <h3>ยินดีต้อนรับ</h3>
                    <p>เข้าสู่ระบบสหกิจศึกษา</p>
                </div>
                <div class="col-md-9 register-right">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 class="register-heading">ลงทะเบียนผู้ใช้ใหม่</h3>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="ชื่อ" v-model="user.name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="นามสกุล" v-model="user.surename" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username" v-model="user.userName" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="ชื่อสถานประกอบการ" v-model="user.company" />
                                    </div>
                                    <div class="form-group">
                                        <div class="maxl">
                                            <div class="dropdown">
                                                <button v-if="!user.selectedYear" class="btn btn-white dropdown-toggle border me-1 text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    ชั้นปี
                                                </button>
                                                <button v-else class="btn btn-white dropdown-toggle border me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {{ user.selectedYear }}
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">ปวช 2</a></li>
                                                    <li><a class="dropdown-item" href="#">ป.ตรี ปี2 </a></li>
                                                    <li><a class="dropdown-item" href="#">ป.ตรี ปี4</a></li>
                                                </ul>
                                                <button v-if="!user.selectedBranch" class="btn btn-white dropdown-toggle border text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    สาขา
                                                </button>
                                                <button v-else class="btn btn-white dropdown-toggle border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {{ user.selectedBranch }}
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">คอม</a></li>
                                                    <li><a class="dropdown-item" href="#">ช่างยนต์</a></li>
                                                    <li><a class="dropdown-item" href="#">การโรงแรม</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" minlength="10" maxlength="10" class="form-control" placeholder="เบอร์โทรศัพท์" v-model="user.phoneNumber" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="รหัสนักศึกษา" v-model="user.studentID" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <button type="submit" class="btnRegister mb-3" @click="updateUserData">ลงทะเบียน</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </body>
</template>

 -->