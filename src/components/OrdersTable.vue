<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOrdersStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import DeleteOrderModal from "@/components/DeleteOrderModal.vue";


const deleteModal = ref(false)
const deleteTargetId = ref<number | null>(null)
const store = useOrdersStore()
const auth = useAuthStore()
const sortField = ref<'date' | 'address'>('date')
const sortDirection = ref<'asc' | 'desc'>('asc')

const fetchOrders = () => {
  store.fetchOrders();
}

const sortBy = (field: 'date' | 'address') => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const sortedOrders = computed(() => {
  return [...store.orders].sort((a, b) => {
    const aVal = a[sortField.value]
    const bVal = b[sortField.value]
    return sortDirection.value === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
  })
})

const  updateStatus = async (id: number) => {
  await store.updateStatus(id)
  fetchOrders()
}

const requestDelete = (id: number) => {
  deleteTargetId.value = id
  deleteModal.value = true
}

const confirmDelete = async () => {
  if (deleteTargetId.value !== null) {
    await store.deleteOrder(deleteTargetId.value)
    await fetchOrders()
  }
  deleteModal.value = false
  deleteTargetId.value = null
}
fetchOrders()
</script>

<template>
  <table class="orders-table">
    <thead>
    <tr>
      <th>№</th>
      <th>Имя клиента</th>
      <th @click="sortBy('address')">Адрес</th>
      <th @click="sortBy('date')">Дата заказа</th>
      <th>Статус</th>
      <th>Комментарий</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(order, index) in sortedOrders"
        :key="order.id"
        :class="{ done: order.status === 'Выполнен' }"
    >
      <td>{{ index + 1 }}</td>
      <td>{{ order.name }}</td>
      <td>{{ order.address }}</td>
      <td>{{ order.date }}</td>
      <td>{{ order.status }}</td>
      <td>{{ order.comment }}</td>
      <td>
        <button
            v-if="order.status === 'Новый'"
            @click="updateStatus(order.id)"
        >Обновить</button>
        <button
            v-if="auth.user?.role === 'ADMIN'"
            @click="requestDelete(order.id)"
        >Удалить</button>
      </td>
    </tr>
    </tbody>
  </table>
  <DeleteOrderModal
      v-if="deleteModal"
      :message="'Вы действительно хотите удалить заказ?'"
      :on-confirm="confirmDelete"
      :on-cancel="() => { deleteModal = false; deleteTargetId = null }"
  />
</template>

<style scoped>
.orders-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: sans-serif;
}

.orders-table th,
.orders-table td {
  border: 1px solid black;
  padding: 8px 12px;
}

.orders-table th {
  background-color: #f0f0f0;
  cursor: pointer;
}

.orders-table tr.done {
  color: gray;
  background-color: #f8f8f8;
}

.orders-table td button {
  margin-right: 5px;
}
</style>
