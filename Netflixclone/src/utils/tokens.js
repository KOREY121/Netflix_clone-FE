import axios from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokens'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Attach access token to every request
API.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Auto-refresh token on 401
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
                const refresh = getRefreshToken()
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh/`,
                    { refresh }
                )
                saveTokens(res.data.access, refresh)
                original.headers.Authorization = `Bearer ${res.data.access}`
                return API(original)
            } catch (err) {
                clearTokens()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default API