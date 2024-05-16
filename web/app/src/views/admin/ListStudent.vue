<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import config from '../../config';

const data = ref('');




const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/api/fetchData`);
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

onMounted(fetchData);


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

    <div class="content-wrapper pt-3">
        <section class="content">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ชื่อ - นามสกุล</th>
                        <th scope="col">สาขา</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>


</template>
