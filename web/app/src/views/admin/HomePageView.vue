<!-- <template>
  <div class="">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="content-wrapper">
      <div class="ms-3 mt-3">
        <button class="btn btn-warning mb-2 ms-2">อาจารย์ </button>
        <router-link :to="{ path: '/admin-index/list-student' }">
      <button
        class="btn mb-2 ms-2"
        :class="buttonClass"
        @click="handleClick"
      >
        ปวช ปี2
      </button>
    </router-link>
        <router-link to="/admin-index/list-student-two"><button class="btn btn-warning mb-2 ms-2">ป.ตรี ปีที่ 2
          </button></router-link>
        <button class="btn btn-warning mb-2 ms-2">ป.ตรี ปีที่ 4 </button>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template> -->

<!-- <script setup>
import Navbar from '../../components/Navbar.vue';
import Sidebar from '../../components/Sidebar.vue';
import { ref, computed } from 'vue';

// สร้างสถานะ isClicked เพื่อเก็บข้อมูลว่าปุ่มถูกคลิกหรือยัง
const isClicked = ref(false);

// กำหนดคลาสของปุ่มตามสถานะ isClicked
const buttonClass = computed(() => {
  return isClicked.value ? 'btn-success' : 'btn-warning';
});

// ฟังก์ชัน handleClick เพื่อเปลี่ยนสถานะ isClicked เป็น true เมื่อปุ่มถูกคลิก
const handleClick = () => {
  isClicked.value = true;
};
</script>

<style></style> -->

<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="content-wrapper">
      <div class="ms-3 mt-3">
        <button class="btn mb-2 ms-2" :class="isClicked('teacher') ? 'btn-secondary' : 'btn-warning'"
          @click="handleClick('teacher')">
          อาจารย์
        </button>
        <router-link :to="{ path: '/admin-index/list-student' }">
          <button class="btn mb-2 ms-2" :class="isClicked('vocationalYear2') ? 'btn-secondary' : 'btn-warning'"
            @click="handleClick('vocationalYear2')">
            ปวช ปี2
          </button>
        </router-link>
        <router-link to="/admin-index/list-student-two">
          <button class="btn mb-2 ms-2" :class="isClicked('bachelorYear2') ? 'btn-secondary' : 'btn-warning'"
            @click="handleClick('bachelorYear2')">
            ป.ตรี ปีที่ 2
          </button>
        </router-link>
        <button class="btn mb-2 ms-2" :class="isClicked('bachelorYear4') ? 'btn-secondary' : 'btn-warning'"
          @click="handleClick('bachelorYear4')">
          ป.ตรี ปีที่ 4
        </button>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../../components/Navbar.vue';
import Sidebar from '../../components/Sidebar.vue';
import { ref } from 'vue';

// สร้างสถานะ activeButton เพื่อเก็บข้อมูลว่าปุ่มใดถูกคลิก
const activeButton = ref(null);

// ฟังก์ชันตรวจสอบสถานะของปุ่ม
const isClicked = (button) => activeButton.value === button;

// ฟังก์ชัน handleClick เพื่อเปลี่ยนสถานะ activeButton เมื่อปุ่มถูกคลิก
const handleClick = (button) => {
  activeButton.value = button;
};
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมถ้าจำเป็น */
</style>
