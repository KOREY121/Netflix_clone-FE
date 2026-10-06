import API from './axios'

export const registerUser = (data) =>
    API.post('/auth/register/', data)

export const loginUser = (data) =>
    API.post('/auth/login/', data)

export const logoutUser = (refresh) =>
    API.post('/auth/logout/', { refresh })

export const getMe = () =>
    API.get('/auth/me/')

export const updateMe = (data) =>
    API.patch('/auth/me/', data)

export const changePassword = (data) =>
    API.post('/auth/me/change-password/', data)