<script setup lang="ts">
import OrdersTable from '@/components/OrdersTable.vue'
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import {useRouter} from "vue-router";
const router = useRouter()
</script>

<template>
  <HeaderLayout>
    <template v-slot:left>
      <button style="
              height: 27px;
              top: 13px;
              left: 704px;
              border: 0;
              background: none;
              color: white;
              text-decoration: underline;"
      >Все заказы</button>
    </template>
    <template v-slot:right>
      <button style="
              cursor: pointer;
              height: 27px;
              top: 13px;
              left: 704px;
              border: 0;
              background: none;
              color: white;"
              @click="router.push('/createOrder');"
      >Добавить заказ</button>
    </template>
  </HeaderLayout>
  <div style="background-color: #E2E1E1; height: calc(100vh - 72px); padding: 10px 10px">
    <OrdersTable />
  </div>
</template>
