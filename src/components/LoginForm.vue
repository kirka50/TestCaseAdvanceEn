<template>
  <form @submit.prevent="handleLogin">
    <input v-model="username" placeholder="Имя пользователя" required />
    <input v-model="password" type="password" placeholder="Пароль" required minlength="8" />
    <button :disabled="!username || password.length < 8">Войти</button>
    <p v-if="error">Неверные данные</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from "@/store/auth.ts";


const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  const ok = await auth.login(username.value, password.value)
  if (ok) router.push('/orders')
  else error.value = true
}
</script>