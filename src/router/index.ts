import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import OrdersPage from '@/pages/OrderPage.vue'
import { useAuthStore } from '@/store/auth'
import CreateOrderPage from "../pages/CreateOrderPage.vue";

const routes = [
    { path: '/', component: LoginPage },
    {
        path: '/orders',
        component: OrdersPage,
        beforeEnter: () => {
            const auth = useAuthStore()
            if (!auth.user) return '/'
        }
    },
    {
        path: '/createOrder',
        component: CreateOrderPage,
        beforeEnter: () => {
            const auth = useAuthStore()
            if (!auth.user) return '/'
        }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})