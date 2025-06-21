<script setup lang="ts">
  const props = defineProps<{
    message: string
    onConfirm: () => void
    onCancel: () => void
  }>()
</script>
<template>
  <div class="overlay">
    <div class="dialog">
      <p>{{ props.message }}</p>
      <div class="buttons">
        <button @click="onConfirm">Ок</button>
        <button @click="onCancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: #e5e5e5;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  min-width: 260px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  background: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #ddd;
}
</style>
