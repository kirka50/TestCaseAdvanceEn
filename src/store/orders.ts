import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'http://localhost:3000/events'

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as any[]
    }),
    actions: {
        async fetchOrders() {
            const res = await axios.get(API)
            this.orders = res.data
        },
        async createOrder(order: any) {
            const res = await axios.post(API, order)
            this.orders.push(res.data)
        },
        async deleteOrder(id: number) {
            await axios.delete(`${API}/${id}`)
            this.orders = this.orders.filter(o => o.id !== id)
        },
        async updateStatus(id: number) {
            const order = this.orders.find(o => o.id === id)
            if (order) {
                order.status = 'Выполнен'
                await axios.put(`${API}/${id}`, order)
            }
        }
    }
})