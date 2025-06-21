<script setup lang="ts">

import HeaderLayout from "@/layouts/HeaderLayout.vue";
import {useRouter} from "vue-router";

import {ref} from 'vue'
import {useAuthStore} from '@/store/auth'
import {useOrdersStore} from '@/store/orders'

const auth = useAuthStore()
const store = useOrdersStore()
const router = useRouter();

const name = ref(auth.user?.name || '')
const address = ref('')
const comment = ref('')

const submit = async () => {
  if (!address.value) return
  const newOrder = {
    name: name.value,
    address: address.value,
    comment: comment.value,
    date: new Date().toLocaleDateString('ru-RU', {day: '2-digit', month: 'long', year: 'numeric'}),
    status: 'Новый'
  }
  await store.createOrder(newOrder)
  router.push('/orders')
}

</script>

<template>
  <HeaderLayout>
    <template v-slot:left>
      <button style="
              cursor: pointer;
              height: 27px;
              top: 13px;
              left: 704px;
              border: 0;
              background: none;
              color: white;"
              @click="router.push('/orders');"
      >Все заказы
      </button>
    </template>
    <template v-slot:right>
      <button style="
              height: 27px;
              top: 13px;
              left: 704px;
              border: 0;
              background: none;
              color: white;
              text-decoration: underline;"

      >Добавить заказ
      </button>
    </template>
  </HeaderLayout>
  <div class="page">
    <form class="order-form" @submit.prevent="submit">
      <h3>Добавить заказ</h3>
      <input v-model="name" placeholder="Введите ваше имя" required/>
      <input v-model="address" placeholder="Введите ваш адрес" required/>
      <textarea v-model="comment" placeholder="Комментарий"/>
      <button type="submit">Добавить заказ</button>
    </form>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #E2E1E1;
}

.order-form {
  padding: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 220px;
}

.order-form input,
.order-form textarea {
  padding: 8px;
  border: none;
  font-size: 14px;
}

.order-form textarea {
  resize: vertical;
  min-height: 60px;
}

.order-form button {
  padding: 10px;
  background: #d4d4d4;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.order-form button:hover {
  background: #c0c0c0;
}
</style>