import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/authActions'
import {
    selectUser,
    selectLoading,
    selectError,
} from '../selectors/authSelectors'
import { useNavigate } from 'react-router-dom'
import { message, Image, Button, Row, Col, Card } from 'antd'
import { logoutUser, deleteUser } from '../api/authApi'

const apiUrl = import.meta.env.VITE_API_URL

const handleLogout = async (navigate) => {
    try {
        await logoutUser()
        message.success('Logout successful!')
        navigate('/')
    } catch (error) {
        message.error('Logout failed. Please try again.')
        console.error('Error during logout:', error)
    }
}

const handleDeleteAccount = async (navigate) => {
    try {
        await deleteUser()
        message.success('Delete account successful!')
        navigate('/')
    } catch (error) {
        message.error('Delete account failed. Please try again.')
        console.error('Error during delete account:', error)
    }
}

function DashboardPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            message.error('Failed to fetch user data. Redirecting to login.')
            navigate('/')
        }
    }, [error, navigate])

    if (loading) return <div>Loading...</div>
    if (!user) return null
    if (error) return <div>Error: {error}</div>

    const profile = user.profile_picture
    console.log(profile)

    return (
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: '100vh', padding: '0 20px' }}
        >
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <Card title={user.username}>{user.email}</Card>
                <p>Profile: {profile}</p>
                <Image
                    width={200}
                    src={profile ? `${apiUrl}${profile}` : '/default.jpg'}
                />
                <br /> <br /> <br />
                <Button
                    onClick={() => navigate('/edit')}
                    color="default"
                    style={{
                        background: 'orange',
                        color: 'black',
                        margin: '10px',
                    }}
                    variant="solid"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => navigate('/reset-pw')}
                    color="default"
                    style={{
                        background: 'gray',
                        color: 'white',
                        margin: '10px',
                    }}
                    variant="solid"
                >
                    Reset Password
                </Button>
                <Button
                    onClick={() => handleLogout(navigate)}
                    color="default"
                    style={{
                        background: 'blue',
                        color: 'white',
                        margin: '10px',
                    }}
                    variant="solid"
                >
                    Logout
                </Button>
                <Button
                    onClick={() => handleDeleteAccount(navigate)}
                    color="default"
                    style={{
                        background: 'red',
                        color: 'white',
                        margin: '10px',
                    }}
                    variant="solid"
                >
                    Delete Account
                </Button>
            </Col>
        </Row>
    )
}

export default DashboardPage
