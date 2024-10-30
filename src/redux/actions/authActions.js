import { getCookie } from '../../utils/cookieUtils'

export const fetchUser = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_USER_REQUEST' })

        const token = getCookie('access_token')
        if (!token) {
            dispatch({ type: 'FETCH_USER_FAILURE', payload: 'No token found' })
            return
        }

        try {
            const response = await fetch('http://localhost:81/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }

            const data = await response.json()
            dispatch({ type: 'FETCH_USER_SUCCESS', payload: data.data })
        } catch (error) {
            dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message })
            console.error('Error fetching user data:', error)
        }
    }
}
