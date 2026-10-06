import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/auth'
import { getAccessToken, clearTokens, saveTokens } from '../utils/tokens'
import { loginUser, logoutUser } from '../api/auth'
import { getRefreshToken } from '../utils/tokens'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // On app load, check if user is already logged in
        const token = getAccessToken()
        if (token) {
            getMe()
                .then(res => setUser(res.data))
                .catch(() => clearTokens())
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = async (email, password) => {
        const res = await loginUser({ email, password })
        saveTokens(res.data.access, res.data.refresh)
        const me = await getMe()
        setUser(me.data)
        return me.data
    }

    const logout = async () => {
        const refresh = getRefreshToken()
        try {
            await logoutUser(refresh)
        } finally {
            clearTokens()
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)