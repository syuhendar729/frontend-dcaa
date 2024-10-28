import { useEffect, useState } from 'react'
import { fetchUserData, logoutUser } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { message, Image, Button, Row, Col, Card } from 'antd'

const handleLogout = async (navigate) => {
    try {
        const response = await logoutUser()
        message.success('Logout successful!')
        localStorage.removeItem('access_token')
        navigate('/')
    } catch (error) {
        message.error('Logout failed. Please try again.')
        console.error('Error during logout:', error)
    }
}

function DashboardPage() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData()
                console.log(data)
                setUser(data.data)
            } catch (error) {
                message.error(
                    'Failed to fetch user data. Redirecting to login.'
                )
                navigate('/') // Redirect ke login jika terjadi error
            }
        }

        getUserData()
    }, [navigate])

    if (!user) {
        return <div>Loading...</div>
    }
    console.log(user)

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: '100vh',
                padding: '0 20px',
            }}
        >
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <Card title={user.username}>{user.email}</Card>
                <p>Profile: {user.profile_picture}</p>
                <Image width={200} src={user.profile_picture || '/mypp.png'} />
                <br /> <br /> <br />
                <Button
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

// export default DashboardPage
