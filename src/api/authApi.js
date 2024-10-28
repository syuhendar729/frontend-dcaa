// authApi.js
export const registerUser = async (formData) => {
    console.log(formData)
    try {
        const response = await fetch('http://localhost:81/user', {
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
        const response = await fetch('http://localhost:81/login', {
            method: 'POST',
            body: formData,
        })

        if (response.status === 400) {
            const data = await response.json()
            throw new Error(`${data.message}`)
        } else if (!response.ok) {
            throw new Error('Response failed')
        }

        const data = await response.json()
        return data.data.access_token // Mengembalikan access_token saja
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

export const fetchUserData = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch('http://localhost:81/user', {
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
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch('http://localhost:81/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to log out')
        }

        return response.message
    } catch (error) {
        console.error('Error during logout:', error)
        throw error
    }
}

export const updateUser = async (formData) => {
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('No token found')
    console.log(formData)

    // Debug: cetak isi formData
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
    }

    try {
        const response = await fetch('http://localhost:81/user', {
            method: 'PATCH', // Menggunakan PUT untuk update data user
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
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('No token found')
    console.log(formData)
    // Debug: cetak isi formData
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
    }

    try {
        const response = await fetch('http://localhost:81/reset-password', {
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
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('No token found')

    try {
        const response = await fetch('http://localhost:81/user', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to delete user.')
        }

        return response.message
    } catch (error) {
        console.error('Error during delete:', error)
        throw error
    }
}
