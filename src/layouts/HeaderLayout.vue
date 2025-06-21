<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";
import {useRouter} from "vue-router";

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div style="height: 52px; background-color: #165996; display: flex; align-items: center; justify-content: space-between;">
    <div style=" display: flex; align-items: center; justify-content: center; gap: 12px; margin-left: 16px;">
      <slot name="left">

      </slot>
      <slot name="right">

      </slot>
    </div>
    <div style=" display: flex; align-items: center; justify-content: center; gap: 12px; margin-right: 16px;">
      <a>{{ auth.user.name }}</a>
      <button style="width: 78px;
              height: 27px;
              top: 13px;
              left: 704px;"
              @click="logout">Выйти
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>