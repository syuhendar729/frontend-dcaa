// authApi.js
import { setCookie, getCookie, deleteCookie } from '../utils/cookieUtils'
const apiUrl = import.meta.env.VITE_API_URL

export const registerUser = async (formData) => {
    console.log(formData)
    try {
        const response = await fetch(`${apiUrl}/user`, {
            method: 'POST',
            body: formData,
            headers: {},
        })

        if (response.status == 400) {
            const data = await response.json()
            throw new Error(`${data.message}`)
        } else if (!response.ok) {
            throw new Error(`Response failed`)
        }

        console.log(response.status)

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error during registration:', error)
        throw error
    }
}

export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: formData,
        })

        if (response.status === 400) {
            const data = await response.json()
            throw new Error(`${data.message}`)
        } else if (!response.ok) {
            throw new Error('Response failed')
        }

        const result = await response.json()
        setCookie('access_token', result.data.access_token, 1)
        return result
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

export const fetchUserData = async () => {
    const token = getCookie('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch(`${apiUrl}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) throw new Error('Failed to fetch user data')

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}

export const logoutUser = async () => {
    const token = getCookie('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to log out')
        }
        deleteCookie('access_token')
        return response.message
    } catch (error) {
        console.error('Error during logout:', error)
        throw error
    }
}

export const updateUser = async (formData) => {
    const token = getCookie('access_token')
    if (!token) throw new Error('No token found')
    console.log(formData)

    // Debug: cetak isi formData
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
    }

    try {
        const response = await fetch(`${apiUrl}/user`, {
            method: 'PATCH',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to update user data.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error during update:', error)
        throw error
    }
}

export const resetPassword = async (formData) => {
    const token = getCookie('access_token')
    if (!token) throw new Error('No token found')
    console.log(formData)
    // Debug: cetak isi formData
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
    }

    try {
        const response = await fetch(`${apiUrl}/reset-password`, {
            method: 'PUT', // Menggunakan PUT untuk update data user
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to reset password.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error during reset password:', error)
        throw error
    }
}

export const deleteUser = async () => {
    const token = getCookie('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch(`${apiUrl}/user`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to delete user.')
        }

        deleteCookie('access_token')
        return response.message
    } catch (error) {
        console.error('Error during delete:', error)
        throw error
    }
}
