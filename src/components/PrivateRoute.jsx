import { Navigate } from 'react-router-dom'
import { getCookie } from '../utils/cookieUtils'

function PrivateRoute({ children }) {
    const token = getCookie('access_token')
    if (!token) {
        return <Navigate to="/" replace />
    }
    return children
}

export default PrivateRoute
