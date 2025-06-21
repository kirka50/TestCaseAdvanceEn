import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
    user: string
    name: string
    role: 'ADMIN' | 'USER'
}

const STORAGE_KEY = 'auth_user'

function loadUser(): User | null {
    try {
        const data = sessionStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) as User : null
    } catch (e) {
        console.error('Ошибка парсинга user из sessionStorage:', e)
        return null
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: loadUser() as User | null
    }),
    actions: {
        async login(username: string, password: string) {
            const res = await axios.get<User[]>(`http://localhost:3000/users?user=${username}&password=${password}`)
            if (res.data.length) {
                // предположу что с api всегда будут приходить супер чёткие данные и не надо делать типо-безопасный парсинг
                this.user = res.data[0]
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
                return true
            }
            return false
        },
        logout() {
            this.user = null
            sessionStorage.removeItem(STORAGE_KEY)
        }
    }
})
