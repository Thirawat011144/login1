<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import config from '../../../config';
import { RouterLink, RouterView } from 'vue-router';

const users = ref({});



const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/api/fetchData`);
        // console.log(response.data)
        // users.value = response.data
        // console.log("eeee", users.value)
        const filteredUsers = response.data.filter(user => user.year === "ป.ตรี ปี2");

        // อัปเดตค่า users
        users.value = filteredUsers;
        // console.log(response.data)

    } catch (error) {
        console.log(error)
    }
}

const RemoveData = async (id) => {
    try {
        const response = await axios.delete(`${config.api_path}/api/remove/data/${id}`);
        console.log(response.data.message);
        // ลบข้อมูลที่ลบออกจาก users
        users.value = users.value.filter(user => user.id !== id);
        Swal.fire({
            title: "สำเร็จ",
            text: "ลบข้อมูลผู้ใช้สำเร็จ",
            icon: "success",
        });
    } catch (error) {
        Swal.fire({
            title: "ข้อผิดพลาด",
            text: error.response?.data?.message || "เกิดข้อผิดพลาด",
            icon: "error",
        });
        console.log(error)
    }
};

onMounted(() => fetchData());



</script>

<template>
    <!-- 
    <div class="content-wrapper pt-3">
        <section class="content">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">สินค้า</div>
                </div>
                <div class="card-body">

                </div>
            </div>
        </section>
    </div> -->

    <div class="">
        <section class="content">
            <div>
                <!-- <button class="btn btn-warning mb-2">อาจารย์ </button>
                <button class="btn btn-warning mb-2 ms-2">ปวช ปีที่ 2 </button>
                <button class="btn btn-warning mb-2 ms-2">ป.ตรี ปีที่ 2 </button>
                <button class="btn btn-warning mb-2 ms-2">ป.ตรี ปีที่ 4 </button> -->
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">รหัสนักศึกษา</th>
                        <th scope="col">ชื่อ - นามสกุล</th>
                        <th scope="col">สาขา</th>
                        <th scope="col">ปี</th>
                        <th scope="col">ชื่อสถานประกอบการ</th>
                        <th scope="col">Tools</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(user, index) in users" :key="user.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user.idStudent }}</td>
                        <td>{{ user.name }} {{ user.surename }}</td>
                        <td>{{ user.branch }}</td>
                        <td>{{ user.year }}</td>
                        <td>{{ user.company }}</td>
                        <td>
                            <router-link :to="`edit-student/${user.id}`">
                                <button class="btn btn-primary me-2">Edit</button>
                            </router-link>
                            <button class="btn btn-danger" @click="RemoveData(user.id)">Remove</button>

                            <!-- <label for="roleSelect">Select Role:</label> -->
                            <!-- <button class="btn btn-secondary dropdown-toggle ms-2" type="button" id="roleDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {{ user.role }}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="roleDropdown">
                                <li><a class="dropdown-item" @click="selectedRole = 'admin'">Admin</a></li>
                                <li><a class="dropdown-item" @click="selectedRole = 'user'">User</a></li>
                                <li><a class="dropdown-item" @click="selectedRole = 'manager'">Teacher</a></li>
                            </ul> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>


</template>
